const RichEmbed = require('discord.js').RichEmbed
const ms = require('parse-ms')
const cooldown = {}

const catProcess = (catObject, catName) => {
  if (catObject.discovered === false) {
    return ('?'.repeat(catName.length) + '\n')
  } else {
    return `${catName.charAt(0).toUpperCase() + catName.slice(1)}: **\`${catObject.amount}\`\n**`
  }
}

exports.run = async (bot, message, args) => {

  const categoryHearts = {
    common: ':green_heart:',
    uncommon: ':blue_heart:',
    rare:':purple_heart:',
    special:':sparkling_heart:',
    impossible:':yellow_heart:',
    seasonal: await bot.getEmoji.run(bot, 'whiteHeart')
  }

  const col2Embed = new RichEmbed()
    .setAuthor(message.author.username + ' cat collection!')
    .setColor(bot.config.color.blue)

  bot.database.Userdata.findOne({ userID: message.author.id  }, async (err, userdata) => {
    if (err) throw err

    if (userdata) {
    
      // Set A Cooldown
      if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
        const time = ms(Date.now() - cooldown[message.author.id])
        await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${30 - time.seconds}s**`).then(msg => msg.delete(1000 * (30 - time.seconds)))
        return
      }
      cooldown[message.author.id] = Date.now()

      //* Delete The Cooldown // Resetting It
      console.log(cooldown[message.author.id])

      setTimeout(() => {
        delete cooldown[message.author.id]
      }, 30000)

      // Check to see if user has cats
      let noCatsQ = 0
      for (let rarity in userdata.cats) {
        console.log(rarity)
        for (let cat in userdata.cats[rarity]) {
          noCatsQ += userdata.cats[rarity][cat].amount
        }
      }
      if (noCatsQ === 0) {
        const noCatsEmbed = new RichEmbed()
          .setColor(bot.config.color.red)
          .setDescription(`Sorry **${message.author.username}** you dont have any cats`)
        return message.channel.send(noCatsEmbed)
      }

      // loop through rarities || put together the collection
      for (let rarity in userdata.cats) {

        let rarityField = ''

        // loop through the cats in each rarity
        let amountCats = 0
        for (let cat in userdata.cats[rarity]){
          rarityField += catProcess(userdata.cats[rarity][cat], cat)
          amountCats += userdata.cats[rarity][cat].amount
        }

        if (amountCats !== 0) {
          // add rarity field to embed
          console.log(categoryHearts)
          col2Embed.addField(`${categoryHearts[rarity.slice(2)]} ${bot.functions.cap(rarity.slice(2))} ${categoryHearts[rarity.slice(2)]}`, rarityField, true)
        }
        amountCats = 0
      }

      // finally, send the embed
      message.channel.send(col2Embed)
    }
  })
}

exports.help = {
  name: 'col2',
  aliases: ['cattos2', 'c2', 'tos2'],
  type: 'normal'
}
