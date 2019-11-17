const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}

exports.run = async (bot, message) => {
  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  // Select User Data From Database
  bot.database.Userdata.find({}).sort({'money.catmoney':-1}).toArray( async (err, userdata) => {
    if (err) bot.log('error', err)
    let member

    const embed = new Discord.RichEmbed()
      .setTitle('**Leaderboard**')

    // If There Are No Results
    if (userdata.length === 0) {
      embed.setColor(bot.config.color.red)
      embed.addField('No data found', 'Sell some cats to be on the leaderboard')
    } else if (userdata.length < 10) {
      embed.setColor(bot.config.color.blue)
      for (let i = 0; i < userdata.length; i++) {
        if (message.author.id === '295255543596187650') {
          member = userdata[i].userTag
        } else {
          if (bot.functions.hasTag(userdata[i].userTag) === true) {
            member = userdata[i].userTag.slice(0, -5)
          } else {
            member = userdata[i].userTag
          }
        }
        if (i === 0) { embed.addField(`${i + 1}. <:gold:579860509264969739> ${member} <:gold:579860509264969739>`, `Cat Money: **$${bot.functions.formatMoney(userdata[i].money.catmoney)}**`) } else if (i === 1) { embed.addField(`${i + 1}. <:silver:579860480500301844> ${member} <:silver:579860480500301844>`, `Cat Money: **$${bot.functions.formatMoney(userdata[i].money.catmoney)}**`) } else if (i === 2) { embed.addField(`${i + 1}. <:bronze:579860359196704770> ${member} <:bronze:579860359196704770>`, `Cat Money: **$${bot.functions.formatMoney(userdata[i].money.catmoney)}**`) } else if (i > 2) { embed.addField(`${i + 1}. ${member}`, `Cat Money: **$${bot.functions.formatMoney(userdata[i].money.catmoney)}**`) }
      }
    } else {
      // If More Then 10 Results
      embed.setColor(bot.config.color.blue)
      for (let i = 0; i < 10; i++) {
        // Will use later
        if (message.author.id === '295255543596187650') {
          member = userdata[i].userTag
        } else {
          if (bot.functions.hasTag(userdata[i].userTag) === true) {
            member = userdata[i].userTag.slice(0, -5)
          } else {
            member = userdata[i].userTag
          }
        }
        if (i === 0) { embed.addField(`${i + 1}. ${await bot.getEmoji.run(bot, 'gold')} \`${member}\` ${await bot.getEmoji.run(bot, 'gold')}`, `Cat Money: **$${bot.functions.formatMoney(userdata[i].money.catmoney)}**`) } else if (i === 1) { embed.addField(`${i + 1}. ${await bot.getEmoji.run(bot, 'silver')} \`${member}\` ${await bot.getEmoji.run(bot, 'silver')}`, `Cat Money: **$${bot.functions.formatMoney(userdata[i].money.catmoney)}**`) } else if (i === 2) { embed.addField(`${i + 1}. ${await bot.getEmoji.run(bot, 'bronze')} \`${member}\` ${await bot.getEmoji.run(bot, 'bronze')}`, `Cat Money: **$${bot.functions.formatMoney(userdata[i].money.catmoney)}**`) } else if (i > 2) { embed.addField(`${i + 1}. \`${member}\``, `Cat Money: **$${bot.functions.formatMoney(userdata[i].money.catmoney)}**`) }
      }
    }
    message.channel.send(embed)
  })

  //* Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 3500)
}

module.exports.help = {
  name: 'leaderboard',
  aliases: ['leaderboards', 'lb'],
  type: 'normal'
}
