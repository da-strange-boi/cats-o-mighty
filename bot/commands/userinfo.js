const Discord = require('discord.js')
const ms = require('parse-ms')
exports.run = async (bot, message, args) => {
  // {USAGE} cat userinfo {id/name} {the data}

  if (!args[0]) {
    message.channel.send('Check `cat help userinfo` for correct usage')
    return
  }

  const user = args[0].trim()

  // Select A User Data From The Database
  bot.db.Userdata.findOne({ userID: user }, (err, userdata) => {
    if (err) bot.log('error', err)
    if (!userdata) {
      message.channel.send('not a user?')
      return
    }

    const userinfo = new Discord.RichEmbed()
      .setColor(bot.config.color.lightblue)

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
    if (commonCats === false && uncommonCats === false && rareCats === false && specialCats === false && impossibleCats === false) {
      userinfo.addField('Cats', 'This user has no cats')
    }

    // See What Categories Of Cats The User Has Then Add Them
    if (commonCats === true) {
      userinfo.addField(':heart: Common :heart:', `Siamese: ${uSiamese}\nBurmese: ${uBurmese}\nRagdoll: ${uRagdoll}\nPersian: ${uPersian}\nMaine Coon: ${uMaineCoon}\nRussian Blue: ${uRussianBlue}\nCalico: ${uCalico}\nTabby: ${uTabby}`, true)
    }
    if (uncommonCats === true) {
      userinfo.addField(':blue_heart: Uncommon :blue_heart:', `Abyssinian: ${uAbyssinian}\nManx: ${uManx}\nSphynx: ${uSphynx}\nCyprus: ${uCyprus}\nFoldex: ${uFoldex}\nTurkish Angora: ${uTurkishAngora}\nNorwegian Forest: ${uNorwegianForest}\nDevon Rex: ${uDevonrex}`, true)
    }
    if (rareCats === true) {
      userinfo.addField(':yellow_heart: Rare :yellow_heart:', `Korat: ${uKorat}\nSingapura: ${uSingapura}\nTonkinese: ${uTonkinese}\nPeterbald: ${uPeterbald}\nChartreux: ${uChartreux}\nMunchkin: ${uMunchkin}\nBritish Shorthair: ${uBritishShorthair}\nOjos Azules: ${uOjosazules}`, true)
    }
    if (specialCats === true) {
      userinfo.addField(':sparkling_heart: Special :sparkling_heart:', `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nLoverboy: ${uLoverboy}\nKiller Claws: ${uKillerClaws}`, true)
    }
    if (impossibleCats === true) {
      userinfo.addField(':gem: Impossible :gem:', `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}\nUWU: ${uUWU}\nTom: ${uTom}\nDemon Cat: ${uDemoncat}\nBongo Cat: ${uBongocat}\nGrumpy Cat: ${uGrumpycat}`, true)
    }
    if (seasonalCats === true) {
      userinfo.addField(':ghost: Seasonal :ghost:', `Ghost Cat: ${uGhostcat}`)
    }

    userinfo.setTitle(`User Data - ${userdata.userTag} (${userdata.userID})`)
    const uMoney = userdata.money.catmoney
    function formatMoney (amount, decimalCount = 0, decimal = '.', thousands = ',') { try { decimalCount = Math.abs(decimalCount); decimalCount = isNaN(decimalCount) ? 2 : decimalCount; const negativeSign = amount < 0 ? '-' : ''; const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString(); const j = (i.length > 3) ? i.length % 3 : 0; return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '') } catch (e) { console.log(e) } };
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
  aliases: [],
  type: 'moderator'
}
