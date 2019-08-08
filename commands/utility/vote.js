const Discord = require("discord.js");
const ms = require('parse-ms');
const config = require("../../config.json");
const Userdata = require("../../moduls/userdata.js");

module.exports.run = async (bot, message, args) => {

  //USAGE cat vote

  Userdata.findOne({
    userID: message.author.id
  }, async (err, userdata) => {
    if(err) console.log(err);

    if(!userdata){
      await message.channel.send(`:ballot_box_with_check: **You can claim your bi-daily vote now!**\n        You can vote every 12 hours\nhttps://discordbots.org/bot/569336139186700312/vote`);
      return;
    }

    let timeout = 43200000; // 12 hours
    vote = userdata.times.voteTime;

    if(vote !== null && timeout - (Date.now() - vote) > 0){
      let time = ms(timeout - (Date.now() - vote));
      await message.channel.send(`You can vote every 12 hours\nIn **${time.hours}h ${time.minutes}m ${time.seconds}s** you can vote again\nhttps://discordbots.org/bot/569336139186700312/vote`);

    } else {
      await message.channel.send(`:ballot_box_with_check: **You can claim your bi-daily vote now!**\n        You can vote every 12 hours\nhttps://discordbots.org/bot/569336139186700312/vote`);
    }
  });
}

module.exports.help = {
	name: "vote",
  aliases: []
}
