const { RichEmbed } = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}

exports.run = async (bot, message, args) => {
  // {USAGE} cat dex|catinfo {cat name}

  // If User Doesn't Specifiy What Cat To Look At
  if (!args[0]) return message.channel.send(`**${message.author.username}**, you need to specify which cat to look at`)

  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  // Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 3500)

  const catData = bot.catData

  // If User Does Specifiy The Cat Type
  if (args[0]) {

    let catFound = false

    const catReq = args[0].toLowerCase().trim()

    for(let rarity in catData){
      for(let cat in catData[rarity]){
        if(cat === catReq){
          catFound = true
      
          bot.database.Totallist.findOne({}, async (err, totalList) => {

            if (err) bot.log('error', err)

            if (totalList) {
              const dexEmbed = new RichEmbed()
                .setThumbnail(bot.user.avatarURL)
                .setTitle(`Cat dex for ${bot.functions.cap(cat)}`)
                .setColor(bot.config.color.rarities[rarity])
                .addField('Total found:', `**${totalList.cats[cat]}**`, true)
                .addField('Sell value:', `**${catData[rarity][cat].value !== null? catData[rarity][cat].value: 'Priceless!'}**`, true)
                .setImage(catData[rarity][cat].URL)
              if(catData[rarity][cat].credit !== null){
                let creditNames = ''
                for(let name in catData[rarity][cat].credit){
                  creditNames += catData[rarity][cat].credit[name] + (name < catData[rarity][cat].credit[name].length? ', ': '')
                }
                dexEmbed.addField('Suggested by:', `**${creditNames}**`, true)
              }
              if(catData[rarity][cat].sidenote){
                dexEmbed.setDescription(catData[rarity][cat].sidenote)
              }
              return await message.channel.send(dexEmbed)
            } else {
              return await message.channel.send('check `cat help dex` for how to use the command')
            }
          })
        }
      }
    }
    if (!catFound) return message.channel.send('Cat not found!')
  }
}

exports.help = {
  name: 'dex2',
  aliases: ['catinfo2', 'catdex2'],
  type: 'normal'
}