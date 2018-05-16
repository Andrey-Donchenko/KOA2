import mongoose from 'mongoose';
import * as _ from 'lodash';
import util  from 'util';
import q  from 'q';

const defaultLimit = 20;        //page size
const defaultPageNumber = 0;    //page number
const defaultAsc  = 1;          //sort asc
const defaultDesc  = -1;        //sort desc
const defaultPageCount = 0;     //page count with empty result
const defaultTotalCount = 0;    //total count with empty result

let extendMongoose = (dbType) => {
  mongoose.Model[dbType] = function() {
    let self = this;
    return {
      updateRow : ({query = {}, data, callback = null}) => {
        let deferred = q.defer();

        let Model = self;

        Model.findOne(query, (err, doc) => {
          if (err) {
            callback && callback(err);
            return deferred.reject(err);
          }

          if (!doc) {
            let message = util.format('Entity from model [%s] was not found by query [%s]', Model.modelName, JSON.stringify(query));
            let error = new Error(message);
            callback && callback(error);
            return deferred.reject(error);
          }

          _.extend(doc, _.omit(data, '__v'));
          doc.save((err, item) => {
            if (err) {
              callback && callback(err);
              return deferred.reject(err);
            }

            item = item.toObject();

            callback && callback(null, item);
            deferred.resolve(item);
          });
        });
        return deferred.promise;
      },

      insertRow : ({data, callback = null}) => {
        let deferred = q.defer();

        let Model = self;

        let doc = new Model(data);
        doc.save((err,item) => {
          if (err) {
            callback && callback(err);
            return deferred.reject(err);
          }

          item = item.toObject();

          callback && callback(null, item);
          deferred.resolve(item);
        });

        return deferred.promise;
      },

      deleteRow : ({query = {}, callback = null} = { query:{}, callback:null }) => {
        let deferred = q.defer();

        let Model = self;

        Model.findOne(query, (err,doc) => {
          if (err) {
            callback && callback(err);
            return deferred.reject(err);
          }

          if (!doc) {
            let message = util.format('Entity from model [%s] was not found by query [%s]', Model.modelName, JSON.stringify(query));
            let error = new Error(message);
            callback && callback(error);
            return deferred.reject(error);
          }

          doc.remove((err) => {
            if (err) {
              callback && callback(err);
              return deferred.reject(err);
            }

            let item = doc.toObject();

            callback && callback(null, item);
            deferred.resolve(item);
          });
        });

        return deferred.promise;
      },

      updateRows : ({query = {}, data, options = {}, callback = null}) => {
        options = _.extend(options, { multi : true });
        return self.update(query, data, options, callback);
      },

      deleteRows : ({query = {}, callback = null} = { query:{}, callback: null }) => {
        return self.remove(query, callback);
      },

      countRows : ({query = {}, callback = null} = { query: {}, callback: null }) => {
        return self.count(query, callback);
      },

      rowExists : ({query = {}, callback = null} = { query: {}, callback: null }) => {
        let deferred = q.defer();
        self.count(query, (err, count) => {
          if (err) {
            callback && callback(err);
            return deferred.reject(err);
          }
          callback && callback(null, count > 0);
          deferred.resolve(count > 0);
        });

        return deferred.promise;
      },

      aggregateRows : ({query = [], callback = null} = { query: [], callback: null }) => {
        return self.aggregate(query).allowDiskUse(true).exec(callback);
      },

      populate : ({items, options = {}, callback = null}) => {
        return self.populate(items, options, callback);
      },

      findRows : ({query = {}, callback = null} = { query: {}, callback: null }) => {
        return self.find(query).lean().exec(callback);
      },

      findRow : ({query = {}, callback = null} = { query: {}, callback: null }) => {
        return self.findOne(query).lean().exec(callback);
      },

      findById : ({id, callback = null}) => {
        let deferred = q.defer();
        self.find({
          _id: mongoose.Types.ObjectId(id)
        }).lean().exec((err, user) => {
          if (err) {
            callback && callback(err);
            return deferred.reject(err);
          }
          callback && callback(null, user[0]?user[0]: null);
          deferred.resolve(user[0]?user[0]: null);
        });

        return deferred.promise;
      },

      findDocs : ({query = {}, callback = null} = { query: {}, callback: null }) => {
        return self.find(query).exec(callback);
      },

      findDoc : ({query = {}, callback = null} = { query: {}, callback: null }) => {
        return self.findOne(query).exec(callback);
      },

      findWithOptions : ({query = {}, options = {}, callback = null} = { query: {}, options: {}, callback: null }) => {
        let deferred = q.defer();

        let Query = self.find(query);

        options.limit = (!Number(options.limit))? defaultLimit : Number(options.limit);
        options.pageNumber = (!Number(options.pageNumber))? defaultPageNumber : Number(options.pageNumber);

        if (options.select) {
          Query = Query.select(options.select);
        }

        if (options.sort) {
          let sort = typeof options.sort === 'string' ? JSON.parse(options.sort) : options.sort;
          if (!_.isEmpty(sort)) {
            Query = Query.sort(sort);
          }
        }

        if (options.pageNumber >= defaultPageNumber) {
          Query =  Query.skip(options.pageNumber * options.limit).limit(options.limit);
        }

        Query.lean().exec((err, results) => {
          if (err) {
            callback && callback(err);
            return deferred.reject(err);
          }

          self.count(query, (err,count) => {
            if (err) {
              callback && callback(err);
              return deferred.reject(err);
            }

            let result = {
              pagesCount: Math.ceil(count / options.limit),
              results: results,
              totalCount: count
            };

            callback && callback(null, result);
            deferred.resolve(result);
          });
        });

        return deferred.promise;
      },

      aggregateWithOptions : ({query = [], options = {}, callback = null} = { query: [], options: {}, callback: null }) => {
        let deferred = q.defer();

        options.limit = (!Number(options.limit))? defaultLimit : Number(options.limit);
        options.pageNumber = (!Number(options.pageNumber))? defaultPageNumber : Number(options.pageNumber);

        if (options.sort) {
          let sort = typeof options.sort === 'string' ? JSON.parse(options.sort) : options.sort;
          _.each(sort, (value, key) => {
            sort[key] = (value === 'asc') ? defaultAsc : defaultDesc;
          });
          !_.isEmpty(sort) && query.push({ $sort : sort });
        }

        let countQuery = _.cloneDeep(query);

        if (options.pageNumber >= defaultPageNumber) {
          query.push({ $skip :  options.pageNumber * options.limit });
        }

        if (options.limit) {
          query.push({ $limit : options.limit });
        }

        self.aggregate(query).allowDiskUse(true).exec((err, results) => {
          if (err) {
            callback && callback(err);
            return deferred.reject(err);
          }

          if (!results) {

            let res = {
              pagesCount: defaultPageCount,
              results: [],
              totalCount: defaultTotalCount
            };
            callback && callback(null, res);
            deferred.resolve(res);
          }
          else {

            let countquery  = [].concat(countQuery, {$group :{_id:"1", count: { $sum: 1 }}});   //count request
            self.aggregate(countquery).allowDiskUse(true).exec((err,count) => {
              if (err) {
                callback && callback(err);
                return deferred.reject(err);
              }
              
              let res;

              if (count && count.length) {
                res = {
                  pagesCount: Math.ceil(count[0].count / options.limit),
                  results: results,
                  totalCount: count[0].count
                }
              }
              else {
                res = {
                  pagesCount: 0,
                  results: results,
                  totalCount: 0
                }
              }
              callback && callback(null, res);
              deferred.resolve( res);

            });
          }
        });

        return deferred.promise;
      }
    };
  };
};


export {extendMongoose}