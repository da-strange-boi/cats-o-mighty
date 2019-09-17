const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
  useNewUrlParser: true,
  useFindAndModify: false
});
const data = require("../moduls/userdata.js");
const log = require('../moduls/logs.js');
const guildsettings = require('../moduls/guildsettings.js');
const total = require('../moduls/totals.js');
const suggestion = require("../moduls/suggestions.js");

module.exports = {
  Userdata: data,
  Logs: log,
  Guildsettings: guildsettings,
  Totals: total,
  Suggestion: suggestion
}