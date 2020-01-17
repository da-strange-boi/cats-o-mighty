/*
    NOT UPDATED TO CURRENT DB TEMPLATE
*/

const Discord = require('discord.js')
const ms = require('parse-ms')
exports.run = async (bot, message, args) => {
  // {USAGE} cat userinfo {id/name} {the data}

  if (!args[0]) return message.channel.send('Check `cat help userinfo` for correct usage')

  const user = args[0].trim()

  // Select A User Data From The Database
  bot.database.Userdata.findOne({ userID: user }, (err, userdata) => {
    if (err) bot.log('error', err)
    if (!userdata) return message.channel.send('not a user?')

    const userinfo = new Discord.RichEmbed()
      .setColor(bot.config.color.lightblue)

    // set vars of cat numbers the user has || common, uncommon, rare, special
    const userCats = userdata.cats
    const uSiamese = userCats.siamese.amount; const uBurmese = userCats.burmese.amount; const uRagdoll = userCats.ragdoll.amount; const uPersian = userCats.persian.amount; const uMaineCoon = userCats.mainecoon.amount; const uRussianBlue = userCats.russianblue.amount; const uCalico = userCats.calico.amount; const uTabby = userCats.tabby.amount
    const uAbyssinian = userCats.abyssinian.amount; const uManx = userCats.manx.amount; const uSphynx = userCats.sphynx.amount; const uCyprus = userCats.cyprus.amount; const uFoldex = userCats.foldex.amount; const uTurkishAngora = userCats.turkishangora.amount; const uNorwegianForest = userCats.norwegianforest.amount; const uDevonrex = userCats.devonrex.amount
    const uKorat = userCats.korat.amount; const uSingapura = userCats.singapura.amount; const uTonkinese = userCats.tonkinese.amount; const uPeterbald = userCats.peterbald.amount; const uChartreux = userCats.chartreux.amount; const uMunchkin = userCats.munchkin.amount; const uBritishShorthair = userCats.britishshorthair.amount; const uOjosazules = userCats.ojosazules.amount
    const uBandit = userCats.bandit.amount; const uBug = userCats.bug.amount; const uLinda = userCats.linda.amount; const uMittens = userCats.mittens.amount; const uCash = userCats.cash.amount; const uJackson = userCats.jackson.amount; const uCottonball = userCats.cottonball.amount; const uSonny = userCats.sonny.amount; const uSmokey = userCats.smokey.amount; const uLailah = userCats.lailah.amount; const uCher = userCats.cher.amount; const uMarvin = userCats.marvin.amount; const uLoki = userCats.loki.amount; const uLoverboy = userCats.loverboy.amount; const uKillerClaws = userCats.killerclaws.amount
    const uSquirtlett = userCats.squirtlett.amount; const uCursedcat = userCats.cursedcat.amount; const uUWU = userCats.uwu.amount; const uTom = userCats.tom.amount; const uDemoncat = userCats.demoncat.amount; const uBongocat = userCats.bongocat.amount; const uGrumpycat = userCats.grumpycat.amount
    const uGhostcat = userCats.ghostcat.amount

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
      userinfo.addField('Cats', 'This user has no cats')
    }

    // See What Categories Of Cats The User Has Then Add Them
    if (hasCommonCats === true) {
      userinfo.addField(':heart: Common :heart:', `Siamese: ${uSiamese}\nBurmese: ${uBurmese}\nRagdoll: ${uRagdoll}\nPersian: ${uPersian}\nMaine Coon: ${uMaineCoon}\nRussian Blue: ${uRussianBlue}\nCalico: ${uCalico}\nTabby: ${uTabby}`, true)
    }
    if (hasUncommonCats === true) {
      userinfo.addField(':blue_heart: Uncommon :blue_heart:', `Abyssinian: ${uAbyssinian}\nManx: ${uManx}\nSphynx: ${uSphynx}\nCyprus: ${uCyprus}\nFoldex: ${uFoldex}\nTurkish Angora: ${uTurkishAngora}\nNorwegian Forest: ${uNorwegianForest}\nDevon Rex: ${uDevonrex}`, true)
    }
    if (hasRareCats === true) {
      userinfo.addField(':yellow_heart: Rare :yellow_heart:', `Korat: ${uKorat}\nSingapura: ${uSingapura}\nTonkinese: ${uTonkinese}\nPeterbald: ${uPeterbald}\nChartreux: ${uChartreux}\nMunchkin: ${uMunchkin}\nBritish Shorthair: ${uBritishShorthair}\nOjos Azules: ${uOjosazules}`, true)
    }
    if (hasSpecialCats === true) {
      userinfo.addField(':sparkling_heart: Special :sparkling_heart:', `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nLoverboy: ${uLoverboy}\nKiller Claws: ${uKillerClaws}`, true)
    }
    if (hasImpossibleCats === true) {
      userinfo.addField(':gem: Impossible :gem:', `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}\nUWU: ${uUWU}\nTom: ${uTom}\nDemon Cat: ${uDemoncat}\nBongo Cat: ${uBongocat}\nGrumpy Cat: ${uGrumpycat}`, true)
    }
    if (hasSeasonalCats === true) {
      userinfo.addField(':ghost: Seasonal :ghost:', `Ghost Cat: ${uGhostcat}`)
    }

    userinfo.setTitle(`User Data - ${userdata.userTag} (${userdata.userID})`)
    const uMoney = userdata.money.catmoney
    function formatMoney (amount, decimalCount = 0, decimal = '.', thousands = ',') { try { decimalCount = Math.abs(decimalCount); decimalCount = isNaN(decimalCount) ? 2 : decimalCount; const negativeSign = amount < 0 ? '-' : ''; const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString(); const j = (i.length > 3) ? i.length % 3 : 0; return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '') } catch (e) { console.log(e) } }
    userinfo.addField('User Money', `**$${formatMoney(uMoney)}**`)

    const uDailyStreak = userdata.stats.dailyStreak
    const uDailyTime = userdata.times.dailyTime
    const uDTime = ms(Date.now() - uDailyTime)
    if (uDailyTime === 0) {
      userinfo.addField('User Daily', `Daily Streak: ${uDailyStreak}\nLast Daily: none`)
    } else {
      userinfo.addField('User Daily', `Daily Streak: ${uDailyStreak}\nLast Daily: **${uDTime.days}d ${uDTime.hours}h ${uDTime.minutes}m ${uDTime.seconds}s**`)
    }

    userinfo.addField('Etc Info', `cats sold: ${userdata.stats.catsSold}\nused bot: ${userdata.stats.saidCat}`)

    message.channel.send(userinfo)
  })
}

exports.help = {
  name: 'userinfo',
  aliases: ['userdata'],
  type: 'moderator'
}
