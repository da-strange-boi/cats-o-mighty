async function clearCats(udata, uCol, user){
  for (let rarity in udata.cats) {
    for (let cat in udata.cats[rarity]) {
      await uCol.findOneAndUpdate({ userID: user }, {
        $set: {
          [`cats.${rarity}.${cat}.amount`]: 0
        }
      })
    }
  }
}

exports.run = async (bot, message, args) => {
  const userCol = bot.database.Userdata

  if (args[0]) {

    // get mentioned user to clear cats from 
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))

    // if no user mentioned, return
    if (!mentionedUser) return message.channel.send('That person doesn\'t exist')

    // find the user in the database
    await userCol.findOne({ userID: mentionedUser.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      // if the user exists in the database, clear their cats
      if (userdata) {
        clearCats(userdata, userCol, mentionedUser)
          .then(message.channel.send(`Cleared cats from **${mentionedUser}'s** account.`))
      }
      // otherwise, if the user doesnt exist, send a message saying so
      if (!userdata) return message.channel.send(`**${mentionedUser}** does not exist in the database.`)
    })

  } else if (!args[0]) {

    // Clears Cats Of The Message Author
    await userCol.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      if (userdata) {
        clearCats(userdata, userCol, message.author.id)
          .then(message.channel.send(`Cleared cats from **${message.author.id}'s** account.`))
      }
    })
  }
}

exports.help = {
  name: 'clearcats',
  aliases: ['cc'],
  type: 'admin'
}
