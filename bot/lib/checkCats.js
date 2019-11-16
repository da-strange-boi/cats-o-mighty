/*
  this is just all one big mess that probably shouldn't be messed with
  unless a cat is being added or this method is being changed :)

  - (edit 10/23/19) its not that messey now that i used a for loop and not just a bunch of if statements

  all this does is check if a user has all the updated cats in their
  database userdata otherwise the data would be undefined
*/
const newCatList = [
  'siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'calico', 'tabby',
  'abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishangora', 'norwegianforest', 'devonrex',
  'korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin', 'britishshorthair', 'ojosazules',
  'bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws',
  'squirtlett', 'cursedcat', 'uwu', 'tom', 'demoncat','devonrex', 'ojosazules', 'bongocat', 'grumpycat', 
  'ghostcat'
]
exports.run = (bot, message) => {
  const userCol = bot.database.Userdata
  const guildCol = bot.database.Guildsettings

  userCol.findOne({ userID: message.author.id }, (err, userData) => {
    if (err) bot.log('error', err)
    
    for (let i = 0; i < newCatList.length; i++) {
      // if someone is missing a cat from their account this will add it with default values
      if (userData.cats[newCatList[i]] === undefined) {
        let catDbname = `cats.${newCatList[i]}`
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbname]: {amount: 0, totalGot: 0, discovered: false}}})
      }
      // if someone has the wrong format of cat object add it
      if (!isNaN(userData.cats[newCatList[i]])) {
        let catDbname = `cats.${newCatList[i]}`
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbname]: {amount: userData.cats[newCatList[i]], totalGot: 0, discovered: false}}})
      }
      // add the discovered
      if (userData.cats[newCatList[i]].amount > 0) {
        if (userData.cats[newCatList[i]].discovered === false) {
          let catDbname = `cats.${newCatList[i]}.discovered`
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbname]: true}})
        }
      }
    }

  })

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
