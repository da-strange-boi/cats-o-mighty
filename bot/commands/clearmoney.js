exports.run = async (bot, message, args) => {
  if (args[0]) {
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!mentionedUser) return message.channel.send("That person doesn't exist")

    bot.database.Userdata.findOne({ userID: mentionedUser.id }, (err, userdata) => {
      if (err) bot.log('error', err)
      if (userdata) {
        userdata.money.catmoney = 0
        userdata.save().catch(err => console.log(err))
        message.channel.send(`It's been done master!\nmoney has been cleared from ${mentionedUser}'s account`)
      }
      if (!userdata) return message.channel.send("That person doesn't exist")
    })
  } else if (!args[0]) {
    bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)
      if (userdata) {
        userdata.money.catmoney = 0
        userdata.save().catch(err => console.log(err))
        message.channel.send('It\'s been done master!\nmoney has been cleared from your account')
      }
    })
  }
}

exports.help = {
  name: 'clearmoney',
  aliases: ['cm'],
  type: 'admin'
}
