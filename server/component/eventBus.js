import * as _ from 'lodash';
import util  from 'util';
import {EventEmitter}  from 'events';

class EventBusObj extends EventEmitter {

  constructor () {
    super();
    this.queue = [];
    this.useQueue = [];
    this.current = this.nest = null;
  }


  use (eventName, listener) {
    this.useQueue.push(eventName);
    this.onSeries(eventName, listener);
  }

  onSeries (eventName, listener) {
    var self = this;

    EventEmitter.prototype.on.call(this, eventName, async function(data) {
      if (listener.length !== 2) {
        return await listener.apply(this, arguments);
      }

      self.queue.push({
        data: data,
        listener: listener,
        eventName: eventName,
        arguments: arguments
      });

      await self.next.call(self);
    });
  }

  async next() {
    var self = this
      , item = this.queue[0];

    if (!item){
      this.nest && typeof this.nest == 'function' && this.nest();
      return this.emit("bus:queue-empty", {});
    }

    if (item !== this.current) {
      this.current = item;
      await item.listener.call(this, item.data, async (err, result) => {
        if (err) { throw err; }

        !_.isEmpty(result) && _.assignIn(this.queue[0].data, result);
        this.queue.shift();
        this.current = this.nest = null;
        if (~this.useQueue.indexOf(item.eventName)) {
          this.useQueue.shift();
        }

        if (!this.queue.length && !~this.useQueue.indexOf(item.eventName)) {
          var argsArr = [].slice.call(item.arguments);
          this.nest = argsArr[argsArr.length - 1];
        }
        this.next.call(this);
      });
    }
  }
}

export default new EventBusObj();
