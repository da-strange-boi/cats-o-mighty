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

  bot.database.Userdata.findOne({ userID: message.author.id  }, async (err, userdata) => {
    if (err) throw err

    // if the user is in the database, do stuff
    if (userdata) {

      // #region cooldown
      // Set A Cooldown
      if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
        const time = ms(Date.now() - cooldown[message.author.id])
        await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${30 - time.seconds}s**`).then(msg => msg.delete(1000 * (30 - time.seconds)))
        return
      }
      cooldown[message.author.id] = Date.now()

      // Delete The Cooldown // Resetting It
      setTimeout(() => {
        delete cooldown[message.author.id]
      }, 3000)                                                        // DON'T FORGET TO RESET THIS TO 30 SECONDS
      // #endregion cooldown

      // assume no cats to start
      let noCatsQ = 0
      for (let rarity in userdata.cats) {
        // console.log(rarity)
        for (let cat in userdata.cats[rarity]) {
          // console.log(cat, userdata.cats[rarity][cat].amount, noCatsQ)
          noCatsQ += userdata.cats[rarity][cat].amount // add the amount for that cat to the total cat amount
        }
      }
      // console.log(noCatsQ === 0)
      if (noCatsQ === 0) {
        const noCatsEmbed = new RichEmbed()
          .setColor(bot.config.color.red)
          .setThumbnail(bot.user.avatarURL)
          .setTitle('Uh-oh :(')
          .setDescription(`It looks like you don't have any cats, **${message.author.username}**! Start sending messages to find some!`)
        return message.channel.send(noCatsEmbed)
      }

      let embedTotalCats = 0
      // loop through rarities and put together the collection
      for (let rarity in userdata.cats) {

        console.log(rarity)

        let rarityField = ''

        // Check if user wants to look at just one category (cat collection uncommon)
        let amountCats = 0
        if (args[0]) {
          if (args[0] === rarity.substring(2)) {
            // loop through the cats in each rarity
            for (let cat in userdata.cats[rarity]){
              rarityField += catProcess(userdata.cats[rarity][cat], cat)
              amountCats += userdata.cats[rarity][cat].amount
            }
            embedTotalCats = amountCats
          }
        } 
        if (!args[0]) {
          // loop through the cats in each rarity
          for (let cat in userdata.cats[rarity]){
            rarityField += catProcess(userdata.cats[rarity][cat], cat)
            amountCats += userdata.cats[rarity][cat].amount
          }
          embedTotalCats += amountCats
        }

        // check if user has no cats
        if (amountCats !== 0) {
          // add rarity field to embed
          col2Embed.addField(`${categoryHearts[rarity.slice(2)]} ${bot.functions.cap(rarity.slice(2))} ${categoryHearts[rarity.slice(2)]}`, rarityField, true)
        }
        amountCats = 0
      }

      // finally, send the embed
      if (embedTotalCats === 0) {
        col2Embed.setColor(bot.config.color.red)
        col2Embed.setThumbnail(bot.user.avatarURL)
        col2Embed.setTitle('Uh-oh :(')
        col2Embed.setDescription(`It looks like you don't have any cats in that category, **${message.author.username}**! Start sending messages to find some!`)
      } else {
        col2Embed.setAuthor(message.author.username + 's cat collection!')
        col2Embed.setColor(bot.config.color.blue)
      }
      message.channel.send(col2Embed)
    }
  })
}

exports.help = {
  name: 'col2',
  aliases: ['cattos2', 'c2', 'tos2'],
  type: 'normal'
}
