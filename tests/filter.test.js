const arr = [123, 3, 123, 55, 78, 33, 78, 12]

const found1 = arr.filter(num => num === 123)
let found2 = arr.filter(num => num === 123)[0]
found2 = found2 + 10


const notFound1 = arr.filter(num => num === 334)
const notFound2 = arr.filter(num => num === 334)[0]

console.log(found1)
console.log(found2)
console.log(arr)
console.log(notFound1)
console.log(notFound2)
console.log("============================")

const arrob = [{num:123}, {num:3}, {num:123}, {num:55},
  {num:78}, {num:33}, {num:78}, {num:12}]


const foundob1 = arrob.filter(item => item.num === 123)
let foundob2 = arrob.filter(item => item.num === 123)[0]
foundob2.num += 10

console.log(foundob1)
console.log(foundob2)
console.log(arrob)