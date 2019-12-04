exports.run = async (bot, message, args) => {
  // {USAGE} cat discover {cat name} || discover {@user} {cat name}

  // {USAGE} discover {@user} {cat name}
  if (args[1]) {
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!mentionedUser) return message.channel.send('That person doesn\'t exist')

    // Adds Cats Of The Message Author

    const userCol = bot.database.Userdata

    userCol.findOne({ userID: mentionedUser.id }, async (err, userdata) => {

      if (err) bot.log('error', err)

      const catName = args[0].toLowerCase().trim()
      const userCats = userdata.cats

      // loop through rarities / cats
      for (let rarity in userCats) {
        for (let cat in userCats[rarity]) {
          if (catName === cat) {
            await userCol.findOneAndUpdate({ userID: mentionedUser.id },
              {
                $set: {
                  [`cats.${rarity}.${cat}.discovered`]: true
                }
              }).then(
              message.channel.send(`**${bot.functions.cap(catName)}** has been discovered!`)
            )
            return
          }
        }
      }
      return
    })
  }

  // {USAGE} cat discover {cat name}
  if (args[0] && !args[1]) {

    // Adds Cats Of The Message Author

    const userCol = bot.database.Userdata

    userCol.findOne({ userID: message.author.id }, async (err, userdata) => {

      if (err) bot.log('error', err)

      const catName = args[0].toLowerCase().trim()
      const userCats = userdata.cats

      // loop through rarities / cats
      for (let rarity in userCats) {
        for (let cat in userCats[rarity]) {

          console.log(cat, userdata.cats[rarity][cat].discovered)

          if (catName === cat) {
            await userCol.findOneAndUpdate({ userID: message.author.id },
              {
                $set: {
                  [`cats.${rarity}.${cat}.discovered`]: true
                }
              }).then(
              message.channel.send(`**${bot.functions.cap(catName)}** has been discovered!`)
            )
            return
          }
        }
      }
    })
  }
}

exports.help = {
  name: 'discover',
  aliases: ['disc'],
  type: 'admin'
}