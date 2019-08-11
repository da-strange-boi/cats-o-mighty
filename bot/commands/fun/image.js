const superagent = require("superagent");
let Discord = require('discord.js');
exports.run = async (bot, message, args) => {
  //* Get the json page contents
  let {body} = await superagent.get(`https://aws.random.cat/meow`);
  let imageEmbed = new Discord.RichEmbed()
  .setTitle('Random catto pic')
  .setDescription(`Image didn't load? [Click here](${body.file})`)
  .setColor(bot.config.color.cats)
  .setImage(body.file);
  await message.channel.send(imageEmbed);
}

exports.help = {
  name: 'image',
  aliases: []
}