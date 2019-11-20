const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}

exports.run = async (bot, message, args) => {

  bot.database.Userdata.findOne({ userID: message.author.id }, async (err, userdata) => {
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
    if (uSiamese.amount === 0 && uBurmese.amount === 0 && uRagdoll.amount === 0 && uPersian.amount === 0 && uMaineCoon.amount === 0 && uRussianBlue.amount === 0 && uCalico.amount === 0 && uTabby.amount === 0) { hasCommonCats = false } else { hasCommonCats = true }
    if (uAbyssinian.amount === 0 && uManx.amount === 0 && uSphynx.amount === 0 && uCyprus.amount === 0 && uFoldex.amount === 0 && uTurkishAngora.amount === 0 && uNorwegianForest.amount === 0 && uDevonrex.amount === 0) { hasUncommonCats = false } else { hasUncommonCats = true }
    if (uKorat.amount === 0 && uSingapura.amount === 0 && uTonkinese.amount === 0 && uPeterbald.amount === 0 && uChartreux.amount === 0 && uMunchkin.amount === 0 && uBritishShorthair.amount === 0 && uOjosazules.amount === 0) { hasRareCats = false } else { hasRareCats = true }
    if (uBandit.amount === 0 && uBug.amount === 0 && uLinda.amount === 0 && uMittens.amount === 0 && uCash.amount === 0 && uJackson.amount === 0 && uCottonball.amount === 0 && uSonny.amount === 0 && uSmokey.amount === 0 && uLailah.amount === 0 && uCher.amount === 0 && uMarvin.amount === 0 && uLoki.amount === 0 && uLoverboy.amount === 0 && uKillerClaws.amount === 0) { hasSpecialCats = false } else { hasSpecialCats = true }
    if (uSquirtlett.amount === 0 && uCursedcat.amount === 0 && uUWU.amount === 0 && uTom.amount === 0 && uDemoncat.amount === 0 && uBongocat.amount === 0 && uGrumpycat.amount === 0) { hasImpossibleCats = false } else { hasImpossibleCats = true }
    if (uGhostcat.amount === 0) { hasSeasonalCats = false } else { hasSeasonalCats = true }

    // If User Owns No Common Cats (no cats) Tell Them
    if (hasCommonCats === false && hasUncommonCats === false && hasRareCats === false && hasSpecialCats === false && hasImpossibleCats === false && hasSeasonalCats === false) {
      const noCatsEmbed = new Discord.RichEmbed()
        .setColor(bot.config.color.red)
        .setDescription(`Sorry **${message.author.username}** you dont have any cats`)
      return message.channel.send(noCatsEmbed)
    }

    const catProcess = (catObject, catName) => {
      if (catObject.discovered === false) {
        return catName.replace(/[a-zA-Z ]/g, '?')
      } else {
        return `${bot.functions.cap(catName)}: **\`${catObject.amount}\`**`
      }
    }

    // {USAGE} cat collection full
    if (args[0] === 'full') {

      if (args[1] === 'short') {

        let numOfCommonDis = 0
        if (uSiamese.discovered === true) numOfCommonDis++
        if (uBurmese.discovered === true) numOfCommonDis++
        if (uRagdoll.discovered === true) numOfCommonDis++
        if (uPersian.discovered === true) numOfCommonDis++
        if (uMaineCoon.discovered === true) numOfCommonDis++
        if (uRussianBlue.discovered === true) numOfCommonDis++
        if (uCalico.discovered === true) numOfCommonDis++
        if (uTabby.discovered === true) numOfCommonDis++

        const totalCommonCatsDisPer = ((numOfCommonDis / 8) * 100).toFixed(0)

        const totalCommonCats = uSiamese.amount + uBurmese.amount + uRagdoll.amount + uPersian.amount + uMaineCoon.amount + uRussianBlue.amount + uCalico.amount + uTabby.amount
        let description = ''
        const catsEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username + ' cat collection!')
          .setColor(bot.config.color.blue)

        if (hasCommonCats === true) {
          description += `:green_heart: Common :green_heart:: ${totalCommonCats} total cats, ${totalCommonCatsDisPer}% discovered`
        }
        catsEmbed.setDescription(description)
        message.channel.send(catsEmbed)
      }

      if (args[1] === 'full') {
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

        // See What Categories Of Cats The User Has Then Add Them
        if (hasCommonCats === true) {
          catsEmbed.addField(':green_heart: Common :green_heart:', `${catProcess(uSiamese, 'siamese')}\n${catProcess(uBurmese, 'burmese')}\n${catProcess(uRagdoll, 'ragdoll')}\n${catProcess(uPersian, 'persian')}\n${catProcess(uMaineCoon, 'maine Coon')}\n${catProcess(uRussianBlue, 'russian Blue')}\n${catProcess(uCalico, 'calico')}\n${catProcess(uTabby, 'tabby')}`, true)
        }
        if (hasUncommonCats === true) {
          catsEmbed.addField(':blue_heart: Uncommon :blue_heart:', `${catProcess(uAbyssinian, 'abyssinian')}\n${catProcess(uManx, 'manx')}\n${catProcess(uSphynx, 'sphynx')}\n${catProcess(uCyprus, 'cyprus')}\n${catProcess(uFoldex, 'foldex')}\n${catProcess(uTurkishAngora, 'turkish Angora')}\n${catProcess(uNorwegianForest, 'norwegian Forest')}\n${catProcess(uDevonrex, 'devon Rex')}`, true)
        }
        if (hasRareCats === true) {
          catsEmbed.addField(':purple_heart: Rare :purple_heart:', `${catProcess(uKorat, 'korat')}\n${catProcess(uSingapura, 'singapura')}\n${catProcess(uTonkinese, 'tonkinese')}\n${catProcess(uPeterbald, 'peterbald')}\n${catProcess(uChartreux, 'chartreux')}\n${catProcess(uMunchkin, 'munchkin')}\n${catProcess(uBritishShorthair, 'british Shorthair')}\n${catProcess(uOjosazules, 'ojos Azules')}`, true)
        }
        if (hasSpecialCats === true) {
          catsEmbed.addField(':sparkling_heart: Special :sparkling_heart:', `${catProcess(uSmokey, 'smokey')}\n${catProcess(uBandit, 'bandit')}\n${catProcess(uBug, 'bug')}\n${catProcess(uLinda, 'linda')}\n${catProcess(uMittens, 'mittens')}\n${catProcess(uCash, 'cash')}\n${catProcess(uJackson, 'jackson')}\n${catProcess(uCottonball, 'cottonball')}\n${catProcess(uSonny, 'sonny')}\n${catProcess(uLailah, 'lailah')}\n${catProcess(uCher, 'cher')}\n${catProcess(uMarvin, 'marvin')}\n${catProcess(uLoki, 'loki')}\n${catProcess(uLoverboy, 'loverboy')}\n${catProcess(uKillerClaws, 'killer Claws')}`, true)
        }
        if (hasImpossibleCats === true) {
          catsEmbed.addField(':yellow_heart: Impossible :yellow_heart:', `${catProcess(uSquirtlett, 'squirtlett')}\n${catProcess(uCursedcat, 'cursedcat')}\n${catProcess(uUWU, 'uwu')}\n${catProcess(uTom, 'tom')}\n${catProcess(uDemoncat, 'demoncat')}\n${catProcess(uBongocat, 'bongocat')}\n${catProcess(uGrumpycat, 'grumpycat')}`, true)
        }
        if (hasSeasonalCats === true) {
          catsEmbed.addField(`${await bot.getEmoji.run(bot, 'whiteHeart')} Seasonal ${await bot.getEmoji.run(bot, 'whiteHeart')}`, `${catProcess(uGhostcat, 'ghostcat')}`)
        }

        message.channel.send(catsEmbed)

        //* Delete The Cooldown // Resetting It
        setTimeout(() => {
          delete cooldown[message.author.id]
        }, 30000)
      }
    }

    // {USAGE} cat collection {common|uncommon|rare|special|impossible|seasonal}
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
          if (allCatType[i] === 'common') {
            catsEmbed.addField(':green_heart: Common :green_heart:', `${catProcess(uSiamese, 'siamese')}\n${catProcess(uBurmese, 'burmese')}\n${catProcess(uRagdoll, 'ragdoll')}\n${catProcess(uPersian, 'persian')}\n${catProcess(uMaineCoon, 'maine Coon')}\n${catProcess(uRussianBlue, 'russian Blue')}\n${catProcess(uCalico, 'calico')}\n${catProcess(uTabby, 'tabby')}`, true)
            catsEmbed.setColor(bot.config.color.rarities.common)
          }
          if (allCatType[i] === 'uncommon') {
            catsEmbed.addField(':blue_heart: Uncommon :blue_heart:', `${catProcess(uAbyssinian, 'abyssinian')}\n${catProcess(uManx, 'manx')}\n${catProcess(uSphynx, 'sphynx')}\n${catProcess(uCyprus, 'cyprus')}\n${catProcess(uFoldex, 'foldex')}\n${catProcess(uTurkishAngora, 'turkish Angora')}\n${catProcess(uNorwegianForest, 'norwegian Forest')}\n${catProcess(uDevonrex, 'devon Rex')}`, true)
            catsEmbed.setColor(bot.config.color.rarities.uncommon)
          }
          if (allCatType[i] === 'rare') {
            catsEmbed.addField(':purple_heart: Rare :purple_heart:', `${catProcess(uKorat, 'korat')}\n${catProcess(uSingapura, 'singapura')}\n${catProcess(uTonkinese, 'tonkinese')}\n${catProcess(uPeterbald, 'peterbald')}\n${catProcess(uChartreux, 'chartreux')}\n${catProcess(uMunchkin, 'munchkin')}\n${catProcess(uBritishShorthair, 'british Shorthair')}\n${catProcess(uOjosazules, 'ojos Azules')}`, true)
            catsEmbed.setColor(bot.config.color.rarities.rare)
          }
          if (allCatType[i] === 'special') {
            catsEmbed.addField(':sparkling_heart: Special :sparkling_heart:', `${catProcess(uSmokey, 'smokey')}\n${catProcess(uBandit, 'bandit')}\n${catProcess(uBug, 'bug')}\n${catProcess(uLinda, 'linda')}\n${catProcess(uMittens, 'mittens')}\n${catProcess(uCash, 'cash')}\n${catProcess(uJackson, 'jackson')}\n${catProcess(uCottonball, 'cottonball')}\n${catProcess(uSonny, 'sonny')}\n${catProcess(uLailah, 'lailah')}\n${catProcess(uCher, 'cher')}\n${catProcess(uMarvin, 'marvin')}\n${catProcess(uLoki, 'loki')}\n${catProcess(uLoverboy, 'loverboy')}\n${catProcess(uKillerClaws, 'killer Claws')}`, true)
            catsEmbed.setColor(bot.config.color.rarities.special)
          }
          if (allCatType[i] === 'impossible') {
            catsEmbed.addField(':yellow_heart: Impossible :yellow_heart:', `${catProcess(uSquirtlett, 'squirtlett')}\n${catProcess(uCursedcat, 'cursedcat')}\n${catProcess(uUWU, 'uwu')}\n${catProcess(uTom, 'tom')}\n${catProcess(uDemoncat, 'demoncat')}\n${catProcess(uBongocat, 'bongocat')}\n${catProcess(uGrumpycat, 'grumpycat')}`, true)
            catsEmbed.setColor(bot.config.color.rarities.impossible)
          }
          if (allCatType[i] === 'seasonal') {
            catsEmbed.addField(`${await bot.getEmoji.run(bot, 'whiteHeart')} Seasonal ${await bot.getEmoji.run(bot, 'whiteHeart')}`, `${catProcess(uGhostcat, 'ghostcat')}`)
            catsEmbed.setColor(bot.config.color.rarities.seasonal)
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
  aliases: ['cattos', 'c', 'tos'],
  type: 'normal'
}