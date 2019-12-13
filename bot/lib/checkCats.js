/*
  all this does is check if a user has all the updated cats in their
  database userdata otherwise the data would be undefined
*/

exports.run = (bot, message) => {
  const userCol = bot.database.Userdata
  const guildCol = bot.database.Guildsettings

  userCol.findOne({ userID: message.author.id }, (err, userdata) => {
    if (err) bot.log('error', err)

    for (let rarity in userdata.cats) {
      // if someone is missing a cat from their account this will add it with default values
      Object.keys(bot.catData[rarity]).forEach(cat => {
        if (!Object.keys(userdata.cats[rarity]).includes(cat.toString())) {
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.${rarity}.${cat}`]: {amount: 0, totalGot: 0, discovered: false}}})
        }
      })
      for (let cat in userdata.cats[rarity]) {
        /* 
          if someone has the wrong format of cat object (the old one) then update it 
          not sure if this is even needed (or will even work)
        */
        if (!isNaN(userdata.cats[cat])) {
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.${rarity}.${cat}`]: {amount: userdata.cats[cat], totalGot: 0, discovered: false}}})
        }

        // add the discovered
        if (userdata.cats[rarity][cat].amount > 0) {
          if (userdata.cats[rarity][cat].discovered === false) {
            userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[`cats.${rarity}.${cat}.discovered`]: true}})
          }
        }
      }
    }

  })

  /* 
    Makes sure there is a guild entry for the guild the user is sending the message 
    if not create one
  */
  guildCol.findOne({ guildID: message.guild.id }, (err, guildSettings) => {
    if (err) bot.log('error', err)

    if(!guildSettings) {
      guildCol.insertOne({
        guildID: message.guild.id,
        CatGottenPopupMessage: 'disappear'
      })
    }
  })
}
