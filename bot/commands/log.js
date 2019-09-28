exports.run = async (bot, message, args) => {

  bot.db.Logs.findOne({}, (err, log) => {
    if(log){
      message.channel.send(`the bot has been used: **${log.botUsed}**`);
    }
    if(!log){
      message.channel.send('ethan is alive');
    }
  });

}

exports.help = {
  name: 'log',
  aliases: [],
  type: 'admin'
}