const Discord = require('discord.js');
exports.run = async (bot, message, args) => {

  //USAGE cat invite

  let inviteEmbed = new Discord.RichEmbed()
  .setDescription('[uwu click here to invite me to your sevrer](https://discordbots.org/bot/569336139186700312)')
  .setColor(bot.config.color.cats);
  message.channel.send(inviteEmbed);
}

exports.help = {
	name: "invite",
  aliases: [],
  type: 'normal'
}