const mongoose = require("mongoose");

const userdataSchema = mongoose.Schema({
  userID: String,
  userTag: String,
  cats: {
    siamese: Number,
    burmese: Number,
    ragdoll: Number,
    persian: Number,
    mainecoon: Number,
    russianblue: Number,
    abyssinian: Number,
    manx: Number,
    sphynx: Number,
    cyprus: Number,
    foldex: Number,
    turkishangora: Number,
    korat: Number,
    singapura: Number,
    tonkinese: Number,
    peterbald: Number,
    chartreux: Number,
    munchkin: Number,
    bandit: Number,
    bug: Number,
    linda: Number,
    mittens: Number,
    cash: Number,
    jackson: Number,
    cottonball: Number,
    sonny: Number,
    smokey: Number,
    lailah: Number,
    cher: Number,
    marvin: Number,
    loki: Number,
    loverboy: Number,
    squirtlett: Number,
    cursedcat: Number,
    uwu: Number
  },
  money: {
    catmoney: Number
  },
  times: {
    dailyTime: Number,
    voteTime: Number,
    usedBotLast: Number
  },
  stats: {
    catsSold: Number,
    saidCat: Number,
    dailyStreak: Number,
    voteStreak: Number
  }
});

module.exports = mongoose.model("userdata", userdataSchema);