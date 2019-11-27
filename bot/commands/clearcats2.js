async function clearCats(udata, uCol, user){
  for(let rarity in udata.cats){
    for(let cat in udata.cats[rarity]){
      await uCol.findOneAndUpdate({ userID: user.id }, 
        {
          $set: {
            [`userdata.cats.${rarity}.${cat}.amount`]: 0
          }
        })
    }
  }
}

exports.run = async (bot, message, args) => {
  const userCol = bot.database.Userdata

  let userToClear = false
  
  if (args[0]) {
  
    // get mentioned user to clear cats from 
    userToClear = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
  
    // if no user mentioned, return
    if (!userToClear) return message.channel.send('That person doesn\'t exist')
  
  } else if (!args[0]) {
  
    // Clears Cats Of The Message Author

    userToClear = message.author
  }

  if(userToClear){
  // find the user in the database
    await userCol.findOne({ userID: userToClear.id }, (err, userdata) => {
      if (err) bot.log('error', err)
  
      // if the user exists in the database, clear their cats
      if (userdata) {
        clearCats(userdata, userCol, userToClear)
          .then(message.channel.send(`Cleared cats from **${userToClear.username}'s** account.`))
      }
      // otherwise, if the user doesnt exist, send a message saying so
      if (!userdata) return message.channel.send(`**${userToClear.username}** does not exist in the database.`)
    })
  }else{
    message.channel.send('What The Fuck')
  }
}

exports.help = {
  name: 'clearcats2',
  aliases: ['cc2'],
  type: 'admin'
}
