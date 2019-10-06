exports.run = async (bot, message, args) => {
  if (!args[0]) {
    return message.channel.send("nuu that's not how you use that command")
  }

  if (args[1]) {
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!mentionedUser) return message.channel.send("That person doesn't exist")
    const amtMoney = Number(args[1])

    bot.database.Userdata.findOne({ userID: mentionedUser.id }, (err, userdata) => {
      if (err) bot.log('error', err)
      if (userdata) {
        userdata.money.catmoney += amtMoney
        userdata.save().catch(err => bot.log('error', err))
        message.channel.send('Yes')
      }
      if (!userdata) {
        return message.channel.send("That person doesn't exist")
      }
    })
  } else {
    const amtMoney = Number(args[0])
    bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)
      if (userdata) {
        userdata.money.catmoney += amtMoney
        userdata.save().catch(err => bot.log('error', err))
        message.channel.send('Yes')
      }
    })
  }
}

exports.help = {
  name: 'addmoney',
  aliases: ['am'],
  type: 'admin'
}
