exports.run = (bot, message, args) => {
  //USAGE deletesuggestion {suggestion number}

  if(message.author.id != '295255543596187650'){ return; }

  if(!args[0]){
    message.channel.send('check the help');
    return;
  }

  bot.db.Suggestion.findOneAndRemove({suggestionNumber: args[0]}, (err, res) => {
    if(err) throw err;
    message.channel.send(`Suggestion #${args[0]} has been deleted`);
  });
}

exports.help = {
  name: 'deletesuggestion',
  aliases: ['delete'],
  type: 'admin'
}