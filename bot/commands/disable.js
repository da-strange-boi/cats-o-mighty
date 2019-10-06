exports.run = async (bot, message, args) => {
  // {USAGE} cat disable

  bot.database.Userdata.findOne({ userID: message.author.id }, async (err, userdata) => {
    if (err) bot.log('error', err)

    if (userdata.disable) {
      // get cats again
      userdata.disable = false
      message.channel.send(`**${message.author.username}**, you will now get cats from messages`)
    } else {
      // turn off cats getting
      userdata.disable = true
      message.channel.send(`**${message.author.username}**, you will now not get anymore cats from messages`)
    }

    userdata.save().catch(err => console.log(err))
  })
}

exports.help = {
  name: 'disable',
  aliases: [],
  type: 'normal'
}
