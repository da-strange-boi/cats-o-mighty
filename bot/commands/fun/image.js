const superagent = require("superagent");
const Discord = require('discord.js');
const ms = require('parse-ms');
let cooldown = {};
exports.run = async (bot, message, args) => {

  if(!message.guild.me.hasPermission('ATTACH_FILES')) return message.channel.send('I do not have the `ATTACH_FILES` permission, so I can\'t send images');

  //* Set A Cooldown
  if(cooldown[message.author.id] && cooldown[message.author.id] > 0){
    let time = ms(Date.now() - cooldown[message.author.id]);
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${5 - time.seconds}s**`).then(msg => msg.delete(1000 * (5 - time.seconds)));
    return;
  }
  cooldown[message.author.id] = Date.now();

  //* Get the json page contents
  let {body} = await superagent.get(`https://aws.random.cat/meow`);
  let imageEmbed = new Discord.RichEmbed()
  .setTitle('Random Cat Pictrue/Gif')
  .setDescription(`Image didn't load? [Click here](${body.file})`)
  .setColor(bot.config.color.cats)
  .setImage(body.file);
  await message.channel.send(imageEmbed);

  //* Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id];
  }, 5000);
}

exports.help = {
  name: 'image',
  aliases: ['picture', 'pic']
}