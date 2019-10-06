exports.run = async (bot, message, args) => {
  if (!args[0]) {
    return message.channel.send("nuu that's not how you use that command")
  }
  if (args[1]) {
    const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!bUser) return message.channel.send("That person doesn't exist")
    const amtMoney = Number(args[1])

    bot.db.Userdata.findOne({
      userID: bUser.id
    }, (err, userdata) => {
      if (err) console.log(err)
      if (userdata) {
        userdata.money.catmoney += amtMoney
        userdata.save().catch(err => console.log(err))
        message.channel.send('Yes')
      }
      if (!userdata) {
        return message.channel.send("That person doesn't exist")
      }
    })
  } else {
    const amtMoney = Number(args[0])
    bot.db.Userdata.findOne({
      userID: message.author.id
    }, (err, userdata) => {
      if (err) console.log(err)
      if (userdata) {
        userdata.money.catmoney += amtMoney
        userdata.save().catch(err => console.log(err))
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
