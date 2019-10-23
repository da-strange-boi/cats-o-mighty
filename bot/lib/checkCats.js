/*
  this is just all one big mess that probably shouldn't be messed with
  unless a cat is being added or this method is being changed :)

  - (edit 10/23/19) its not that messey now that i used a for loop and not just a bunch of if statements

  all this does is check if a user has all the updated cats in their
  database userdata otherwise the data would be undefined
*/
const newCatList = [
  'cursedcat', 'russianblue', 'munchkin', 'turkishangora', 'loki', 'loverboy', 'uwu', 
  'calico', 'tabby', 'norwegianforest', 'britishshorthair', 'tom', 'demoncat', 'killerclaws', 
  'devonrex', 'ojosazules', 'bongocat', 'grumpycat', 'ghostcat'
]
exports.run = (bot, message) => {
  // Select A User Data From The Database
  bot.database.Userdata.findOne({ userID: message.author.id }, (err, userData) => {
    if (err) bot.log('error', err)
    if (userData) {
      const userCatAmt = userData.cats

      for (let i = 0; i < newCatList.length; i++) {
        // if any values (of new cats) returns undefined (non existent) then add it and give it a value of 0
        if (userCatAmt[newCatList[i]] === undefined) {
          userCatAmt[newCatList[i]] = 0
        }
      }

      userData.userTag = message.author.tag
      userData.save().catch(err => console.log(err))
    }
  })

  bot.database.Guildsettings.findOne({ guildID: message.guild.id }, (err, guildSettings) => {
    if (err) bot.log('error', err)
    if (!guildSettings) {
      const newSettings = new bot.database.Guildsettings({
        guildID: message.guild.id,
        CatGottenPopupMessage: 'disappear'
      })
      newSettings.save().catch(err => console.log(err))
    }
  })
}
