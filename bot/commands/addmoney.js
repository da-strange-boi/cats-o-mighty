exports.run = async (bot, message, args) => {
  if (!args[0]) {
    return message.channel.send("nuu that's not how you use that command")
  }

  const userCol = bot.database.Userdata

  if (args[1]) {
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!mentionedUser) return message.channel.send("That person doesn't exist")
    const amtMoney = Number(args[1])

    userCol.findOne({ userID: mentionedUser.id }, (err, userdata) => {
      if (userdata) {
        userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'money.catmoney': userdata.money.catmoney + amtMoney}})
        message.channel.send('Yes')
      }
      if (!userdata) {
        return message.channel.send("That person doesn't exist")
      }
    })
  } else if (args[0] && !args[1]) {
    const amtMoney = Number(args[0])
    userCol.findOne({ userID: message.author.id }, (err, userdata) => {
      if (userdata) {
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + amtMoney}})
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
