const Discord = require('discord.js');
const config = require('../../config.json');
const Userdata = require('../../moduls/userdata.js');

module.exports.run = async (bot, message, args) => {
  if(!message.author.id === "295255543596187650") return;

  Userdata.findOne({userID: message.author.id}, (err, userdata) => {
    userdata.stats.saidCat = 0;
    userdata.stats.catsSold = 0;
    userdata.save().catch(err => console.log(err));
    message.channel.send('fuck the rain ;)');
  });

}

module.exports.help = {
  name: 'clearstats',
  aliases: []
}