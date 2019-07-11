const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {
  let chanceEmbed = new Discord.RichEmbed()
  .setTitle('Chances')
  .setColor(config.color.utility)
  .addField('Chance of getting a cat type', `Common - 1/25\nUncommon - 1/80\nRare - 1/145\nSpecial - 1/370\nImpossible - 1/740`)
  .addField('Prices of cat type', `Common - $25\nUncommon - $55\nRare - $200\nSpecial - $2500\nImpossible - $10,000`);
  message.channel.send(chanceEmbed);
}

module.exports.help = {
  name: "chance",
  aliases: []
}