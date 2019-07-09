const mongoose = require("mongoose");

const suggestionSchema = mongoose.Schema({
    placeholder: String,
    userID: String,
    userUsername: String,
    suggestion: String
})

module.exports = mongoose.model("userSuggestion", suggestionSchema);