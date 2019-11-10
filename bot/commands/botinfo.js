const Discord = require('discord.js')
const version = require('../../package')
exports.run = async (bot, message) => {
  
  const bIcon = bot.user.displayAvatarURL
  const date = bot.functions.msToTime(bot.uptime)

  const botEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setColor(bot.config.color.darkblue)
    .setThumbnail(bIcon)
    .addField(':date: Created On', bot.user.createdAt)
    .addField(':hourglass: Uptime', `${date.days} Days ${date.hours} Hours ${date.minutes} Minutes ${date.seconds} Seconds`)
    .addField(':rosette: Version', version.version)

  return message.channel.send(botEmbed)
}

exports.help = {
  name: 'botinfo',
  aliases: [],
  type: 'moderator'
}
