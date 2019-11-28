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

const categoryHearts = [':green_heart:', ':blue_heart:', ':purple_heart:', ':sparkling_heart:', ':yellow_heart:']

exports.run = async (bot, message, args) => {

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

      // Check to see if user has cats
      let noCatsQ = 0
      for (let rarity in userdata.rarities) {
        for (let cat in userdata.rarities[rarity]) {
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
      for (let rarity in userdata.rarities) {

        let rarityField = ''

        // loop through the cats in each rarity
        let amountCats = 0
        for (let cat in userdata.rarities[rarity]){
          rarityField += catProcess(userdata.cats[rarity][cat], cat)
          amountCats += userdata.cats[rarity][cat].amount
        }

        // adds hearts to either side of the category (only way i could think of doing this)
        let catCategoryHeart
        const whiteHeart = await bot.getEmoji.run(bot, 'whiteHeart')
        switch (rarity) {
          case '0': catCategoryHeart = categoryHearts[0]; break
          case '1': catCategoryHeart = categoryHearts[1]; break
          case '2': catCategoryHeart = categoryHearts[2]; break
          case '3': catCategoryHeart = categoryHearts[3]; break
          case '4': catCategoryHeart = categoryHearts[4]; break
          case '5': catCategoryHeart = whiteHeart
        }

        if (amountCats !== 0) {
          // add rarity field to embed
          col2Embed.addField(`${catCategoryHeart} ${bot.functions.cap(userdata.rarities[rarity].slice(2))} ${catCategoryHeart}`, rarityField, true)
        }
        amountCats = 0
      }

      // finally, send the embed
      message.channel.send(col2Embed)

      //* Delete The Cooldown // Resetting It
      setTimeout(() => {
        delete cooldown[message.author.id]
      }, 30000)
    }
  })
}

exports.help = {
  name: 'col2',
  aliases: ['cattos2', 'c2', 'tos2'],
  type: 'normal'
}
