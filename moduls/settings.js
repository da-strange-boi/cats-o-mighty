const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema({
  guildID: String,
  showCat: Boolean
});

module.exports = mongoose.model("guildSettings", settingsSchema);