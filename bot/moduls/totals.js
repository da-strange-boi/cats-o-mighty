const mongoose = require("mongoose");

const totalsSchema = mongoose.Schema({
  totalcat: String,
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
  }
})

module.exports = mongoose.model("totalList", totalsSchema);