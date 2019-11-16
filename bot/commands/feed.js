const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}
exports.run = async (bot, message, args) => {
  /* User suggestion
    Maybe do [cat feed] then insert a cat breed then there will be a chance
    you'll get the cat. The chance varies depending on how high the cat is
    from looking in [cat collection]
  */

  if (!args[0]) return message.channel.send('Check `cat help feed` for more info')

  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  const userCol = bot.database.Userdata
  userCol.findOne({ userID: message.author.id }, (err, userdata) => {
    if (err) bot.log('error', err)
    if (userdata) {
      const catBreed = args[0].toLowerCase().trim()
      const animalList = ['siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'calico', 'tabby', 'abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishangora', 'norwegianforest', 'devonrex', 'korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin', 'britishshorthair', 'ojosazules', 'bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws', 'squirtlett', 'cursedcat', 'uwu', 'tom', 'demoncat', 'bongocat', 'grumpycat']
      for (let i = 0; i < animalList.length; i++) {
        if (catBreed === animalList[i]) {
          let catType
          if (i <= 7) { catType = 'common' } // common
          if (i >= 8 && i <= 15) { catType = 'uncommon' } // uncommon
          if (i >= 16 && i <= 23) { catType = 'rare' } // rare
          if (i >= 24 && i <= 38) { catType = 'special' } // special
          if (i >= 39) { catType = 'impossible' } // impossible

          if (catType === 'common') {
            const commonCatAmt = Math.floor(Math.random() * 13) + 1
            const commonCatBase = Math.floor(Math.random() * 13) + 1
            if (commonCatAmt === commonCatBase) {
              const catDbName = `cats.${animalList[i]}.amount`
              userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animalList[i]].amount + 1}})
              const feedSucc = new Discord.RichEmbed()
                .setTitle('ooo look at that!')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`)
              message.channel.send(feedSucc)
            } else {
              const feedFail = new Discord.RichEmbed()
                .setTitle('hmm nothing')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`)
              message.channel.send(feedFail)
            }
          }
          if (catType === 'uncommon') {
            const uncommonCatAmt = Math.floor(Math.random() * 40) + 1
            const uncommonCatBase = Math.floor(Math.random() * 40) + 1
            if (uncommonCatAmt === uncommonCatBase) {
              const catDbName = `cats.${animalList[i]}.amount`
              userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animalList[i]].amount + 1}})
              const feedSucc = new Discord.RichEmbed()
                .setTitle('ooo look at that!')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`)
              message.channel.send(feedSucc)
            } else {
              const feedFail = new Discord.RichEmbed()
                .setTitle('hmm nothing')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`)
              message.channel.send(feedFail)
            }
          }

          if (catType === 'rare') {
            const rareCatAmt = Math.floor(Math.random() * 73) + 1
            const rareCatBase = Math.floor(Math.random() * 73) + 1
            if (rareCatAmt === rareCatBase) {
              const catDbName = `cats.${animalList[i]}.amount`
              userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animalList[i]].amount + 1}})
              const feedSucc = new Discord.RichEmbed()
                .setTitle('ooo look at that!')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`)
              message.channel.send(feedSucc)
            } else {
              const feedFail = new Discord.RichEmbed()
                .setTitle('hmm nothing')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`)
              message.channel.send(feedFail)
            }
          }

          if (catType === 'special') {
            const specialCatAmt = Math.floor(Math.random() * 185) + 1
            const specialCatBase = Math.floor(Math.random() * 185) + 1
            if (specialCatAmt === specialCatBase) {
              const catDbName = `cats.${animalList[i]}.amount`
              userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animalList[i]].amount + 1}})
              const feedSucc = new Discord.RichEmbed()
                .setTitle('ooo look at that!')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`)
              message.channel.send(feedSucc)
            } else {
              const feedFail = new Discord.RichEmbed()
                .setTitle('hmm nothing')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`)
              message.channel.send(feedFail)
            }
          }

          if (catType === 'impossible') {
            const impossibleCatAmt = Math.floor(Math.random() * 370) + 1
            const impossibleCatBase = Math.floor(Math.random() * 370) + 1
            if (impossibleCatAmt === impossibleCatBase) {
              const catDbName = `cats.${animalList[i]}.amount`
              userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animalList[i]].amount + 1}})
              const feedSucc = new Discord.RichEmbed()
                .setTitle('ooo look at that!')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`)
              message.channel.send(feedSucc)
            } else {
              const feedFail = new Discord.RichEmbed()
                .setTitle('hmm nothing')
                .setColor(bot.config.color.blue)
                .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`)
              message.channel.send(feedFail)
            }
          }
        }
      }
    }
  })

  //* Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 3500)
}

exports.help = {
  name: 'feed',
  aliases: ['f'],
  type: 'normal'
}
