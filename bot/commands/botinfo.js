const Discord = require('discord.js')
exports.run = async (bot, message) => {
  const msToTime = (ms) => {
    const days = Math.floor((ms / 86400000)) // 1 Day = 86400000 Milliseconds
    const hours = Math.floor((ms % 86400000) / 3600000) // 1 Hour = 3600000 Milliseconds
    const minutes = Math.floor((ms % 3600000) / 60000) // 1 Minutes = 60000 Milliseconds
    const seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
  }

  const bIcon = bot.user.displayAvatarURL
  const date = msToTime(bot.uptime)

  const botEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .setColor(bot.config.color.darkblue)
    .setThumbnail(bIcon)
    .addField(':date: Created On', bot.user.createdAt)
    .addField(':hourglass: Uptime', `${date.days} Days ${date.hours} Hours ${date.minutes} Minutes ${date.seconds} Seconds`)
    .addField(':desktop: Number of lines of code', '2,465 lines')
    .addField(':floppy_disk: Numbers of commands', '17')
    .addField(':alarm_clock: Time took to make', '86 hours')

  return message.channel.send(botEmbed)
}

exports.help = {
  name: 'botinfo',
  aliases: [],
  type: 'moderator'
}
