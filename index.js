const xlsx=require('xlsx')
const fs=require('fs')
let f=xlsx.readFile('diancan.xlsx')
let keys = ['Index', 'Placeorder', 'Order', 'Qr', 'Manage']
let en={}
let ch={}
let indexkeys=['menu','order','soldmonth','option','price','total','checkout','empty','warn','confirm','replace','reconfirm','reconfirm1','ordertime','etc','needorder']
let placeorderkeys=['comment','inform','total','confirm','waitpay','payfail']
let orderkeys=['orderok','payok','orderno','remark','orderid','ordertime','payway','alipay']
let pcqrkeys=['smart','qr','area','example','content','range','start','end','input','generate','reset','scanqr','areano','scanorder','qrpreview']
let managekeys=['manage','upload','step1','download','read','warn','remind','drag','name','cate','img','upimg','price','spec','attr','status']
let subkeys={
  indexkeys: indexkeys,
  placeorderkeys: placeorderkeys,
  orderkeys: orderkeys,
  pcqrkeys: pcqrkeys,
  managekeys: managekeys
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