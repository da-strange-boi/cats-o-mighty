const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
exports.run = async (bot, message, args) => {
  // {USAGE} cat disable

  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    const userCol = client.db('cats-o-mighty').collection('userdatas')

    userCol.findOne({ userID: message.author.id }, async (err, userdata) => {
      if (err) bot.log('error', err)

      if (userdata.disable) {
        // get cats again
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'disable': false}})
        message.channel.send(`**${message.author.username}**, you will now get cats from messages`)
      } else {
        // turn off cats getting
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'disable': true}})
        message.channel.send(`**${message.author.username}**, you will now not get anymore cats from messages`)
      }
    })

  })

}

exports.help = {
  name: 'disable',
  aliases: [],
  type: 'normal'
}
