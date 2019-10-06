const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}

exports.run = async (bot, message, args) => {
  //* Select A User Data From The Database
  bot.db.Userdata.findOne({ userID: message.author.id }, async (err, userdata) => {
    if (err) bot.log('error', err)

    // set vars of cat numbers the user has || common, uncommon, rare, special
    const uSiamese = userdata.cats.siamese; const uBurmese = userdata.cats.burmese; const uRagdoll = userdata.cats.ragdoll; const uPersian = userdata.cats.persian; const uMaineCoon = userdata.cats.mainecoon; const uRussianBlue = userdata.cats.russianblue; const uCalico = userdata.cats.calico; const uTabby = userdata.cats.tabby
    const uAbyssinian = userdata.cats.abyssinian; const uManx = userdata.cats.manx; const uSphynx = userdata.cats.sphynx; const uCyprus = userdata.cats.cyprus; const uFoldex = userdata.cats.foldex; const uTurkishAngora = userdata.cats.turkishangora; const uNorwegianForest = userdata.cats.norwegianforest; const uDevonrex = userdata.cats.devonrex
    const uKorat = userdata.cats.korat; const uSingapura = userdata.cats.singapura; const uTonkinese = userdata.cats.tonkinese; const uPeterbald = userdata.cats.peterbald; const uChartreux = userdata.cats.chartreux; const uMunchkin = userdata.cats.munchkin; const uBritishShorthair = userdata.cats.britishshorthair; const uOjosazules = userdata.cats.ojosazules
    const uBandit = userdata.cats.bandit; const uBug = userdata.cats.bug; const uLinda = userdata.cats.linda; const uMittens = userdata.cats.mittens; const uCash = userdata.cats.cash; const uJackson = userdata.cats.jackson; const uCottonball = userdata.cats.cottonball; const uSonny = userdata.cats.sonny; const uSmokey = userdata.cats.smokey; const uLailah = userdata.cats.lailah; const uCher = userdata.cats.cher; const uMarvin = userdata.cats.marvin; const uLoki = userdata.cats.loki; const uLoverboy = userdata.cats.loverboy; const uKillerClaws = userdata.cats.killerclaws
    const uSquirtlett = userdata.cats.squirtlett; const uCursedcat = userdata.cats.cursedcat; const uUWU = userdata.cats.uwu; const uTom = userdata.cats.tom; const uDemoncat = userdata.cats.demoncat; const uBongocat = userdata.cats.bongocat; const uGrumpycat = userdata.cats.grumpycat
    const uGhostcat = userdata.cats.ghostcat

    // check if user has that rank of cat and assign a var depending if they do or not
    let commonCats; let uncommonCats; let rareCats; let specialCats; let impossibleCats; let seasonalCats
    if (uSiamese === 0 && uBurmese === 0 && uRagdoll === 0 && uPersian === 0 && uMaineCoon === 0 && uRussianBlue === 0 && uCalico === 0 && uTabby === 0) { commonCats = false } else { commonCats = true }
    if (uAbyssinian === 0 && uManx === 0 && uSphynx === 0 && uCyprus === 0 && uFoldex === 0 && uTurkishAngora === 0 && uNorwegianForest === 0 && uDevonrex === 0) { uncommonCats = false } else { uncommonCats = true }
    if (uKorat === 0 && uSingapura === 0 && uTonkinese === 0 && uPeterbald === 0 && uChartreux === 0 && uMunchkin === 0 && uBritishShorthair === 0 && uOjosazules === 0) { rareCats = false } else { rareCats = true }
    if (uBandit === 0 && uBug === 0 && uLinda === 0 && uMittens === 0 && uCash === 0 && uJackson === 0 && uCottonball === 0 && uSonny === 0 && uSmokey === 0 && uLailah === 0 && uCher === 0 && uMarvin === 0 && uLoki === 0 && uLoverboy === 0 && uKillerClaws === 0) { specialCats = false } else { specialCats = true }
    if (uSquirtlett === 0 && uCursedcat === 0 && uUWU === 0 && uTom === 0 && uDemoncat === 0 && uBongocat === 0 && uGrumpycat === 0) { impossibleCats = false } else { impossibleCats = true }
    if (uGhostcat === 0) { seasonalCats = false } else { seasonalCats = true }

    // If User Owns No Common Cats (no cats) Tell Them
    if (commonCats === false && uncommonCats === false && rareCats === false && specialCats === false && impossibleCats === false && seasonalCats === false) {
      const noCatsEmbed = new Discord.RichEmbed()
        .setColor(bot.config.color.error)
        .setDescription(`Sorry **${message.author.username}** you dont have any cats`)
      return message.channel.send(noCatsEmbed)
    }

    // {USAGE} cat collection
    if (!args[0]) {
      // Set A Cooldown
      if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
        const time = ms(Date.now() - cooldown[message.author.id])
        await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${30 - time.seconds}s**`).then(msg => msg.delete(1000 * (30 - time.seconds)))
        return
      }
      cooldown[message.author.id] = Date.now()

      // Make Embed To Display The Cats The User Has
      const catsEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username + ' cat collection!')
        .setColor(bot.config.color.cats)

      //* See What Categories Of Cats The User Has Then Add Them
      if (commonCats === true) {
        catsEmbed.addField(':heart: Common :heart:', `Siamese: ${uSiamese}\nBurmese: ${uBurmese}\nRagdoll: ${uRagdoll}\nPersian: ${uPersian}\nMaine Coon: ${uMaineCoon}\nRussian Blue: ${uRussianBlue}\nCalico: ${uCalico}\nTabby: ${uTabby}`, true)
      }
      if (uncommonCats === true) {
        catsEmbed.addField(':blue_heart: Uncommon :blue_heart:', `Abyssinian: ${uAbyssinian}\nManx: ${uManx}\nSphynx: ${uSphynx}\nCyprus: ${uCyprus}\nFoldex: ${uFoldex}\nTurkish Angora: ${uTurkishAngora}\nNorwegian Forest: ${uNorwegianForest}\nDevon Rex: ${uDevonrex}`, true)
      }
      if (rareCats === true) {
        catsEmbed.addField(':yellow_heart: Rare :yellow_heart:', `Korat: ${uKorat}\nSingapura: ${uSingapura}\nTonkinese: ${uTonkinese}\nPeterbald: ${uPeterbald}\nChartreux: ${uChartreux}\nMunchkin: ${uMunchkin}\nBritish Shorthair: ${uBritishShorthair}\nOjos Azules: ${uOjosazules}`, true)
      }
      if (specialCats === true) {
        catsEmbed.addField(':sparkling_heart: Special :sparkling_heart:', `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nLoverboy: ${uLoverboy}\nKiller Claws: ${uKillerClaws}`, true)
      }
      if (impossibleCats === true) {
        catsEmbed.addField(':gem: Impossible :gem:', `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}\nUWU: ${uUWU}\nTom: ${uTom}\nDemon Cat: ${uDemoncat}\nBongo Cat: ${uBongocat}\nGrumpy Cat: ${uGrumpycat}`, true)
      }
      if (seasonalCats === true) {
        catsEmbed.addField(':ghost: Seasonal :ghost:', `Ghost Cat: ${uGhostcat}`)
      }
      message.channel.send(catsEmbed)

      //* Delete The Cooldown // Resetting It
      setTimeout(() => {
        delete cooldown[message.author.id]
      }, 30000)
    }

    // {USAGE} cat collection {common|uncommon|rare|special|impossible}
    if (args[0]) {
      const catType = args[0].toLowerCase().trim()
      const allCatType = ['common', 'uncommon', 'rare', 'special', 'impossible', 'seasonal']

      for (let i = 0; i < allCatType.length; i++) {
        if (allCatType[i] === catType) { if (commonCats === false && catType === 'common') { message.channel.send(`**${message.author.username}**, you don't have any common cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (uncommonCats === false && catType === 'uncommon') { message.channel.send(`**${message.author.username}**, you don't have any uncommon cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (rareCats === false && catType === 'rare') { message.channel.send(`**${message.author.username}**, you don't have any rare cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (specialCats === false && catType === 'special') { message.channel.send(`**${message.author.username}**, you don't have any special cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (impossibleCats === false && catType === 'impossible') { message.channel.send(`**${message.author.username}**, you don't have any impossible cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (seasonalCats === false && catType === 'seasonal') { message.channel.send(`**${message.author.username}**, you don't have any seasonal cats to look at! sad uwu`); return } }

        if (catType === allCatType[i]) {
          const catsEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username + `'s ${allCatType[i]} cat collection!`)
            .setColor(bot.config.color.cats)
          if (allCatType[i] === 'common') {
            catsEmbed.addField(':heart: Common :heart:', `Siamese: ${uSiamese}\nBurmese: ${uBurmese}\nRagdoll: ${uRagdoll}\nPersian: ${uPersian}\nMaine Coon: ${uMaineCoon}\nRussian Blue: ${uRussianBlue}\nCalico: ${uCalico}\nTabby: ${uTabby}`, true)
          }
          if (allCatType[i] === 'uncommon') {
            catsEmbed.addField(':blue_heart: Uncommon :blue_heart:', `Abyssinian: ${uAbyssinian}\nManx: ${uManx}\nSphynx: ${uSphynx}\nCyprus: ${uCyprus}\nFoldex: ${uFoldex}\nTurkish Angora: ${uTurkishAngora}\nNorwegian Forest: ${uNorwegianForest}\nDevon Rex: ${uDevonrex}`, true)
          }
          if (allCatType[i] === 'rare') {
            catsEmbed.addField(':yellow_heart: Rare :yellow_heart:', `Korat: ${uKorat}\nSingapura: ${uSingapura}\nTonkinese: ${uTonkinese}\nPeterbald: ${uPeterbald}\nChartreux: ${uChartreux}\nMunchkin: ${uMunchkin}\nBritish Shorthair: ${uBritishShorthair}\nOjos Azules: ${uOjosazules}`, true)
          }
          if (allCatType[i] === 'special') {
            catsEmbed.addField(':sparkling_heart: Special :sparkling_heart:', `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nLoverboy: ${uLoverboy}\nKiller Claws: ${uKillerClaws}`, true)
          }
          if (allCatType[i] === 'impossible') {
            catsEmbed.addField(':gem: Impossible :gem:', `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}\nUWU: ${uUWU}\nTom: ${uTom}\nDemon Cat: ${uDemoncat}\nBongo Cat: ${uBongocat}\nGrumpy Cat: ${uGrumpycat}`, true)
          }
          if (seasonalCats === true) {
            catsEmbed.addField(':ghost: Seasonal :ghost:', `Ghost Cat: ${uGhostcat}`)
          }
          message.channel.send(catsEmbed)
          return
        }
      }
    }
  })
}

exports.help = {
  name: 'collection',
  aliases: ['cattos', 'c'],
  type: 'normal'
}
