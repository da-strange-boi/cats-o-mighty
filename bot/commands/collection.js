const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}

exports.run = async (bot, message, args) => {
  //* Select A User Data From The Database
  bot.database.Userdata.findOne({ userID: message.author.id }, async (err, userdata) => {
    if (err) bot.log('error', err)

    // set vars of cat numbers the user has || common, uncommon, rare, special
    const userCats = userdata.cats
    const uSiamese = userCats.siamese; const uBurmese = userCats.burmese; const uRagdoll = userCats.ragdoll; const uPersian = userCats.persian; const uMaineCoon = userCats.mainecoon; const uRussianBlue = userCats.russianblue; const uCalico = userCats.calico; const uTabby = userCats.tabby
    const uAbyssinian = userCats.abyssinian; const uManx = userCats.manx; const uSphynx = userCats.sphynx; const uCyprus = userCats.cyprus; const uFoldex = userCats.foldex; const uTurkishAngora = userCats.turkishangora; const uNorwegianForest = userCats.norwegianforest; const uDevonrex = userCats.devonrex
    const uKorat = userCats.korat; const uSingapura = userCats.singapura; const uTonkinese = userCats.tonkinese; const uPeterbald = userCats.peterbald; const uChartreux = userCats.chartreux; const uMunchkin = userCats.munchkin; const uBritishShorthair = userCats.britishshorthair; const uOjosazules = userCats.ojosazules
    const uBandit = userCats.bandit; const uBug = userCats.bug; const uLinda = userCats.linda; const uMittens = userCats.mittens; const uCash = userCats.cash; const uJackson = userCats.jackson; const uCottonball = userCats.cottonball; const uSonny = userCats.sonny; const uSmokey = userCats.smokey; const uLailah = userCats.lailah; const uCher = userCats.cher; const uMarvin = userCats.marvin; const uLoki = userCats.loki; const uLoverboy = userCats.loverboy; const uKillerClaws = userCats.killerclaws
    const uSquirtlett = userCats.squirtlett; const uCursedcat = userCats.cursedcat; const uUWU = userCats.uwu; const uTom = userCats.tom; const uDemoncat = userCats.demoncat; const uBongocat = userCats.bongocat; const uGrumpycat = userCats.grumpycat
    const uGhostcat = userCats.ghostcat

    // check if user has that rank of cat and assign a var depending if they do or not
    let hasCommonCats; let hasUncommonCats; let hasRareCats; let hasSpecialCats; let hasImpossibleCats; let hasSeasonalCats
    if (uSiamese === 0 && uBurmese === 0 && uRagdoll === 0 && uPersian === 0 && uMaineCoon === 0 && uRussianBlue === 0 && uCalico === 0 && uTabby === 0) { hasCommonCats = false } else { hasCommonCats = true }
    if (uAbyssinian === 0 && uManx === 0 && uSphynx === 0 && uCyprus === 0 && uFoldex === 0 && uTurkishAngora === 0 && uNorwegianForest === 0 && uDevonrex === 0) { hasUncommonCats = false } else { hasUncommonCats = true }
    if (uKorat === 0 && uSingapura === 0 && uTonkinese === 0 && uPeterbald === 0 && uChartreux === 0 && uMunchkin === 0 && uBritishShorthair === 0 && uOjosazules === 0) { hasRareCats = false } else { hasRareCats = true }
    if (uBandit === 0 && uBug === 0 && uLinda === 0 && uMittens === 0 && uCash === 0 && uJackson === 0 && uCottonball === 0 && uSonny === 0 && uSmokey === 0 && uLailah === 0 && uCher === 0 && uMarvin === 0 && uLoki === 0 && uLoverboy === 0 && uKillerClaws === 0) { hasSpecialCats = false } else { hasSpecialCats = true }
    if (uSquirtlett === 0 && uCursedcat === 0 && uUWU === 0 && uTom === 0 && uDemoncat === 0 && uBongocat === 0 && uGrumpycat === 0) { hasImpossibleCats = false } else { hasImpossibleCats = true }
    if (uGhostcat === 0) { hasSeasonalCats = false } else { hasSeasonalCats = true }

    // If User Owns No Common Cats (no cats) Tell Them
    if (hasCommonCats === false && hasUncommonCats === false && hasRareCats === false && hasSpecialCats === false && hasImpossibleCats === false && hasSeasonalCats === false) {
      const noCatsEmbed = new Discord.RichEmbed()
        .setColor(bot.config.color.red)
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
        .setColor(bot.config.color.blue)

      //* See What Categories Of Cats The User Has Then Add Them
      if (hasCommonCats === true) {
        catsEmbed.addField(':heart: Common :heart:', `Siamese: ${uSiamese}\nBurmese: ${uBurmese}\nRagdoll: ${uRagdoll}\nPersian: ${uPersian}\nMaine Coon: ${uMaineCoon}\nRussian Blue: ${uRussianBlue}\nCalico: ${uCalico}\nTabby: ${uTabby}`, true)
      }
      if (hasUncommonCats === true) {
        catsEmbed.addField(':blue_heart: Uncommon :blue_heart:', `Abyssinian: ${uAbyssinian}\nManx: ${uManx}\nSphynx: ${uSphynx}\nCyprus: ${uCyprus}\nFoldex: ${uFoldex}\nTurkish Angora: ${uTurkishAngora}\nNorwegian Forest: ${uNorwegianForest}\nDevon Rex: ${uDevonrex}`, true)
      }
      if (hasRareCats === true) {
        catsEmbed.addField(':yellow_heart: Rare :yellow_heart:', `Korat: ${uKorat}\nSingapura: ${uSingapura}\nTonkinese: ${uTonkinese}\nPeterbald: ${uPeterbald}\nChartreux: ${uChartreux}\nMunchkin: ${uMunchkin}\nBritish Shorthair: ${uBritishShorthair}\nOjos Azules: ${uOjosazules}`, true)
      }
      if (hasSpecialCats === true) {
        catsEmbed.addField(':sparkling_heart: Special :sparkling_heart:', `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nLoverboy: ${uLoverboy}\nKiller Claws: ${uKillerClaws}`, true)
      }
      if (hasImpossibleCats === true) {
        catsEmbed.addField(':gem: Impossible :gem:', `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}\nUWU: ${uUWU}\nTom: ${uTom}\nDemon Cat: ${uDemoncat}\nBongo Cat: ${uBongocat}\nGrumpy Cat: ${uGrumpycat}`, true)
      }
      if (hasSeasonalCats === true) {
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
        if (allCatType[i] === catType) { if (hasCommonCats === false && catType === 'common') { message.channel.send(`**${message.author.username}**, you don't have any common cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (hasUncommonCats === false && catType === 'uncommon') { message.channel.send(`**${message.author.username}**, you don't have any uncommon cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (hasRareCats === false && catType === 'rare') { message.channel.send(`**${message.author.username}**, you don't have any rare cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (hasSpecialCats === false && catType === 'special') { message.channel.send(`**${message.author.username}**, you don't have any special cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (hasImpossibleCats === false && catType === 'impossible') { message.channel.send(`**${message.author.username}**, you don't have any impossible cats to look at! sad uwu`); return } }
        if (allCatType[i] === catType) { if (hasSeasonalCats === false && catType === 'seasonal') { message.channel.send(`**${message.author.username}**, you don't have any seasonal cats to look at! sad uwu`); return } }

        if (catType === allCatType[i]) {
          const catsEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username + `'s ${allCatType[i]} cat collection!`)
            .setColor(bot.config.color.blue)
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
          if (allCatType[i] === 'seasonal') {
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
