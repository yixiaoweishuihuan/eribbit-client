// const memberList = [
//   {
//     id: '01',
//     name: '张三',
//     children: [
//       { id: '01/01', name: '韩信' },
//       { id: '01/02', name: '孙策' }
//     ]
//   },
//   { id: '02', name: '李四' },
//   { id: '03', name: '王五' },
//   { id: '04', name: '小华' },
//   { id: '05', name: '小张' },
//   {
//     id: '06',
//     name: '小丽',
//     children: [
//       { id: '06/01', name: '李白' },
//       { id: '06/02', name: '猴子' }
//     ]
//   }
// ]
// 处理数据 将多维数组展开成对象键值对的集合
const resolveDate = (list, initDate = {}) => {
  return list.reduce((init, item) => {
    init[item.id] = item
    if (item.children && item.children.length) {
      resolveDate(item.children, init)
    }
    return init
  }, initDate)
}
// resolveDate(memberList)
export default resolveDate
