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
        if(!totalList) return bot.log('error', 'No Total List')
        if (totalList) {
          guildCol.findOne({ guildID: message.guild.id }, async (err, guildSettings) => {
            if (err) bot.log('error', err)
            if (!guildSettings) return bot.log('error', 'guildSettings error')

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
                const animals = Object.keys(bot.catData.a_common)
                const result = Math.floor(Math.random() * animals.length)

                // Add Cat To Their Collection
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.a_common.${animals[result]}.amount`]: userdata.cats.a_common[animals[result]].amount + 1}})
                totalCol.findOneAndUpdate({}, {$set: {[`cats.${animals[result]}`]: totalList.cats[animals[result]] + 1}})

                if (userdata.cats.a_common[animals[result]].discovered === false) {
                  userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.a_common.${animals[result]}.discovered`]: true}})
                }

                showCatEmbed(animals[result])

              }

              if (uncommonCatAmt === uncommonBaseAmt) {
                // If User Has No Common Cats Don't Give Them Uncommon
                let commonCats = false
                Object.keys(bot.catData.a_common).forEach(cat => {
                  if (userdata.cats.a_common[cat].amount > 0) {
                    commonCats = true
                  }
                })

                if (commonCats === false) return

                const animals = Object.keys(bot.catData.b_uncommon)
                const result = Math.floor(Math.random() * animals.length)

                // Add Cat To Their Collection
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.b_uncommon.${animals[result]}.amount`]: userdata.cats.b_uncommon[animals[result]].amount + 1}})
                totalCol.findOneAndUpdate({}, {$set: {[`cats.${animals[result]}`]: totalList.cats[animals[result]] + 1}})

                if (userdata.cats.b_uncommon[animals[result]].discovered === false) {
                  userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.b_uncommon.${animals[result]}.discovered`]: true}})
                }

                showCatEmbed(animals[result])

              }

              if (rareCatAmt === rareBaseAmt) {
                // If User Has No Common Cats Don't Give Them Rare
                let uncommonCats = false
                Object.keys(bot.catData.b_uncommon).forEach(cat => {
                  if (userdata.cats.b_uncommon[cat].amount > 0) {
                    uncommonCats = true
                  }
                })

                if (uncommonCats === false) return

                const animals = Object.keys(bot.catData.c_rare)
                const result = Math.floor(Math.random() * animals.length)

                // Add Cat To Their Collection
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.c_rare.${animals[result]}.amount`]: userdata.cats.c_rare[animals[result]].amount + 1}})
                totalCol.findOneAndUpdate({}, {$set: {[`cats.${animals[result]}`]: totalList.cats[animals[result]] + 1}})

                if (userdata.cats.c_rare[animals[result]].discovered === false) {
                  userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.c_rare.${animals[result]}.discovered`]: true}})
                }

                showCatEmbed(animals[result])

              }

              if (specialCatAmt === specialBaseAmt) {
                // No Need To Check If They Have Lower Rank || You Can Get Special No Matter What Cats You Have

                const animals = Object.keys(bot.catData.d_special)
                const result = Math.floor(Math.random() * animals.length)

                // Add Cat To Their Collection
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.d_special.${animals[result]}.amount`]: userdata.cats.d_special[animals[result]].amount + 1}})
                totalCol.findOneAndUpdate({}, {$set: {[`cats.${animals[result]}`]: totalList.cats[animals[result]] + 1}})

                if (userdata.cats.d_special[animals[result]].discovered === false) {
                  userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.d_special.${animals[result]}.discovered`]: true}})
                }

                showCatEmbed(animals[result])

              }

              if (impossibleCatsAmt === impossibleBaseAmt) {
                // Set Vars For Impossible Cats
                const animals = Object.keys(bot.catData.e_impossible)
                const result = Math.floor(Math.random() * animals.length)

                // Add Cat To Their Collection
                userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.e_impossible.${animals[result]}.amount`]: userdata.cats.e_impossible[animals[result]].amount + 1}})
                totalCol.findOneAndUpdate({}, {$set: {[`cats.${animals[result]}`]: totalList.cats[animals[result]] + 1}})

                if (userdata.cats.e_impossible[animals[result]].discovered === false) {
                  userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.e_impossible.${animals[result]}.discovered`]: true}})
                }

                showCatEmbed(animals[result])
              }
            }
          })
        }
      })
    }
  })
}
