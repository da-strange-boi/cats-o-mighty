const mongoose = require("mongoose");

const guildsettingsSchema = mongoose.Schema({
  guildID: String,
  CatGottenPopupMessage: Boolean
});

module.exports = mongoose.model("guildSettings", guildsettingsSchema);