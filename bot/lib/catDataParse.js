// this file is for updating the catData.json file

let fs = require('fs')
const catDataNew = {}

const getValue = (rarity) => {
  switch(rarity){
  case('common'): return 25
  case('uncommon'): return 55
  case('rare'): return 200
  case('special'): return 2500
  case('impossible'): return 10000
  case('seasonal'): return null
  default: return null
  }
}

const catData = {
  'common' : {
    'siamese': 'https://i.imgur.com/Q72dhHH.jpg',
    'burmese': 'https://i.imgur.com/i2wLXer.jpg',
    'ragdoll': 'https://i.imgur.com/BHI2A5B.jpg',
    'persian': 'https://i.imgur.com/7zk7qMR.jpg',
    'maineCoon': 'https://i.imgur.com/BdqURwX.png',
    'russianBlue': 'https://i.imgur.com/XWmYcSC.jpg',
    'calico': 'https://i.imgur.com/yD6sXrt.jpg',
    'tabby': 'https://i.imgur.com/frXE4oN.jpg',
  },
  'uncommon': {
    'abyssinian': 'https://i.imgur.com/davptxh.jpg',
    'manx': 'https://i.imgur.com/udgcttj.jpg',
    'sphynx': 'https://i.imgur.com/xuwnwbe.jpg',
    'cyprus': 'https://i.imgur.com/mcedtms.jpg',
    'foldex': 'https://i.imgur.com/aql6z6t.jpg',
    'turkishangora': 'https://i.imgur.com/lkkpajh.jpg',
    'norwegianforest': 'https://i.imgur.com/s54hq6d.jpg',
    'devonrex': 'https://i.imgur.com/dg20uzj.jpg'
  },
  'rare': {
    'korat': 'https://i.imgur.com/yogvgow.jpg',
    'singapura': 'https://i.imgur.com/1wjvreo.jpg',
    'tonkinese': 'https://i.imgur.com/bvvq89v.jpg',
    'peterbald': 'https://i.imgur.com/oslqoj7.jpg',
    'chartreux': 'https://i.imgur.com/dbrf5ir.jpg',
    'munchkin': 'https://i.imgur.com/iuiokgr.jpg',
    'britishshorthair': 'https://i.imgurr.com/u8zg7fg.jpg',
    'ojosazules': 'https://i.imgur.com/vzyywnk.jpg'
  },
  'special': {
    'bandit': 'https://i.imgur.com/yxiaiqe.jpg',
    'bug': 'https://i.imgur.com/umopzou.jpg',
    'linda': 'https://i.imgur.com/uierlr9.jpg',
    'mittens': 'https://i.imgur.com/vpyisrd.jpg',
    'cash': 'https://i.imgur.com/21odrlh.jpg',
    'jackson': 'https://i.imgur.com/nde2s2e.jpg',
    'cottonball': 'https://i.imgur.com/ceqspx4.jpg',
    'sonny': 'https://i.imgur.com/r7fb0xu.jpg',
    'smokey': 'https://i.imgur.com/z2vz3un.jpg',
    'lailah': 'https://i.imgur.com/xeby623.jpg',
    'cher': 'https://i.imgur.com/i06qynx.jpg',
    'marvin': 'https://i.imgur.com/ao3qmau.jpg',
    'loki': 'https://i.imgur.com/pbv6ijq.jpg',
    'loverboy': 'https://i.imgur.com/sj40y1e.jpg',
    'killerclaws': 'https://i.imgur.com/ero5bk5.jpg'
  },
  'impossible': {
    'squirtlett':'https://i.imgur.com/6rcjxap.png',
    'cursedcat':'https://i.imgur.com/yifiyjq.jpg',
    'uwu':'https://i.imgur.com/wj87ffu.jpg',
    'tom':'https://i.imgur.com/nj05cmm.png',
    'demoncat':'https://i.imgur.com/li7ucff.png',
    'bongocat':'https://i.imgur.com/dzpzdeo.gif',
    'grumpycat':'https://i.imgur.com/sgilydc.jpg'
  },
  'seasonal': {
    'ghostcat': 'https://i.imgur.com/qlbLgWj.jpg'
  }
}

for(let rarity in catData){
  console.log(rarity)
  catDataNew[rarity] = {}
  for(let cat in catData[rarity]){
    console.log(cat)
    catDataNew[rarity][cat] = {
      URL: catData[rarity][cat],
      value: getValue(rarity),
      credit: null
    }
  }
}

fs.writeFile('catData.json', JSON.stringify(catDataNew, null, '\t'), 'utf8', (err) => {
  if(err) throw err
  console.log('FILE WRITTEN')
})