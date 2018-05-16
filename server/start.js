// import * as _ from 'lodash';
// import extraTaskInfoWrite  from "./model/write/extraTaskInfo";

// let firstExtraTaskInfo = async () => {
//   let list = [
//     'Пунктуальний',
//     'Свій інстремент',
//     'Особливі прикмети',
//     'Досвід роботи',
//     'Вища освіта'
//   ];
//   try {
//     for (let info of list) {
//       let res = await extraTaskInfoWrite.findRow({
//         query:{
//           title: info
//         }
//       });
//       if (!res) {
//         await extraTaskInfoWrite.insertRow({
//           data: {
//             title: info
//           }
//         })
//       }
//     }
//   }
//   catch (err) {
//     throw(err);
//     return;
//   }
// }

export default async () => {
  try {
    // await firstExtraTaskInfo();
    // await firstTaskCategory();
  } catch (err) {
    console.log(err);
  }
};
