const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  // {USAGE} cat supportserver

  const supportserverEmbed = new Discord.RichEmbed()
    .setDescription('[click here to join the Cats o Mighty support server](https://discord.gg/V5hvqeJ)')
    .setColor(bot.config.color.blue)
  message.channel.send(supportserverEmbed)
}
exports.help = {
  name: 'supportserver',
  aliases: [],
  type: 'normal'
}
