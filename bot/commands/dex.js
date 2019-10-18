const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}
let ifcat = 0
exports.run = async (bot, message, args) => {
  // {USAGE} cat dex|catinfo {cat name}

  // If User Doesn't Specifiy What Cat To Look At
  if (!args[0]) return message.channel.send(`**${message.author.username}**, you need to specify which cat to look at`)

  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  // If User Does Specifiy The Cat Type
  if (args[0]) {
    const catInfo = args[0].toLowerCase().trim()

    bot.database.Totals.findOne({}, (err, totalList) => {
      if (err) bot.log('error', err)
      if (totalList) {
        const totalCats = totalList.cats
        const tSiamese = totalCats.siamese; const tBurmese = totalCats.burmese; const tRagdoll = totalCats.ragdoll; const tPersian = totalCats.persian; const tMaineCoon = totalCats.mainecoon; const tRussianBlue = totalCats.russianblue; const tCalico = totalCats.calico; const tTabby = totalCats.tabby
        const tAbyssinian = totalCats.abyssinian; const tManx = totalCats.manx; const tSphynx = totalCats.sphynx; const tCyprus = totalCats.cyprus; const tFoldex = totalCats.foldex; const tTurkishAngora = totalCats.turkishangora; const tNorwegianForest = totalCats.norwegianforest; const tDevonrex = totalCats.devonrex
        const tKorat = totalCats.korat; const tSingapura = totalCats.singapura; const tTonkinese = totalCats.tonkinese; const tPeterbald = totalCats.peterbald; const tChartreux = totalCats.chartreux; const tMunchkin = totalCats.munchkin; const tBritishShorthair = totalCats.britishshorthair; const tOjosazules = totalCats.ojosazules
        const tBandit = totalCats.bandit; const tBug = totalCats.bug; const tLinda = totalCats.linda; const tMittens = totalCats.mittens; const tCash = totalCats.cash; const tJackson = totalCats.jackson; const tCottonball = totalCats.cottonball; const tSonny = totalCats.sonny; const tSmokey = totalCats.smokey; const tLailah = totalCats.lailah; const tCher = totalCats.cher; const tMarvin = totalCats.marvin; const tLoki = totalCats.loki; const tLoverboy = totalCats.loverboy; const tKillerClaws = totalCats.killerclaws
        const tSquirtlett = totalCats.squirtlett; const tCursedcat = totalCats.cursedcat; const tUWU = totalCats.uwu; const tTom = totalCats.tom; const tDemoncat = totalCats.demoncat; const tBongocat = totalCats.bongocat; const tGrumpycat = totalCats.grumpycat
        const tGhostcat = totalCats.ghostcat

        // Function To Make The First Letter Of A Word Capitalized
        const cap = (string) => {
          return string.charAt(0).toUpperCase() + string.slice(1)
        }

        // Function To Display The Dex For The Cat
        /**
         * Display the embed of the cat
         * @param {string} catName Name of the cat
         * @param {string} sellAmount The amount the cat sell for
         * @param {number} totalCat The number of how many times someone has got this cat
         * @param {string} url The URL to the image of the cat
         * @param {string} sidenote Any other data you wanna include to say
         */
        const displayCatDex = (catName, sellAmount, totalCat, url, sidenote) => {
          if (catInfo === `${catName}`) {
            const dexHelp = new Discord.RichEmbed()
              .setTitle(`${cap(catName)}`)
              .setColor(bot.config.color.tanish)
              .setImage(`${url}`)
            if (sidenote) {
              dexHelp.setDescription(`**Total Got**: ${totalCat} \n**Sell Amount**: ${sellAmount} \n\n ${sidenote} \n`)
            } else { dexHelp.setDescription(`**Total Got**: ${totalCat} \n**Sell Amount**: ${sellAmount}`) }
            message.channel.send(dexHelp)
            ifcat++
          }
        }

        // Possibly Find A Better Way To Do This

        // ------common------

        displayCatDex('siamese', '25', tSiamese, 'https://i.imgur.com/Q72dhHH.jpg')
        displayCatDex('burmese', '25', tBurmese, 'https://i.imgur.com/i2wLXer.jpg')
        displayCatDex('ragdoll', '25', tRagdoll, 'https://i.imgur.com/BHI2A5B.jpg')
        displayCatDex('persian', '25', tPersian, 'https://i.imgur.com/7zk7qMR.jpg')
        displayCatDex('mainecoon', '25', tMaineCoon, 'https://i.imgur.com/BdqURwX.png')
        displayCatDex('russianblue', '25', tRussianBlue, 'https://i.imgur.com/XWmYcSC.jpg', '*cat suggested by, __jana__*')
        displayCatDex('calico', '25', tCalico, 'https://i.imgur.com/yD6sXrt.jpg', '*cat suggested by, __n u g g e t__ and __Chad__*')
        displayCatDex('tabby', '25', tTabby, 'https://i.imgur.com/frXE4oN.jpg', '*cat suggested by, __Chad__*')

        // ------uncommon------

        displayCatDex('abyssinian', '55', tAbyssinian, 'https://i.imgur.com/DaVPTXH.jpg')
        displayCatDex('manx', '55', tManx, 'https://i.imgur.com/uDgcTTJ.jpg')
        displayCatDex('sphynx', '55', tSphynx, 'https://i.imgur.com/XuwNWBE.jpg')
        displayCatDex('cyprus', '55', tCyprus, 'https://i.imgur.com/McEdtMS.jpg')
        displayCatDex('foldex', '55', tFoldex, 'https://i.imgur.com/AQl6z6t.jpg')
        displayCatDex('turkishangora', '55', tTurkishAngora, 'https://i.imgur.com/LkkPAJh.jpg', '*cat suggested by, __๑DelusionalHermit๑__*')
        displayCatDex('norwegianforest', '55', tNorwegianForest, 'https://i.imgur.com/s54Hq6D.jpg', '*cat suggested by, __mxrningstar__ and __Cactus Cat__*')
        displayCatDex('devonrex', '55', tDevonrex, 'https://i.imgur.com/Dg20uZJ.jpg')

        // ------rare------

        displayCatDex('korat', '200', tKorat, 'https://i.imgur.com/yoGvgow.jpg')
        displayCatDex('singapura', '200', tSingapura, 'https://i.imgur.com/1wjvREo.jpg')
        displayCatDex('tonkinese', '200', tTonkinese, 'https://i.imgur.com/BVVQ89V.jpg')
        displayCatDex('peterbald', '200', tPeterbald, 'https://i.imgur.com/OSlqoj7.jpg')
        displayCatDex('chartreux', '200', tChartreux, 'https://i.imgur.com/dBRF5iR.jpg')
        displayCatDex('munchkin', '200', tMunchkin, 'https://i.imgur.com/iUIOKGR.jpg', '*cat suggested by, __[C] [R] [K] [N] [I]__*')
        displayCatDex('britishshorthair', '200', tBritishShorthair, 'https://i.imgur.com/u8zG7fG.jpg', '*cat suggested by, __TheRealNicole__*')
        displayCatDex('ojosazules', '200', tOjosazules, 'https://i.imgur.com/vzYywnk.jpg')

        // ------special------

        displayCatDex('bandit', '2,500', tBandit, 'https://i.imgur.com/yxIaIqe.jpg')
        displayCatDex('bug', '2,500', tBug, 'https://i.imgur.com/umoPzou.jpg')
        displayCatDex('linda', '2,500', tLinda, 'https://i.imgur.com/uieRlR9.jpg')
        displayCatDex('mittens', '2,500', tMittens, 'https://i.imgur.com/vPyIsRd.jpg')
        displayCatDex('cash', '2,500', tCash, 'https://i.imgur.com/21odRlh.jpg')
        displayCatDex('jackson', '2,500', tJackson, 'https://i.imgur.com/NdE2s2E.jpg')
        displayCatDex('cottonball', '2,500', tCottonball, 'https://i.imgur.com/ceqsPX4.jpg')
        displayCatDex('sonny', '2,500', tSonny, 'https://i.imgur.com/r7Fb0xU.jpg')
        displayCatDex('smokey', '2,500', tSmokey, 'https://i.imgur.com/Z2vz3un.jpg')
        displayCatDex('lailah', '2,500', tLailah, 'https://i.imgur.com/XEBy623.jpg')
        displayCatDex('cher', '2,500', tCher, 'https://i.imgur.com/I06Qynx.jpg')
        displayCatDex('marvin', '2,500', tMarvin, 'https://i.imgur.com/AO3QmAU.jpg')
        displayCatDex('loki', '2,500', tLoki, 'https://i.imgur.com/PBV6Ijq.jpg')
        displayCatDex('loverboy', '2,500', tLoverboy, 'https://i.imgur.com/SJ40Y1E.jpg')
        displayCatDex('killerclaws', '2,500', tKillerClaws, 'https://i.imgur.com/eRO5bK5.jpg')

        // ------impossible------

        displayCatDex('squirtlett', '10,000', tSquirtlett, 'https://i.imgur.com/6RcJXap.png', '*\'cat\' suggested by utiyi#3353*')
        displayCatDex('cursedcat', '10,000', tCursedcat, 'https://i.imgur.com/yIFIyJq.jpg', '*\'cat\' suggested by, Hispanic Ｓｔｉｎｋｙ Bean#5474*')
        displayCatDex('uwu', '10,000', tUWU, 'https://i.imgur.com/WJ87FfU.jpg')
        displayCatDex('tom', '10,000', tTom, 'https://i.imgur.com/Nj05cMm.png', '*cat suggested by, __˙ssǝlǝs∩__*')
        displayCatDex('demoncat', '10,000', tDemoncat, 'https://i.imgur.com/Li7UCFf.png')
        displayCatDex('bongocat', '10,000', tBongocat, 'https://i.imgur.com/DZPzDEo.gif')
        displayCatDex('grumpycat', '10,000', tGrumpycat, 'https://i.imgur.com/sGIlYdc.jpg', 'R.I.P Tardar Sauce')

        // ------seasonal------

        displayCatDex('ghostcat', "Can't sell", tGhostcat, 'https://i.imgur.com/qlbLgWj.jpg', '*Halloween of 2019*')

        if (ifcat === 0) { message.channel.send('check `cat help dex` for how to use the command') };
      }
    })
  }
  // Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 3500)
}

exports.help = {
  name: 'dex',
  aliases: ['catinfo', 'catdex'],
  type: 'normal'
}
