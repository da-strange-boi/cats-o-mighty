exports.run = (bot, message, args) => {
  // {USAGE} deletesuggestion {suggestion number}

  if (!args[0]) {
    return message.channel.send('check the help')
  }

  bot.db.Suggestion.findOneAndRemove({ suggestionNumber: args[0] }, (err, res) => {
    if (err) bot.log('error', err)
    message.channel.send(`Suggestion #${args[0]} has been deleted`)
  })
}

exports.help = {
  name: 'deletesuggestion',
  aliases: ['delete'],
  type: 'admin'
}
