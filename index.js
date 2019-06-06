const xlsx=require('xlsx')
const fs=require('fs')
let f=xlsx.readFile('diancan.xlsx')
let keys = ['Menu', 'Order', 'Placeorder', 'Orderdetail', 'Noneali']
let en={}
let ch={}
let menukeys=['scan','menu','order','sold','choose','reselect','options','price','total','checkout','empty']
let orderkeys=['eatin','pickno','buytime','paysuc','refund','noorder','refresh','myorder','nomore','unit']
let placeorderkeys=['tableno','optional','comments','addcomment','total','payali','confirm','paying','alifail','reload','error']
let orderdetailkeys=['paysuc','pickno','close','view','total','comments','orderno','buytime','payway','payali']
let nonealikeys=['welcome','scan','aliapp']
let subkeys={
  menukeys: menukeys,
  orderkeys: orderkeys,
  placeorderkeys: placeorderkeys,
  orderdetailkeys: orderdetailkeys,
  nonealikeys: nonealikeys
}
f.SheetNames.map((item, index) => {
  let shet = f.Sheets[item]
  let sk = Object.values(subkeys)[index]
  if (!en[keys[index]]) en[keys[index]]={}
  if (!ch[keys[index]]) ch[keys[index]]={}
  let idx = 0
  for (let i in shet) {
    if (i.startsWith('A')) {
      ch[keys[index]][sk[idx]] = shet[i]['v']
    } else if (i.startsWith('B')) {
      en[keys[index]][sk[idx]] = shet[i]['v']
      idx++
    }
  }
})
fs.writeFile('en.json', JSON.stringify(en), {flag: 'w+'}, ()=>{})
fs.writeFile('ch.json', JSON.stringify(ch), {flag: 'w+'}, ()=>{})