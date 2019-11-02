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
  bot.database.Userdata.findOne({ userID: message.author.id }, async (err, userdata) => {
    if (err) bot.log('error', err)

    if (!userdata) return message.channel.send('Account Error')
    if (userdata) {
      // If The User Doesn't Specify Anything (cat sell)
      if (!args[0]) return message.channel.send(`**${message.author.username}**, please use the command correctly, check \`cat help sell\``)

      // Set A Cooldown
      if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
        const time = ms(Date.now() - cooldown[message.author.id])
        await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
        return
      }
      cooldown[message.author.id] = Date.now()

      // {USAGE}cat sell simese 1
      if (args[1]) {
        let animalSellName
        const animal = args[0].toLowerCase().trim()
        let amtAnimal = args[1]

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

            if (userdata.cats[animalList[i]] === 0) {
              message.channel.send(`You don't have any ${animalList[i]} cats to sell!`)
              return delete cooldown[message.author.id]
            }
            if (userdata.cats[animalList[i]] - amtAnimal < 0) {
              amtAnimal = userdata.cats[animalList[i]]
            }
            userdata.cats[animalList[i]] = userdata.cats[animalList[i]] - amtAnimal
            userdata.money.catmoney += (amtAnimal * catSellPrice)
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
        const uSiamese = userdata.cats.siamese; const uBurmese = userdata.cats.burmese; const uRagdoll = userdata.cats.ragdoll; const uPersian = userdata.cats.persian; const uMaineCoon = userdata.cats.mainecoon; const uRussianBlue = userdata.cats.russianblue; const uCalico = userdata.cats.calico; const uTabby = userdata.cats.tabby; const uAbyssinian = userdata.cats.abyssinian; const uManx = userdata.cats.manx; const uSphynx = userdata.cats.sphynx; const uCyprus = userdata.cats.cyprus; const uFoldex = userdata.cats.foldex; const uTurkishAngora = userdata.cats.turkishangora; const uNorwegianForest = userdata.cats.norwegianforest; const uDevonrex = userdata.cats.devonrex; const uKorat = userdata.cats.korat; const uSingapura = userdata.cats.singapura; const uTonkinese = userdata.cats.tonkinese; const uPeterbald = userdata.cats.peterbald; const uChartreux = userdata.cats.chartreux; const uMunchkin = userdata.cats.munchkin; const uBritishShorthair = userdata.cats.britishshorthair; const uOjosazules = userdata.cats.ojosazules; const uBandit = userdata.cats.bandit; const uBug = userdata.cats.bug; const uLinda = userdata.cats.linda; const uMittens = userdata.cats.mittens; const uCash = userdata.cats.cash; const uJackson = userdata.cats.jackson; const uCottonball = userdata.cats.cottonball; const uSonny = userdata.cats.sonny; const uSmokey = userdata.cats.smokey; const uLailah = userdata.cats.lailah; const uCher = userdata.cats.cher; const uMarvin = userdata.cats.marvin; const uLoki = userdata.cats.loki; const uLoverBoy = userdata.cats.loverboy; const uKillerClaws = userdata.cats.killerclaws; const uSquirtlett = userdata.cats.squirtlett; const uCursedcat = userdata.cats.cursedcat; const uUWU = userdata.cats.uwu; const uTom = userdata.cats.tom; const uDemoncat = userdata.cats.demoncat; const uBongocat = userdata.cats.bongocat; const uGrumpycat = userdata.cats.grumpycat
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
          userdata.money.catmoney += (commonCatTotal * 25)
          userdata.money.catmoney += (uncommonCatTotal * 55)
          userdata.money.catmoney += (rareCatTotal * 200)
          userdata.money.catmoney += (specialCatTotal * 2500)
          userdata.money.catmoney += (impossibleCatTotal * 10000)

          userdata.cats.siamese = 0; userdata.cats.burmese = 0; userdata.cats.ragdoll = 0; userdata.cats.persian = 0; userdata.cats.mainecoon = 0; userdata.cats.russianblue = 0; userdata.cats.calico = 0; userdata.cats.tabby = 0; userdata.cats.abyssinian = 0; userdata.cats.manx = 0; userdata.cats.sphynx = 0; userdata.cats.cyprus = 0; userdata.cats.foldex = 0; userdata.cats.turkishangora = 0; userdata.cats.norwegianforest = 0; userdata.cats.devonrex = 0; userdata.cats.korat = 0; userdata.cats.singapura = 0; userdata.cats.tonkinese = 0; userdata.cats.peterbald = 0; userdata.cats.chartreux = 0; userdata.cats.munchkin = 0; userdata.cats.britishshorthair = 0; userdata.cats.ojosazules = 0; userdata.cats.bandit = 0; userdata.cats.bug = 0; userdata.cats.linda = 0; userdata.cats.mittens = 0; userdata.cats.cash = 0; userdata.cats.jackson = 0; userdata.cats.cottonball = 0; userdata.cats.sonny = 0; userdata.cats.smokey = 0; userdata.cats.lailah = 0; userdata.cats.cher = 0; userdata.cats.marvin = 0; userdata.cats.loki = 0; userdata.cats.loverboy = 0; userdata.cats.killerclaws = 0; userdata.cats.squirtlett = 0; userdata.cats.cursedcat = 0; userdata.cats.uwu = 0; userdata.cats.tom = 0; userdata.cats.demoncat = 0; userdata.cats.bongocat = 0; userdata.cats.grumpycat = 0

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
          userdata.money.catmoney += (commonCatTotal * 25)
          userdata.cats.siamese = 0; userdata.cats.burmese = 0; userdata.cats.ragdoll = 0; userdata.cats.persian = 0; userdata.cats.mainecoon = 0; userdata.cats.russianblue = 0; userdata.cats.calico = 0; userdata.cats.tabby = 0
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
          userdata.money.catmoney += (uncommonCatTotal * 55)
          userdata.cats.abyssinian = 0; userdata.cats.manx = 0; userdata.cats.sphynx = 0; userdata.cats.cyprus = 0; userdata.cats.foldex = 0; userdata.cats.turkishangora = 0; userdata.cats.norwegianforest = 0; userdata.cats.devonrex = 0
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
          userdata.money.catmoney += (rareCatTotal * 200)
          userdata.cats.korat = 0; userdata.cats.singapura = 0; userdata.cats.tonkinese = 0; userdata.cats.peterbald = 0; userdata.cats.chartreux = 0; userdata.cats.munchkin = 0; userdata.cats.britishshorthair = 0; userdata.cats.ojosazules = 0
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
          userdata.money.catmoney += (specialCatTotal * 2500)
          userdata.cats.bandit = 0; userdata.cats.bug = 0; userdata.cats.linda = 0; userdata.cats.mittens = 0; userdata.cats.cash = 0; userdata.cats.jackson = 0; userdata.cats.cottonball = 0; userdata.cats.sonny = 0; userdata.cats.smokey = 0; userdata.cats.lailah = 0; userdata.cats.cher = 0; userdata.cats.marvin = 0; userdata.cats.loki = 0; userdata.cats.loverboy = 0; userdata.cats.killerclaws = 0
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
          userdata.money.catmoney += (impossibleCatTotal * 10000)
          userdata.cats.squirtlett = 0; userdata.cats.cursedcat = 0; userdata.cats.uwu = 0; userdata.cats.tom = 0; userdata.cats.demoncat = 0; userdata.cats.bongocat = 0; userdata.cats.grumpycat = 0
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
              if (userdata.cats[animalList[i]] === 0) {
                return message.channel.send(`You don't have any ${animalList[i]} cats to sell!`)
              }
              const amtAnimal = userdata.cats[animalList[i]]
              userdata.cats[animalList[i]] = userdata.cats[animalList[i]] - amtAnimal
              userdata.money.catmoney += (amtAnimal * catSellPrice)
              const soldCat = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(bot.config.color.blue)
                .setDescription(`You sold ${amtAnimal} ${animalList[i]} cats for $${amtAnimal * catSellPrice}`)
              return message.channel.send(soldCat)

            }
          }
        }
      }
      // Delete The Cooldown // Resetting It
      setTimeout(() => {
        delete cooldown[message.author.id]
      }, 3500)
    }
    userdata.save().catch(err => console.log(err))
  })
}

exports.help = {
  name: 'sell',
  aliases: ['kill', 's'],
  type: 'normal'
}
