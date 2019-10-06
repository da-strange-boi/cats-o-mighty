const Discord = require('discord.js')

exports.run = async (bot, message) => {
  if (!message.guild || message.IsPrivate || message.author.bot) return

  let prefix = bot.config.prefix
  if (message.content.startsWith(`<@${bot.user.id}>`)) {
    prefix = `<@${bot.user.id}>`
  }
  if (message.content.trim().toLowerCase().startsWith(prefix)) return

  // The Random Way To Get Cats
  // common: 30 || uncommon: 70 || rare: 150 || special: 350
  // common: 20 || uncommon: 50 || rare: 130 || special: 270 - updated: 5/17/19
  // common: 25 || uncommon: 60 || rare: 145 || special: 290 || impossible: 550 - updated: 5/24/19
  // common: 25 || uncommon: 80 || rare: 145 || special: 370 || impossible: 740 - updated: 6/7/19

  const commonCatAmt = Math.floor(Math.random() * 25) + 1
  const commonBaseAmt = Math.floor(Math.random() * 25) + 1

  const uncommonCatAmt = Math.floor(Math.random() * 80) + 1
  const uncommonBaseAmt = Math.floor(Math.random() * 80) + 1

  const rareCatAmt = Math.floor(Math.random() * 145) + 1
  const rareBaseAmt = Math.floor(Math.random() * 145) + 1

  const specialCatAmt = Math.floor(Math.random() * 370) + 1
  const specialBaseAmt = Math.floor(Math.random() * 370) + 1

  const impossibleCatsAmt = Math.floor(Math.random() * 740) + 1
  const impossibleBaseAmt = Math.floor(Math.random() * 740) + 1

  const seasonalCatAmt = Math.floor(Math.random() * 850) + 1
  const seasonalBaseAmt = Math.floor(Math.random() * 850) + 1

  bot.db.Userdata.findOne({ userID: message.author.id },
    async (err, userdata) => {
      if (err) bot.log('databaseError', err)
      if (userdata) {
        if (userdata.disable) return
        bot.db.Totals.findOne({}, async (err, totalList) => {
          if (err) bot.log('databaseError', err)
          if (!totalList) {
            const total = new bot.db.Totals({
              cats: {
                siamese: 0,
                burmese: 0,
                ragdoll: 0,
                persian: 0,
                mainecoon: 0,
                russianblue: 0,
                calico: 0,
                tabby: 0,
                abyssinian: 0,
                manx: 0,
                sphynx: 0,
                cyprus: 0,
                foldex: 0,
                turkishangora: 0,
                norwegianforest: 0,
                devonrex: 0,
                korat: 0,
                singapura: 0,
                tonkinese: 0,
                peterbald: 0,
                chartreux: 0,
                munchkin: 0,
                britishshorthair: 0,
                ojosazules: 0,
                bandit: 0,
                bug: 0,
                linda: 0,
                mittens: 0,
                cash: 0,
                jackson: 0,
                cottonball: 0,
                sonny: 0,
                smokey: 0,
                lailah: 0,
                cher: 0,
                marvin: 0,
                loki: 0,
                loverboy: 0,
                killerclaws: 0,
                squirtlett: 0,
                cursedcat: 0,
                uwu: 0,
                tom: 0,
                demoncat: 0,
                bongocat: 0,
                grumpycat: 0,
                ghostcat: 0
              }
            })
            total.save().catch(err => console.log(err))
          }
          if (totalList) {
            bot.db.Guildsettings.findOne({ guildID: message.guild.id },
              async (err, guildSettings) => {
                if (err) bot.log('databaseError', err)
                if (!guildSettings) {
                  bot.log('database', 'guildSettings error')
                }
                if (guildSettings) {
                  const showCatEmbed = catName => {
                    const embed = new Discord.RichEmbed()
                      .setAuthor(message.author.username, message.author.avatarURL)
                      .setColor(bot.config.color.blue)
                      .setDescription(`You got a ${catName}! uwu`)
                    if (guildSettings.CatGottenPopupMessage === 'show') {
                      message.channel.send(embed)
                    } else if (guildSettings.CatGottenPopupMessage === 'disappear' || guildSettings.CatGottenPopupMessage === true) {
                      message.channel.send(embed).then(msg => msg.delete(6000))
                    }
                  }

                  if (commonCatAmt === commonBaseAmt) {
                    // Set Vars For Common Cats
                    const animals = [
                      'siamese',
                      'burmese',
                      'ragdoll',
                      'persian',
                      'mainecoon',
                      'russianblue',
                      'calico',
                      'tabby'
                    ]
                    const result = Math.floor(Math.random() * animals.length)

                    // Add Cat To Their Collection
                    userdata.cats[animals[result]] += 1
                    totalList.cats[animals[result]] += 1

                    showCatEmbed(animals[result])
                  }
                  if (uncommonCatAmt === uncommonBaseAmt) {
                    // If User Has No Common Cats Don't Give Them Uncommon
                    let commonCats
                    if (
                      userdata.cats.siamese === 0 &&
                      userdata.cats.burmese === 0 &&
                      userdata.cats.ragdoll === 0 &&
                      userdata.cats.persian === 0 &&
                      userdata.cats.mainecoon === 0 &&
                      userdata.cats.russianblue === 0 &&
                      userdata.cats.calico === 0 &&
                      userdata.cats.tabby === 0
                    ) {
                      commonCats = false
                    } else {
                      commonCats = true
                    }

                    if (commonCats === false) {
                      return
                    }

                    const animals = [
                      'abyssinian',
                      'manx',
                      'sphynx',
                      'cyprus',
                      'foldex',
                      'turkishangora',
                      'norwegianforest',
                      'devonrex'
                    ]
                    const result = Math.floor(Math.random() * animals.length)

                    userdata.cats[animals[result]] += 1
                    totalList.cats[animals[result]] += 1

                    showCatEmbed(animals[result])
                  }
                  if (rareCatAmt === rareBaseAmt) {
                    // If User Has No Uncommon Cats Don't Give Them Rare
                    let uncommonCats
                    if (
                      userdata.cats.abyssinian === 0 &&
                      userdata.cats.manx === 0 &&
                      userdata.cats.sphynx === 0 &&
                      userdata.cats.cyprus === 0 &&
                      userdata.cats.foldex === 0 &&
                      userdata.cats.turkishangora === 0 &&
                      userdata.cats.norwegianforest === 0 &&
                      userdata.cats.devonrex === 0
                    ) {
                      uncommonCats = false
                    } else {
                      uncommonCats = true
                    }

                    if (uncommonCats === false) {
                      return
                    }

                    const animals = [
                      'korat',
                      'singapura',
                      'tonkinese',
                      'peterbald',
                      'chartreux',
                      'munchkin',
                      'britishshorthair',
                      'ojosazules'
                    ]
                    const result = Math.floor(Math.random() * animals.length)

                    userdata.cats[animals[result]] += 1
                    totalList.cats[animals[result]] += 1

                    showCatEmbed(animals[result])
                  }
                  if (specialCatAmt === specialBaseAmt) {
                    // No Need To Check If They Have Lower Rank || You Can Get Special No Matter What Cats You Have

                    const animals = [
                      'bandit',
                      'bug',
                      'linda',
                      'mittens',
                      'cash',
                      'jackson',
                      'cottonball',
                      'sonny',
                      'smokey',
                      'lailah',
                      'cher',
                      'marvin',
                      'loki',
                      'loverboy',
                      'killerclaws'
                    ]
                    const result = Math.floor(Math.random() * animals.length)

                    userdata.cats[animals[result]] += 1
                    totalList.cats[animals[result]] += 1

                    showCatEmbed(animals[result])
                  }
                  if (impossibleCatsAmt === impossibleBaseAmt) {
                    // Set Vars For Impossible Cats
                    const animals = [
                      'squirtlett',
                      'cursedcat',
                      'uwu',
                      'tom',
                      'demoncat',
                      'bongocat',
                      'grumpycat'
                    ]
                    const result = Math.floor(Math.random() * animals.length)

                    userdata.cats[animals[result]] += 1
                    totalList.cats[animals[result]] += 1

                    showCatEmbed(animals[result])
                  }
                  if (seasonalCatAmt === seasonalBaseAmt) {
                    const date = new Date()

                    // Checking the date to see if its the week of halloween
                    const dateFrom = '10/27/2019'.split('/')
                    const dateTo = '11/2/2019'.split('/')
                    const dateCheck = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`.split('/')

                    const from = new Date(dateFrom[2], parseInt(dateFrom[1]) - 1, dateFrom[0])
                    const to = new Date(dateTo[2], parseInt(dateTo[1]) - 1, dateTo[0])
                    const check = new Date(dateCheck[2], parseInt(dateCheck[1]) - 1, dateCheck[0])

                    const isWeekOfHalloween = check > from && check < to

                    if (isWeekOfHalloween) {
                      const animals = ['ghostcat']
                      const result = Math.floor(Math.random() * animals.length)

                      userdata.cats[animals[result]] += 1
                      totalList.cats[animals[result]] += 1
                      showCatEmbed(animals[result])
                    }
                  }
                }
                totalList.save().catch(err => console.log(err))
                userdata.save().catch(err => console.log(err))
              }
            )
          }
        })
      }
    }
  )
}
