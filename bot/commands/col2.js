const MongoClient = require('mongodb').MongoClient
const config = require('../config')
const RichEmbed = require('discord.js').RichEmbed

exports.run = async (bot, message, args) => {
  MongoClient.connect(config.db.connectionString, config.db.connectionOptions, (err, client) => {

    const col2Embed = new RichEmbed()
      .setTitle('Collection 2')

    if (err) throw err
      
    let collection = client.db('cats-o-mighty').collection('userdatas')

    collection.findOne({ userID: '527729016849956874' /* message.author.id */ }, (err, userdata) => {

      if(err) throw err

      const rarities = Object.keys(userdata.cats) // array containing all the keys (rarities) of userdata.cats
    
      // loop through rarities
      for(let rarity in rarities){

        // define blank string to be added on to
        let rarityField = ''

        const o = Object.keys(userdata.cats[rarities[rarity]]) // array containing all the keys (cats) of userdata.cats.{rarity}

        // loop through the cats in each rarity
        for(let i in o){
          rarityField += catProcess(userdata.cats[rarities[rarity]][o[i]], o[i])
        }

        // add rarity field to embed
        col2Embed.addField(rarities[rarity].slice(2), rarityField, true)
      }

      // finally, send the embed
      message.channel.send(col2Embed)
    })
  })
}

exports.help = {
  name: 'col2',
  aliases: ['cattos2', 'c2', 'tos2'],
  type: 'normal'
}

const catProcess = (catObject, catName) => {
  if (catObject.discovered === false) {
    return ('?'.repeat(catName.length) + '\n')
  } else {
    return `${catName.charAt(0).toUpperCase() + catName.slice(1)}: **\`${catObject.amount}\`\n**`
  }
}
