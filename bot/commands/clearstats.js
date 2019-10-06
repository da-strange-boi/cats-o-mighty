exports.run = async (bot, message, args) => {
  bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
    if (err) bot.log('error', err)

    userdata.stats.saidCat = 0
    userdata.stats.catsSold = 0
    userdata.save().catch(err => bot.log('error', err))
    message.channel.send('Done')
  })
}

exports.help = {
  name: 'clearstats',
  aliases: [],
  type: 'admin'
}
