const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  const chanceEmbed = new Discord.RichEmbed()
    .setTitle('Chances')
    .setColor(bot.config.color.utility)
    .addField('Chance of getting a cat type', 'Common - 1/25\nUncommon - 1/80\nRare - 1/145\nSpecial - 1/370\nImpossible - 1/740')
    .addField('Chance of getting cat - feed', 'Common - 1/13\nUncommon - 1/40\nRare - 1/73\nSpecial - 1/185\nImpossible - 1/370')
    .addField('Prices of cat type', 'Common - $25\nUncommon - $55\nRare - $200\nSpecial - $2,500\nImpossible - $10,000')
  await message.channel.send(chanceEmbed)
}

module.exports.help = {
  name: 'chance',
  aliases: [],
  type: 'normal'
}
