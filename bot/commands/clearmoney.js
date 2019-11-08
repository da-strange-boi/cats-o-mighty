const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
exports.run = async (bot, message, args) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    const userCol = client.db('cats-o-mighty').collection('userdatas')

    if (args[0]) {
      const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
      if (!mentionedUser) return message.channel.send("That person doesn't exist")

      userCol.findOne({ userID: mentionedUser.id }, (err, userdata) => {
        if (err) bot.log('error', err)
        if (userdata) {
          userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {
            'money.catmoney': 0
          }})
          message.channel.send(`money has been cleared from ${mentionedUser}'s account`)
        }
        if (!userdata) return message.channel.send("That person doesn't exist")
      })

    } else if (!args[0]) {

      userCol.findOne({ userID: message.author.id }, (err, userdata) => {
        if (err) bot.log('error', err)
        if (userdata) {
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {
            'money.catmoney': 0
          }})
          message.channel.send('money has been cleared from your account')
        }
      })

    }

  })
}

exports.help = {
  name: 'clearmoney',
  aliases: ['cm'],
  type: 'admin'
}
