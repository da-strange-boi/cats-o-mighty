const mongoose = require('mongoose')

const guildsettingsSchema = mongoose.Schema({
  guildID: String,
  CatGottenPopupMessage: String
})

module.exports = mongoose.model('guildSettings', guildsettingsSchema)
