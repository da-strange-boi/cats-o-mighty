const mongoose = require("mongoose");

const logsSchema = mongoose.Schema({
  botUsed: Number
});

module.exports = mongoose.model("log", logsSchema);