const Discord = require('discord.js')

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

exports.run = async (bot, message, args) => {
  // {USAGE} cat stop

  const date = msToTime(bot.uptime)

  const stopcatEmbed = new Discord.RichEmbed()
    .setAuthor(bot.user.tag, bot.user.avatarURL)
    .setColor(bot.config.color.red)
    .setDescription(`**${bot.user.username}** stopping in **${bot.guilds.size}** servers with **${bot.users.size}** users\nwith an uptime of ${date.days} days ${date.hours} hours ${date.minutes} minutes ${date.seconds} seconds\nbot will stop shortly`)

  await message.channel.send(stopcatEmbed)

  setTimeout(() => {
    bot.log('offline', 'shutdown')
    bot.database.db.close()
    bot.destroy()
  }, 5000)
}

exports.help = {
  name: 'stop',
  aliases: [],
  type: 'admin'
}
