const Discord = require('discord.js')
const ms = require('parse-ms')
const animalList = ['siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'calico', 'tabby', 'abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishangora', 'norwegianforest', 'devonrex', 'korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin', 'britishshorthair', 'ojosazules', 'bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws', 'squirtlett', 'cursedcat', 'uwu', 'tom', 'demoncat', 'bongocat', 'grumpycat']
let cooldown = {}

// just clear the cooldown every 5 minutes just in case of bugs
setInterval(() => {
  cooldown = {}
}, 300000) // 5 minutes

exports.run = async (bot, message, args) => {
  // eslint-disable-next-line no-unused-vars

  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()
  
  const userCol = bot.database.Userdata
  userCol.findOne({ userID: message.author.id }, async (err, userdata) => {
    if (err) bot.log('error', err)

    if (!userdata) return message.channel.send('Account Error')
    if (userdata) {
      // If The User Doesn't Specify Anything (cat sell)
      if (!args[0]) return message.channel.send(`**${message.author.username}**, please use the command correctly, check \`cat help sell\``)

      // {USAGE}cat sell simese 1
      if (args[1]) {
        let animalSellName
        const animal = args[0].toLowerCase().trim()
        let amtAnimal = Math.round(args[1])

        const checkAnimal = () => {
          for (let i = 0; i < animalList.length; i++) {
            if (animal === animalList[i]) {
              if (isNaN(amtAnimal) === false) {
                if (amtAnimal > 0) {
                  return true
                } else { return 'neg' }
              } else { return 'num' }
            }
          }
        }

        if (checkAnimal() === 'neg') {
          message.channel.send('You can\'t sell negative amounts of cats!')
          return delete cooldown[message.author.id]
        } else if (checkAnimal() === 'num') {
          message.channel.send('That\'s not a number!')
          return delete cooldown[message.author.id]
        }

        for (let i = 0; i < animalList.length; i++) {
          if (animal === animalList[i]) {
            let catSellPrice
            if (i <= 7) { catSellPrice = 25 } // common
            if (i >= 8 && i <= 15) { catSellPrice = 55 } // uncommon
            if (i >= 16 && i <= 23) { catSellPrice = 200 } // rare
            if (i >= 24 && i <= 38) { catSellPrice = 2500 } // special
            if (i >= 39) { catSellPrice = 10000 } // impossible

            if (animalSellName === undefined) {
              animalSellName = animalList[i]
            }

            if (userdata.cats[animalList[i]].amount === 0) {
              message.channel.send(`You don't have any ${animalList[i]} cats to sell!`)
              return delete cooldown[message.author.id]
            }
            if ((userdata.cats[animalList[i]].amount - amtAnimal) < 0) {
              amtAnimal = userdata.cats[animalList[i]].amount
            }
            const catDbName = `cats.${animalList[i]}.amount`
            userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animalList[i]].amount - amtAnimal}})
            userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + (amtAnimal * catSellPrice)}})
            const soldCat = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setColor(bot.config.color.blue)
              .setDescription(`You sold ${amtAnimal} ${animalSellName} cats for $${amtAnimal * catSellPrice}`)
            return message.channel.send(soldCat)
          }
        }
      }

      // USAGE cat sell [all, catType{common || uncommon || rare || special || impossible}
      if (args[0] && !args[1]) {
        const sellOption = args[0]

        // Geting Vars Of All Cats
        const uSiamese = userdata.cats.siamese.amount; const uBurmese = userdata.cats.burmese.amount; const uRagdoll = userdata.cats.ragdoll.amount; const uPersian = userdata.cats.persian.amount; const uMaineCoon = userdata.cats.mainecoon.amount; const uRussianBlue = userdata.cats.russianblue.amount; const uCalico = userdata.cats.calico.amount; const uTabby = userdata.cats.tabby.amount; const uAbyssinian = userdata.cats.abyssinian.amount; const uManx = userdata.cats.manx.amount; const uSphynx = userdata.cats.sphynx.amount; const uCyprus = userdata.cats.cyprus.amount; const uFoldex = userdata.cats.foldex.amount; const uTurkishAngora = userdata.cats.turkishangora.amount; const uNorwegianForest = userdata.cats.norwegianforest.amount; const uDevonrex = userdata.cats.devonrex.amount; const uKorat = userdata.cats.korat.amount; const uSingapura = userdata.cats.singapura.amount; const uTonkinese = userdata.cats.tonkinese.amount; const uPeterbald = userdata.cats.peterbald.amount; const uChartreux = userdata.cats.chartreux.amount; const uMunchkin = userdata.cats.munchkin.amount; const uBritishShorthair = userdata.cats.britishshorthair.amount; const uOjosazules = userdata.cats.ojosazules.amount; const uBandit = userdata.cats.bandit.amount; const uBug = userdata.cats.bug.amount; const uLinda = userdata.cats.linda.amount; const uMittens = userdata.cats.mittens.amount; const uCash = userdata.cats.cash.amount; const uJackson = userdata.cats.jackson.amount; const uCottonball = userdata.cats.cottonball.amount; const uSonny = userdata.cats.sonny.amount; const uSmokey = userdata.cats.smokey.amount; const uLailah = userdata.cats.lailah.amount; const uCher = userdata.cats.cher.amount; const uMarvin = userdata.cats.marvin.amount; const uLoki = userdata.cats.loki.amount; const uLoverBoy = userdata.cats.loverboy.amount; const uKillerClaws = userdata.cats.killerclaws.amount; const uSquirtlett = userdata.cats.squirtlett.amount; const uCursedcat = userdata.cats.cursedcat.amount; const uUWU = userdata.cats.uwu.amount; const uTom = userdata.cats.tom.amount; const uDemoncat = userdata.cats.demoncat.amount; const uBongocat = userdata.cats.bongocat.amount; const uGrumpycat = userdata.cats.grumpycat.amount
        const commonCatTotal = uSiamese + uBurmese + uRagdoll + uPersian + uMaineCoon + uRussianBlue + uCalico + uTabby; const uncommonCatTotal = uAbyssinian + uManx + uSphynx + uCyprus + uFoldex + uTurkishAngora + uNorwegianForest + uDevonrex; const rareCatTotal = uKorat + uSingapura + uTonkinese + uPeterbald + uChartreux + uMunchkin + uBritishShorthair + uOjosazules; const specialCatTotal = uBandit + uBug + uLinda + uMittens + uCash + uJackson + uCottonball + uSonny + uSmokey + uLailah + uCher + uMarvin + uLoki + uLoverBoy + uKillerClaws; const impossibleCatTotal = uSquirtlett + uCursedcat + uUWU + uTom + uDemoncat + uBongocat + uGrumpycat

        // {USAGE} cat sell all
        if (sellOption === 'all' || sellOption === 'allcats') {
          // Check To See If User Has Any Cats
          if (commonCatTotal === 0 && uncommonCatTotal === 0 && rareCatTotal === 0 && specialCatTotal === 0 && impossibleCatTotal === 0) {
            const noCats = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setColor(bot.config.color.red)
              .setDescription('you don\'t own any cats to sell')
            return message.channel.send(noCats)
          }
          // Convert The Cats Numbers Into Money

          const userMoney = userdata.money.catmoney
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userMoney + (commonCatTotal * 25)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userMoney + (uncommonCatTotal * 55)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userMoney + (rareCatTotal * 200)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userMoney + (specialCatTotal * 2500)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userMoney + (impossibleCatTotal * 10000)}})

          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.siamese.amount': 0,'cats.burmese.amount': 0,'cats.ragdoll.amount': 0, 'cats.persian.amount': 0,'cats.mainecoon.amount': 0,'cats.russianblue.amount': 0,'cats.calico.amount': 0,'cats.tabby.amount': 0,'cats.abyssinian.amount': 0,'cats.manx.amount': 0,'cats.sphynx.amount': 0, 'cats.cyprus.amount': 0,'cats.foldex.amount': 0,'cats.turkishangora.amount': 0,'cats.norwegianforest.amount': 0,'cats.devonrex.amount': 0,'cats.korat.amount': 0,'cats.singapura.amount': 0,'cats.tonkinese.amount': 0, 'cats.peterbald.amount': 0,'cats.chartreux.amount': 0,'cats.munchkin.amount': 0,'cats.britishshorthair.amount': 0,'cats.ojosazules.amount': 0,'cats.bandit.amount': 0,'cats.bug.amount': 0,'cats.linda.amount': 0, 'cats.mittens.amount': 0,'cats.cash.amount': 0,'cats.jackson.amount': 0,'cats.cottonball.amount': 0,'cats.sonny.amount': 0,'cats.smokey.amount': 0,'cats.lailah.amount': 0,'cats.cher.amount': 0,'cats.marvin.amount': 0,'cats.loki.amount': 0,'cats.loverboy.amount': 0,'cats.killerclaws.amount': 0,'cats.squirtlett.amount': 0,'cats.cursedcat.amount': 0,'cats.uwu.amount': 0, 'cats.tom.amount': 0,'cats.demoncat.amount': 0,'cats.bongocat.amount': 0,'cats.grumpycat.amount': 0}})
          
          const catTotal = commonCatTotal + uncommonCatTotal + rareCatTotal + specialCatTotal + impossibleCatTotal
          const sellAllCatsEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.blue)
            .setDescription(`You sold ${catTotal} cats for $${(commonCatTotal * 25) + (uncommonCatTotal * 55) + (rareCatTotal * 200) + (specialCatTotal * 2500) + (impossibleCatTotal * 10000)}`)
          return message.channel.send(sellAllCatsEmbed)
        // eslint-disable-next-line brace-style
        }

        // {USAGE} cat sell catType{common, uncommon, rare, special, impossible}
        else if (sellOption === 'common' || sellOption === 'commoncat' || sellOption === 'commoncats') {
          // Check To See If User Has Any Common Cats
          if (commonCatTotal === 0) {
            const noCommonCats = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setColor(bot.config.color.red)
              .setDescription('you don\'t own any common cats to sell')
              return message.channel.send(noCommonCats)
          }
          // Convert The Cats Numbers Into Money
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + (commonCatTotal * 25)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.siamese.amount': 0,'cats.burmese.amount': 0,'cats.ragdoll.amount': 0, 'cats.persian.amount': 0,'cats.mainecoon.amount': 0,'cats.russianblue.amount': 0,'cats.calico.amount': 0,'cats.tabby.amount': 0}})
          const sellCommonCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.blue).setDescription(`You sold ${commonCatTotal} cats for $${(commonCatTotal * 25)}`)
          return message.channel.send(sellCommonCatsEmbed)

        } else if (sellOption === 'uncommon' || sellOption === 'uncommoncat' || sellOption === 'uncommons') {
          // Check To See If User Has Any Uncommon Cats
          if (uncommonCatTotal === 0) {
            const noUncommonCats = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setColor(bot.config.color.red)
              .setDescription('you don\'t own any uncommon cats to sell')
            return message.channel.send(noUncommonCats)
          }
          // Convert The Cats Numbers Into Money
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + (uncommonCatTotal * 55)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.abyssinian.amount': 0,'cats.manx.amount': 0,'cats.sphynx.amount': 0, 'cats.cyprus.amount': 0,'cats.foldex.amount': 0,'cats.turkishangora.amount': 0,'cats.norwegianforest.amount': 0,'cats.devonrex.amount': 0}})
          const sellUncommonCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.blue).setDescription(`You sold ${uncommonCatTotal} cats for $${(uncommonCatTotal * 55)}`)
          return message.channel.send(sellUncommonCatsEmbed)

        } else if (sellOption === 'rare' || sellOption === 'rarecat' || sellOption === 'rarecats') {
          // Check To See If User Has Any Rare Cats
          if (rareCatTotal === 0) {
            const noRareCats = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setColor(bot.config.color.red)
              .setDescription('you don\'t own any rare cats to sell')
            return message.channel.send(noRareCats)
          }
          // Convert The Cats Numbers Into Money
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + (uncommonCatTotal * 200)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.korat.amount': 0,'cats.singapura.amount': 0,'cats.tonkinese.amount': 0, 'cats.peterbald.amount': 0,'cats.chartreux.amount': 0,'cats.munchkin.amount': 0,'cats.britishshorthair.amount': 0,'cats.ojosazules.amount': 0}})
          const sellRareCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.blue).setDescription(`You sold ${rareCatTotal} cats for $${(rareCatTotal * 200)}`)
          return message.channel.send(sellRareCatsEmbed)

        } else if (sellOption === 'special' || sellOption === 'specialcat' || sellOption === 'specialcats') {
          // Check To See If User Has Any Special Cats
          if (specialCatTotal === 0) {
            const noSpecialCats = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setColor(bot.config.color.red)
              .setDescription('you don\'t own any special cats to sell')
            return message.channel.send(noSpecialCats)
          }
          // Convert The Cats Numbers Into Money
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + (uncommonCatTotal * 2500)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.bandit.amount': 0,'cats.bug.amount': 0,'cats.linda.amount': 0, 'cats.mittens.amount': 0,'cats.cash.amount': 0,'cats.jackson.amount': 0,'cats.cottonball.amount': 0,'cats.sonny.amount': 0,'cats.smokey.amount': 0,'cats.lailah.amount': 0,'cats.cher.amount': 0,'cats.marvin.amount': 0,'cats.loki.amount': 0,'cats.loverboy.amount': 0,'cats.killerclaws.amount': 0}})
          const sellSpecialCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.blue).setDescription(`You sold ${specialCatTotal} cats for $${(specialCatTotal * 2500)}`)
          return message.channel.send(sellSpecialCatsEmbed)

        } else if (sellOption === 'impossible' || sellOption === 'impossiblecat' || sellOption === 'impossiblecats') {
          // Check To See If User Has Any Impossible Cats
          if (impossibleCatTotal === 0) {
            const noImpossibleCats = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setColor(bot.config.color.red)
              .setDescription('you don\'t own any impossible cats to sell')
            return message.channel.send(noImpossibleCats)

          }
          // Convert The Cats Numbers Into Money
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + (uncommonCatTotal * 10000)}})
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.squirtlett.amount': 0,'cats.cursedcat.amount': 0,'cats.uwu.amount': 0, 'cats.tom.amount': 0,'cats.demoncat.amount': 0,'cats.bongocat.amount': 0,'cats.grumpycat.amount': 0}})
          const sellImpossibleCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.blue).setDescription(`You sold ${impossibleCatTotal} cats for $${(impossibleCatTotal * 10000)}`)
          return message.channel.send(sellImpossibleCatsEmbed)

        } else {
          for (let i = 0; i < animalList.length; i++) {
            if (sellOption === animalList[i]) {
              let catSellPrice
              if (i <= 7) { catSellPrice = 25 } // common
              if (i >= 8 && i <= 15) { catSellPrice = 55 } // uncommon
              if (i >= 16 && i <= 23) { catSellPrice = 200 } // rare
              if (i >= 24 && i <= 38) { catSellPrice = 2500 } // special
              if (i >= 39) { catSellPrice = 10000 } // impossible
              if (userdata.cats[animalList[i]].amount === 0) {
                return message.channel.send(`You don't have any ${animalList[i]} cats to sell!`)
              }
              const amtAnimal = userdata.cats[animalList[i]].amount
              const catDbName = `cats.${animalList[i]}.amount`
              userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animalList[i]].amount - amtAnimal}})
              userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + (amtAnimal * catSellPrice)}})
              const soldCat = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(bot.config.color.blue)
                .setDescription(`You sold ${amtAnimal} ${animalList[i]} cats for $${amtAnimal * catSellPrice}`)
              return message.channel.send(soldCat)

            }
          }
        }
      }
    }
  })

  // Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 3500)

}

exports.help = {
  name: 'sell',
  aliases: ['kill', 's'],
  type: 'normal'
}
