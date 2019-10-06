/*
  this is just all one big mess that probably shouldn't be messed with
  unless a cat is being added or this method is being changed :)

  all this does is check if a user has all the updated cats in their
  database userdata otherwise the data would be undefined
*/
exports.run = (bot, message) => {
  // Select A User Data From The Database
  bot.database.Userdata.findOne({ userID: message.author.id }, (err, userData) => {
    if (err) bot.log('error', err)
    if (userData) {
      const userCatAmt = userData.cats
      if (userCatAmt.cursedcat === undefined) {
        userCatAmt.cursedcat = 0
      }
      if (userCatAmt.russianblue === undefined && userCatAmt.munchkin === undefined) {
        userCatAmt.russianblue = 0
        userCatAmt.munchkin = 0
      }
      if (userCatAmt.turkishangora === undefined) {
        userCatAmt.turkishangora = 0
      }
      if (userCatAmt.loki === undefined && userCatAmt.loverboy === undefined) {
        userCatAmt.loki = 0
        userCatAmt.loverboy = 0
      }
      if (userCatAmt.uwu === undefined) {
        userCatAmt.uwu = 0
      }
      if (userCatAmt.calico === undefined && userCatAmt.tabby === undefined && userCatAmt.norwegianforest === undefined && userCatAmt.britishshorthair === undefined && userCatAmt.tom === undefined && userCatAmt.demoncat === undefined) {
        userCatAmt.calico = 0
        userCatAmt.tabby = 0
        userCatAmt.norwegianforest = 0
        userCatAmt.britishshorthair = 0
        userCatAmt.tom = 0
        userCatAmt.demoncat = 0
      }
      if (userCatAmt.killerclaws === undefined) {
        userCatAmt.killerclaws = 0
      }
      if (userCatAmt.devonrex === undefined && userCatAmt.ojosazules === undefined && userCatAmt.bongocat === undefined && userCatAmt.grumpycat === undefined) {
        userCatAmt.devonrex = 0
        userCatAmt.ojosazules = 0
        userCatAmt.bongocat = 0
        userCatAmt.grumpycat = 0
      }
      if (userCatAmt.ghostcat === undefined) {
        userCatAmt.ghostcat = 0
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
