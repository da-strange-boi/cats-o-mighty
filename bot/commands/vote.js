const Discord = require("discord.js");
const ms = require('parse-ms');

exports.run = async (bot, message, args) => {

  //USAGE cat vote

  bot.db.Userdata.findOne({
    userID: message.author.id
  }, async (err, userdata) => {
    if(err) console.log(err);

    if(!userdata){
      message.channel.send(`:ballot_box_with_check: **You can claim your bi-daily vote now!**\n        You can vote every 12 hours\nhttps://discordbots.org/bot/569336139186700312/vote\n\nIf you could also vote for the bot at https://botsfordiscord.com/bot/569336139186700312/vote you won't get any rewards but it will be greatly appreciated, thanks!`);
      return;
    }

    let timeout = 43200000; // 12 hours
    vote = userdata.times.voteTime;

    if(vote !== null && timeout - (Date.now() - vote) > 0){
      let time = ms(timeout - (Date.now() - vote));
      message.channel.send(`You can vote every 12 hours\nIn **${time.hours}h ${time.minutes}m ${time.seconds}s** you can vote again\nhttps://discordbots.org/bot/569336139186700312/vote\n\nIf you could also vote for the bot at https://botsfordiscord.com/bot/569336139186700312/vote you won't get any rewards but it will be greatly appreciated, thanks!`);
    } else {
      message.channel.send(`:ballot_box_with_check: **You can claim your bi-daily vote now!**\n        You can vote every 12 hours\nhttps://discordbots.org/bot/569336139186700312/vote\n\nIf you could also vote for the bot at https://botsfordiscord.com/bot/569336139186700312/vote you won't get any rewards but it will be greatly appreciated, thanks!`);
    }
  });
}

module.exports.help = {
	name: "vote",
  aliases: [],
  type: 'normal'
}
