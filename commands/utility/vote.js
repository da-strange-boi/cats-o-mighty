const Discord = require("discord.js");
const ms = require('parse-ms');

const config = require("../../config.json");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {useNewUrlParser: true});
const Daily = require("../../moduls/daily.js");

module.exports.run = async (bot, message, args) => {

  //USAGE cat vote

  Daily.findOne({
    userID: message.author.id
  }, (err, userDaily) => {
    if(err) console.log(err);

    if(!userDaily){
      message.channel.send(`:ballot_box_with_check: **You can claim your bi-daily vote now!**\n      - You can vote every 12 hours\nhttps://discordbots.org/bot/569336139186700312/vote`);
      return;
    }

    let timeout = 43200000; // 12 hours
    vote = userDaily.vote;

    if(vote !== null && timeout - (Date.now() - vote) > 0){
      let time = ms(timeout - (Date.now() - vote));
      message.channel.send(`You can vote every 12 hours\nIn **${time.hours}h ${time.minutes}m ${time.seconds}s** you can vote again\nhttps://discordbots.org/bot/569336139186700312/vote`);

    } else {
      message.channel.send(`:ballot_box_with_check: **You can claim your bi-daily vote now!**\n      - You can vote every 12 hours\nhttps://discordbots.org/bot/569336139186700312/vote`);
    }
  });
}

module.exports.help = {
	name: "vote",
  aliases: []
}
