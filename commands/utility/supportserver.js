const Discord = require('discord.js');
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {

  //USAGE cat supportserver

  let supportserverEmbed = new Discord.RichEmbed()
  .setDescription('[click here to join the Cats o Mighty support server](https://discord.gg/V5hvqeJ)')
  .setColor(config.color.cats);
  message.channel.send(supportserverEmbed);
}

module.exports.help = {
	name: "supportserver",
  aliases: []
}