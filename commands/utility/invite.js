const Discord = require('discord.js');
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {

  //USAGE cat invite

  let inviteEmbed = new Discord.RichEmbed()
  .setDescription('[uwu click here to invite me to your sevrer](https://discordbots.org/bot/569336139186700312)')
  .setColor(config.color.cats);
  message.channel.send(inviteEmbed);
}

module.exports.help = {
	name: "invite",
  aliases: []
}