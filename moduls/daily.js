const mongoose = require("mongoose");

const dailySchema = mongoose.Schema({
    userID: String,
    daily: String,
    dailyStreak: Number,
    vote: String
})

module.exports = mongoose.model("userDaily", dailySchema);