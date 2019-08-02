const mongoose = require("mongoose");

const suggestionsSchema = mongoose.Schema({
    userID: String,
    userTag: String,
    suggestionNumber: Number,
    suggestion: String
})

module.exports = mongoose.model("userSuggestion", suggestionsSchema);