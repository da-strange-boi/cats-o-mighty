const MongoClient = require('mongodb').MongoClient
const config = require('./bot/config.json')

MongoClient.connect(config.db.connectionString, config.db.connectionOptions, async (err, client) => {
  if (err) throw err

  let collection = client.db('cats-o-mighty').collection('userdatas')

  let documentsModified_SET = 0

  await collection.find({}).forEach(element => {
    collection.updateOne({'_id': element._id},
      {
        $set: {
          'cats.a_common': {
            siamese: element.cats.siamese,
            burmese: element.cats.burmese,
            ragdoll: element.cats.ragdoll,
            persian: element.cats.persian,
            mainecoon: element.cats.mainecoon,
            russianblue: element.cats.russianblue,
            calico: element.cats.calico,
            tabby: element.cats.tabby
          },
          'cats.b_uncommon': {
            abyssinian: element.cats.abyssinian,
            manx: element.cats.manx,
            sphynx: element.cats.sphynx,
            cyprus: element.cats.cyprus,
            foldex: element.cats.foldex,
            turkishangora: element.cats.turkishangora,
            norwegianforest: element.cats.norwegianforest,
            devonrex: element.cats.devonrex
          },
          'cats.c_rare': {
            korat: element.cats.korat,
            singapura: element.cats.singapura,
            tonkinese: element.cats.tonkinese,
            peterbald: element.cats.peterbald,
            chartreux: element.cats.chartreux,
            munchkin: element.cats.munchkin,
            britishshorthair: element.cats.britishshorthair,
            ojosazules: element.cats.ojosazules
          },
          'cats.d_special': {
            smokey: element.cats.smokey,
            bandit: element.cats.bandit,
            bug: element.cats.bug,
            linda: element.cats.linda,
            mittens: element.cats.mittens,
            cash: element.cats.cash,
            jackson: element.cats.jackson,
            cottonball: element.cats.cottonball,
            sonny: element.cats.sonny,
            lailah: element.cats.lailah,
            cher: element.cats.cher,
            marvin: element.cats.marvin,
            loki: element.cats.loki,
            loverboy: element.cats.loverboy,
            killerclaws: element.cats.killerclaws
          },
          'cats.e_impossible': {
            squirtlett: element.cats.squirtlett,
            cursedcat: element.cats.cursedcat,
            uwu: element.cats.uwu,
            tom: element.cats.tom,
            demoncat: element.cats.demoncat,
            bongocat: element.cats.bongocat,
            grumpycat: element.cats.grumpycat
          },
          'cats.f_seasonal': {
            ghostcat: element.cats.ghostcat
          }
        }
      },
      (err, res) => {
        if (err) throw err
        documentsModified_SET += parseInt(res.result.nModified)
      }
    )
    // console.log(element.cats)
  })
  console.log(documentsModified_SET)

  await collection.updateMany({},
    {
      $unset: {
        // common
        'cats.siamese': 1,
        'cats.burmese': 1,
        'cats.ragdoll': 1,
        'cats.persian': 1,
        'cats.mainecoon': 1,
        'cats.russianblue': 1,
        'cats.calico': 1,
        'cats.tabby': 1,

        // uncommon
        'cats.abyssinian': 1,
        'cats.manx': 1,
        'cats.sphynx': 1,
        'cats.cyprus': 1,
        'cats.foldex': 1,
        'cats.turkishangora': 1,
        'cats.norwegianforest': 1,
        'cats.devonrex': 1,

        // rare
        'cats.korat': 1,
        'cats.singapura': 1,
        'cats.tonkinese': 1,
        'cats.peterbald': 1,
        'cats.chartreux': 1,
        'cats.munchkin': 1,
        'cats.britishshorthair': 1,
        'cats.ojosazules': 1,

        // special
        'cats.smokey': 1,
        'cats.bandit': 1,
        'cats.bug': 1,
        'cats.linda': 1,
        'cats.mittens': 1,
        'cats.cash': 1,
        'cats.jackson': 1,
        'cats.cottonball': 1,
        'cats.sonny': 1,
        'cats.lailah': 1,
        'cats.cher': 1,
        'cats.marvin': 1,
        'cats.loki': 1,
        'cats.loverboy': 1,
        'cats.killerclaws': 1,

        // impossible
        'cats.squirtlett': 1,
        'cats.cursedcat': 1,
        'cats.uwu': 1,
        'cats.tom': 1,
        'cats.demoncat': 1,
        'cats.bongocat': 1,
        'cats.grumpycat': 1,

        // seasonal
        'cats.ghostcat': 1
      }
    },
    (err, res) => {
      if (err) throw err
      console.log(res.result.nModified, 'Documents modified ($unset)')
    }
  )
  console.log()
})