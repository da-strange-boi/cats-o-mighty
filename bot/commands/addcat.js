exports.run = async (bot, message, args) => {
  // {USAGE} cat addcat {cat name} {amount} || addcat {@user} {cat name} {amount}

  // If Command Isn't Use Properly
  if (!args[0] || !args[1]) {
    return message.channel.send('check `cat help addcat` you fucking dumbass')
  }

  // {USAGE} addcat {@user} {cat name} {amount}
  if (args[2]) {
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!mentionedUser) return message.channel.send('That person doesn\'t exist')
    const amtCat = Math.round(parseInt(args[2].trim()))
    const catName = args[1].toLowerCase().trim()

    const userCol = bot.database.Userdata
    userCol.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      const userCats = userdata.cats
      for (let category in userCats) {
        for (let catTypes in userCats[category]) {
          if (catName === catTypes) {
            const updatedString = `cats.${category}.${catTypes}.amount`
            userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {[updatedString]: userCats[category][catTypes].amount + amtCat}})
          }
        }
      }

      return message.channel.send(`${args[2]} ${args[1]}'s has been added to ${mentionedUser} account`)
    })
    return
  }

  // {USAGE} cat addcat {cat name} {amount}
  if (args[1] && !args[2]) {
    // Adds Cats Of The Message Author
    const userCol = bot.database.Userdata
    userCol.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      const amtCat = Math.round(parseInt(args[1].trim()))
      const catName = args[0].toLowerCase().trim()

      const userCats = userdata.cats
      for (let category in userCats) {
        for (let catTypes in userCats[category]) {
          if (catName === catTypes) {
            const updatedString = `cats.${category}.${catTypes}.amount`
            userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[updatedString]: userCats[category][catTypes].amount + amtCat}})
          }
        }
      }

      message.channel.send(`${args[1]} ${args[0]}'s has been added to your account`)
    })
  }
}

exports.help = {
  name: 'addcat',
  aliases: ['ac'],
  type: 'admin'
}
