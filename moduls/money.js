const mongoose = require("mongoose");

const moneySchema = mongoose.Schema({
    placeholder: String,
    userID: String,
    userUsername: String,
    money: Number
})

module.exports = mongoose.model("userMoney", moneySchema);