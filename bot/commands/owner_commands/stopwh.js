exports.run = async (bot, message, args) => {
  bot.wh.clearping();
  message.channel.send('stopped ping webhook');
}

exports.help = {
  name: 'stopwh',
  aliases: []
}