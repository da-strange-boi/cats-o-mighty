const MongoClient = require('mongodb').MongoClient
const config = require('../config')
const RichEmbed = require('discord.js').RichEmbed

const catProcess = (catObject, catName) => {
  if (catObject.discovered === false) {
    return ('?'.repeat(catName.length) + '\n')
  } else {
    return `${catName.charAt(0).toUpperCase() + catName.slice(1)}: **\`${catObject.amount}\`\n**`
  }
}

exports.run = async (bot, message, args) => {

  const col2Embed = new RichEmbed()
    .setTitle('Collection 2')
    .setColor(bot.config.color.blue)

  bot.database.Userdata.findOne({ userID: message.author.id  }, (err, userdata) => {
    if (err) throw err

    if (userdata) {
      const rarities = Object.keys(userdata.cats) // array containing all the keys (rarities) of userdata.cats
    
      // loop through rarities
      for(let rarity in rarities){

        let rarityField = ''
        const o = Object.keys(userdata.cats[rarities[rarity]]) // array containing all the keys (cats) of userdata.cats.{rarity}

        // loop through the cats in each rarity
        for(let i in o){
          rarityField += catProcess(userdata.cats[rarities[rarity]][o[i]], o[i])
        }

        // add rarity field to embed
        col2Embed.addField(`${bot.functions.cap(rarities[rarity].slice(2))}`, rarityField, true)
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
