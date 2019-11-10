const Discord = require('discord.js')
exports.run = async (bot, message) => {
  // {USAGE} cat stop

  const date = bot.functions.msToTime(bot.uptime)

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
