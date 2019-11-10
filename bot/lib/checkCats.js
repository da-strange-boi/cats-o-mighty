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

  // if someone is missing a cat from their account this will add it with default values
  const userCol = bot.database.Userdata
  const guildCol = bot.database.Guildsettings

  userCol.findOne({ userID: message.author.id }, (err, userData) => {
    if (err) bot.log('error', err)
    
    for (let i = 0; i < newCatList.length; i++) {
      let catDbname = `cats.${newCatList[i]}`
      if (userData.cats[newCatList[i]] === undefined) {
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbname]: {amount: 0, totalGot: 0, discovered: false}}})
      }
    }

  });

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
