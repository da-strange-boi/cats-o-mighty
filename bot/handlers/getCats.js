const Discord = require('discord.js')
exports.run = async (bot, message) => {
  if (!message.guild || message.IsPrivate || message.author.bot) return

  let prefix = bot.config.prefix
  if (message.content.startsWith(`<@${bot.user.id}>`)) {
    prefix = `<@${bot.user.id}>`
  }
  if (message.content.trim().toLowerCase().startsWith(prefix)) return

  // The Random Way To Get Cats
  // common: 30 || uncommon: 70 || rare: 150 || special: 350
  // common: 20 || uncommon: 50 || rare: 130 || special: 270 - updated: 5/17/19
  // common: 25 || uncommon: 60 || rare: 145 || special: 290 || impossible: 550 - updated: 5/24/19
  // common: 25 || uncommon: 80 || rare: 145 || special: 370 || impossible: 740 - updated: 6/7/19

  const commonCatAmt = Math.floor(Math.random() * 25) + 1
  const commonBaseAmt = Math.floor(Math.random() * 25) + 1

  const uncommonCatAmt = Math.floor(Math.random() * 80) + 1
  const uncommonBaseAmt = Math.floor(Math.random() * 80) + 1

  const rareCatAmt = Math.floor(Math.random() * 145) + 1
  const rareBaseAmt = Math.floor(Math.random() * 145) + 1

  const specialCatAmt = Math.floor(Math.random() * 370) + 1
  const specialBaseAmt = Math.floor(Math.random() * 370) + 1

  const impossibleCatsAmt = Math.floor(Math.random() * 740) + 1
  const impossibleBaseAmt = Math.floor(Math.random() * 740) + 1

  // database vars
  const userCol = bot.database.Userdata
  const totalCol = bot.database.Totallist
  const guildCol = bot.database.Guildsettings

  userCol.findOne({ userID: message.author.id }, async (err, userdata) => {
    if (err) bot.log('error', err)
    if(userdata) {
      if(userdata.disable) return

      totalCol.findOne({}, async (err, totalList) => {
        if(err) bot.log('error', err)
        if(!totalList) {
          totalCol.insertOne({
            cats: {
              siamese: 0,
              burmese: 0,
              ragdoll: 0,
              persian: 0,
              mainecoon: 0,
              russianblue: 0,
              calico: 0,
              tabby: 0,
              abyssinian: 0,
              manx: 0,
              sphynx: 0,
              cyprus: 0,
              foldex: 0,
              turkishangora: 0,
              norwegianforest: 0,
              devonrex: 0,
              korat: 0,
              singapura: 0,
              tonkinese: 0,
              peterbald: 0,
              chartreux: 0,
              munchkin: 0,
              britishshorthair: 0,
              ojosazules: 0,
              bandit: 0,
              bug: 0,
              linda: 0,
              mittens: 0,
              cash: 0,
              jackson: 0,
              cottonball: 0,
              sonny: 0,
              smokey: 0,
              lailah: 0,
              cher: 0,
              marvin: 0,
              loki: 0,
              loverboy: 0,
              killerclaws: 0,
              squirtlett: 0,
              cursedcat: 0,
              uwu: 0,
              tom: 0,
              demoncat: 0,
              bongocat: 0,
              grumpycat: 0,
              ghostcat: 0
            }
          })
        }
        if (totalList) {
          guildCol.findOne({ guildID: message.guild.id }, async (err, guildSettings) => {
            if (err) bot.log('error', err)
            if (!guildSettings) bot.log('error', 'guildSettings error')

            if (guildSettings) {
              const showCatEmbed = catName => {
                const embed = new Discord.RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setColor(bot.config.color.blue)
                  .setDescription(`You got a ${catName}! uwu`)
                if (guildSettings.CatGottenPopupMessage === 'show') {
                  message.channel.send(embed)
                } else if (guildSettings.CatGottenPopupMessage === 'disappear' || guildSettings.CatGottenPopupMessage === true) {
                  message.channel.send(embed).then(msg => msg.delete(6000))
                }
              }

              if (commonCatAmt === commonBaseAmt) {
                const animals = [
                  'siamese',
                  'burmese',
                  'ragdoll',
                  'persian',
                  'mainecoon',
                  'russianblue',
                  'calico',
                  'tabby'
                ]
                const result = Math.floor(Math.random() * animals.length)

                // Add Cat To Their Collection
                let updatedNum = userdata.cats[animals[result]].amount + 1;
                let updatedCat = `cats.${animals[result]}.amount`
                let totalCat = `cats.${animals[result]}`
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[updatedCat]: updatedNum}})
                totalCol.findOneAndUpdate({}, {$set: {[totalCat]: totalList.cats[animals[result]] + 1}})

                showCatEmbed(animals[result])

              }

              if (uncommonCatAmt === uncommonBaseAmt) {
                // If User Has No Common Cats Don't Give Them Uncommon
                let commonCats
                if (
                  userdata.cats.siamese.amount === 0 &&
                  userdata.cats.burmese.amount === 0 &&
                  userdata.cats.ragdoll.amount === 0 &&
                  userdata.cats.persian.amount === 0 &&
                  userdata.cats.mainecoon.amount === 0 &&
                  userdata.cats.russianblue.amount === 0 &&
                  userdata.cats.calico.amount === 0 &&
                  userdata.cats.tabby.amount === 0
                ) {
                  commonCats = false
                } else {
                  commonCats = true
                }

                if (commonCats === false) return

                const animals = [
                  'abyssinian',
                  'manx',
                  'sphynx',
                  'cyprus',
                  'foldex',
                  'turkishangora',
                  'norwegianforest',
                  'devonrex'
                ]
                const result = Math.floor(Math.random() * animals.length)

                let updatedNum = userdata.cats[animals[result]].amount + 1;
                let updatedCat = `cats.${animals[result]}.amount`
                let totalCat = `cats.${animals[result]}`
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[updatedCat]: updatedNum}})
                totalCol.findOneAndUpdate({}, {$set: {[totalCat]: totalList.cats[animals[result]] + 1}})

                showCatEmbed(animals[result])

              }

              if (rareCatAmt === rareBaseAmt) {
                // If User Has No Uncommon Cats Don't Give Them Rare
                let uncommonCats
                if (
                  userdata.cats.abyssinian.amount === 0 &&
                  userdata.cats.manx.amount === 0 &&
                  userdata.cats.sphynx.amount === 0 &&
                  userdata.cats.cyprus.amount === 0 &&
                  userdata.cats.foldex.amount === 0 &&
                  userdata.cats.turkishangora.amount === 0 &&
                  userdata.cats.norwegianforest.amount === 0 &&
                  userdata.cats.devonrex.amount === 0
                ) {
                  uncommonCats = false
                } else {
                  uncommonCats = true
                }

                if (uncommonCats === false) return

                const animals = [
                  'korat',
                  'singapura',
                  'tonkinese',
                  'peterbald',
                  'chartreux',
                  'munchkin',
                  'britishshorthair',
                  'ojosazules'
                ]
                const result = Math.floor(Math.random() * animals.length)

                let updatedNum = userdata.cats[animals[result]].amount + 1;
                let updatedCat = `cats.${animals[result]}.amount`
                let totalCat = `cats.${animals[result]}`
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[updatedCat]: updatedNum}})
                totalCol.findOneAndUpdate({}, {$set: {[totalCat]: totalList.cats[animals[result]] + 1}})

                showCatEmbed(animals[result])

              }

              if (specialCatAmt === specialBaseAmt) {
                // No Need To Check If They Have Lower Rank || You Can Get Special No Matter What Cats You Have

                const animals = [
                  'bandit',
                  'bug',
                  'linda',
                  'mittens',
                  'cash',
                  'jackson',
                  'cottonball',
                  'sonny',
                  'smokey',
                  'lailah',
                  'cher',
                  'marvin',
                  'loki',
                  'loverboy',
                  'killerclaws'
                ]
                const result = Math.floor(Math.random() * animals.length)

                let updatedNum = userdata.cats[animals[result]].amount + 1;
                let updatedCat = `cats.${animals[result]}.amount`
                let totalCat = `cats.${animals[result]}`
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[updatedCat]: updatedNum}})
                totalCol.findOneAndUpdate({}, {$set: {[totalCat]: totalList.cats[animals[result]] + 1}})

                showCatEmbed(animals[result])

              }

              if (impossibleCatsAmt === impossibleBaseAmt) {
                // Set Vars For Impossible Cats
                const animals = [
                  'squirtlett',
                  'cursedcat',
                  'uwu',
                  'tom',
                  'demoncat',
                  'bongocat',
                  'grumpycat'
                ]
                const result = Math.floor(Math.random() * animals.length)

                let updatedNum = userdata.cats[animals[result]].amount + 1;
                let updatedCat = `cats.${animals[result]}.amount`
                let totalCat = `cats.${animals[result]}`
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[updatedCat]: updatedNum}})
                totalCol.findOneAndUpdate({}, {$set: {[totalCat]: totalList.cats[animals[result]] + 1}})

                showCatEmbed(animals[result])

              }
            }
          })
        }
      })
    }
  })
}
