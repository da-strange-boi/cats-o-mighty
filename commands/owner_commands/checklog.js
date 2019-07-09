const discord = require("discord.js");
const config = require('../../config.json')
const fs = require("fs");
const ms = require('parse-ms');

module.exports.run = async (bot, message, args) => {
  if(!message.author.id === "295255543596187650") return;

  var log = JSON.parse(fs.readFileSync('./utils/log.json', 'utf8'));
  let me = message.guild.members.get('295255543596187650');

  if(args[0] === "new"){
    resetLog = {"time": Date.now(),"messages": 0}
    fs.writeFile("./utils/log.json", JSON.stringify(resetLog), (err) => { if (err) console.log(err) });
    message.channel.send('The log has been reset!');
    return;
  }

  let time = ms(Date.now() - log.time);

  let logEmbed = new Discord.RichEmbed()
  .setTitle("Cats o Mighty Log Report")
  .setColor(config.color.cats)
  .addField(`In the last ${time.hours}h ${time.minutes}m ${time.seconds}s`, `messages sent: ${log.messages}`)
  .setTimestamp();

  me.send(logEmbed);

  resetLog = {
    "time": Date.now(),
    "messages": 0
  }
  fs.writeFile("./utils/log.json", JSON.stringify(resetLog), (err) => { if (err) console.log(err) });

}

module.exports.help = {
  name: 'checklog',
  aliases: []
}