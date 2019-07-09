const mongoose = require("mongoose");

const catSchema = mongoose.Schema({
    userID: String,
    newUser: Boolean,
    siamese: Number,
    burmese: Number,
    ragdoll: Number,
    persian: Number,
    maineCoon: Number,
    russianBlue: Number,
    abyssinian: Number,
    manx: Number,
    sphynx: Number,
    cyprus: Number,
    foldex: Number,
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
    squirtlett: Number,
    cursedcat: Number
})

module.exports = mongoose.model("catList", catSchema);