exports.run = async (bot, message, args) => {
  if(!message.author.id === "295255543596187650") return;

  bot.db.Userdata.findOne({userID: message.author.id}, (err, userdata) => {
    userdata.stats.saidCat = 0;
    userdata.stats.catsSold = 0;
    userdata.save().catch(err => console.log(err));
    message.channel.send('fuck the rain ;)');
  });

}

exports.help = {
  name: 'clearstats',
  aliases: [],
  type: 'admin'
}