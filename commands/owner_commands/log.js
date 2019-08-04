const Discord = require('discord.js');
const config = require('../../config.json');
const Logs = require('../../moduls/logs.js')

module.exports.run = async (bot, message, args) => {
  if(!message.author.id === "295255543596187650") return;

  Logs.findOne({}, (err, log) => {
    if(log){
      message.channel.send(`the bot has been used: **${log.botUsed}**`);
    }
    if(!log){
      message.channel.send('ethan is alive');
    }
  });

}

module.exports.help = {
  name: 'log',
  aliases: []
}