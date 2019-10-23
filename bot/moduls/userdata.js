const mongoose = require('mongoose')

const userdataSchema = mongoose.Schema({
  userID: String,
  userTag: String,
  disable: Boolean,
  cats: {
    siamese: { amount: Number, totalGot: Number, discovered: Boolean },
    burmese: { amount: Number, totalGot: Number, discovered: Boolean },
    ragdoll: { amount: Number, totalGot: Number, discovered: Boolean },
    persian: { amount: Number, totalGot: Number, discovered: Boolean },
    mainecoon: { amount: Number, totalGot: Number, discovered: Boolean },
    russianblue: { amount: Number, totalGot: Number, discovered: Boolean },
    calico: { amount: Number, totalGot: Number, discovered: Boolean },
    tabby: { amount: Number, totalGot: Number, discovered: Boolean },
    abyssinian: { amount: Number, totalGot: Number, discovered: Boolean },
    manx: { amount: Number, totalGot: Number, discovered: Boolean },
    sphynx: { amount: Number, totalGot: Number, discovered: Boolean },
    cyprus: { amount: Number, totalGot: Number, discovered: Boolean },
    foldex: { amount: Number, totalGot: Number, discovered: Boolean },
    turkishangora: { amount: Number, totalGot: Number, discovered: Boolean },
    norwegianforest: { amount: Number, totalGot: Number, discovered: Boolean },
    devonrex: { amount: Number, totalGot: Number, discovered: Boolean },
    korat: { amount: Number, totalGot: Number, discovered: Boolean },
    singapura: { amount: Number, totalGot: Number, discovered: Boolean },
    tonkinese: { amount: Number, totalGot: Number, discovered: Boolean },
    peterbald: { amount: Number, totalGot: Number, discovered: Boolean },
    chartreux: { amount: Number, totalGot: Number, discovered: Boolean },
    munchkin: { amount: Number, totalGot: Number, discovered: Boolean },
    britishshorthair: { amount: Number, totalGot: Number, discovered: Boolean },
    ojosazules: { amount: Number, totalGot: Number, discovered: Boolean },
    bandit: { amount: Number, totalGot: Number, discovered: Boolean },
    bug: { amount: Number, totalGot: Number, discovered: Boolean },
    linda: { amount: Number, totalGot: Number, discovered: Boolean },
    mittens: { amount: Number, totalGot: Number, discovered: Boolean },
    cash: { amount: Number, totalGot: Number, discovered: Boolean },
    jackson: { amount: Number, totalGot: Number, discovered: Boolean },
    cottonball: { amount: Number, totalGot: Number, discovered: Boolean },
    sonny: { amount: Number, totalGot: Number, discovered: Boolean },
    smokey: { amount: Number, totalGot: Number, discovered: Boolean },
    lailah: { amount: Number, totalGot: Number, discovered: Boolean },
    cher: { amount: Number, totalGot: Number, discovered: Boolean },
    marvin: { amount: Number, totalGot: Number, discovered: Boolean },
    loki: { amount: Number, totalGot: Number, discovered: Boolean },
    loverboy: { amount: Number, totalGot: Number, discovered: Boolean },
    killerclaws: { amount: Number, totalGot: Number, discovered: Boolean },
    squirtlett: { amount: Number, totalGot: Number, discovered: Boolean },
    cursedcat: { amount: Number, totalGot: Number, discovered: Boolean },
    uwu: { amount: Number, totalGot: Number, discovered: Boolean },
    tom: { amount: Number, totalGot: Number, discovered: Boolean },
    demoncat: { amount: Number, totalGot: Number, discovered: Boolean },
    bongocat: { amount: Number, totalGot: Number, discovered: Boolean },
    grumpycat: { amount: Number, totalGot: Number, discovered: Boolean },
    ghostcat: { amount: Number, totalGot: Number, discovered: Boolean }
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
})

module.exports = mongoose.model('userdata', userdataSchema)
