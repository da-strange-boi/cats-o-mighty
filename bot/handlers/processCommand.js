/* Information
  This is a big mess and probably shouldn't messed with unless you
  fully understand what this does lol
*/
const Discord = require('discord.js')
exports.run = async (bot, message, cmd, args, prefix) => {

  const userCol = bot.database.Userdata
  const guildCol = bot.database.Guildsettings

  if (Object.prototype.hasOwnProperty.call(cmd, 'help')) {
    if (!message.content.trim().toLowerCase().startsWith(prefix)) return
    if (cmd.help.name === 'start') {
    
      // If The User Is A New Cat Collector And Runs 'cat start'
      userCol.findOne({ userID: message.author.id }, async (err, userdata) => {
        if (err) bot.log('error', `processCommand userdata failed: ${err}`)
        guildCol.findOne({ guildID: message.guild.id }, async (err, settings) => {
          if (err) bot.log('error', `processCommand guildsettings failed: ${err}`)

          if (userdata) {
            // make sure the prefix is being used when typing 'cat start'
            if (!message.content.trim().toLowerCase().startsWith(prefix)) return
            return message.channel.send(`<@${message.author.id}> no need, you're already a cat collector!`)
          }

          if (!userdata) {
            const date = Date.now()
            userCol.insertOne({
              userID: message.author.id,
              userTag: message.author.tag,
              cats: {
                siamese: {amount: 0, totalGot: 0, discovered: false},
                burmese: {amount: 0, totalGot: 0, discovered: false},
                ragdoll: {amount: 0, totalGot: 0, discovered: false},
                persian: {amount: 0, totalGot: 0, discovered: false},
                mainecoon: {amount: 0, totalGot: 0, discovered: false},
                russianblue: {amount: 0, totalGot: 0, discovered: false},
                calico: {amount: 0, totalGot: 0, discovered: false},
                tabby: {amount: 0, totalGot: 0, discovered: false},
                abyssinian: {amount: 0, totalGot: 0, discovered: false},
                manx: {amount: 0, totalGot: 0, discovered: false},
                sphynx: {amount: 0, totalGot: 0, discovered: false},
                cyprus: {amount: 0, totalGot: 0, discovered: false},
                foldex: {amount: 0, totalGot: 0, discovered: false},
                turkishangora: {amount: 0, totalGot: 0, discovered: false},
                norwegianforest: {amount: 0, totalGot: 0, discovered: false},
                devonrex: {amount: 0, totalGot: 0, discovered: false},
                korat: {amount: 0, totalGot: 0, discovered: false},
                singapura: {amount: 0, totalGot: 0, discovered: false},
                tonkinese: {amount: 0, totalGot: 0, discovered: false},
                peterbald: {amount: 0, totalGot: 0, discovered: false},
                chartreux: {amount: 0, totalGot: 0, discovered: false},
                munchkin: {amount: 0, totalGot: 0, discovered: false},
                britishshorthair: {amount: 0, totalGot: 0, discovered: false},
                ojosazules: {amount: 0, totalGot: 0, discovered: false},
                bandit: {amount: 0, totalGot: 0, discovered: false},
                bug: {amount: 0, totalGot: 0, discovered: false},
                linda: {amount: 0, totalGot: 0, discovered: false},
                mittens: {amount: 0, totalGot: 0, discovered: false},
                cash: {amount: 0, totalGot: 0, discovered: false},
                jackson: {amount: 0, totalGot: 0, discovered: false},
                cottonball: {amount: 0, totalGot: 0, discovered: false},
                sonny: {amount: 0, totalGot: 0, discovered: false},
                smokey: {amount: 0, totalGot: 0, discovered: false},
                lailah: {amount: 0, totalGot: 0, discovered: false},
                cher: {amount: 0, totalGot: 0, discovered: false},
                marvin: {amount: 0, totalGot: 0, discovered: false},
                loki: {amount: 0, totalGot: 0, discovered: false},
                loverboy: {amount: 0, totalGot: 0, discovered: false},
                killerclaws: {amount: 0, totalGot: 0, discovered: false},
                squirtlett: {amount: 0, totalGot: 0, discovered: false},
                cursedcat: {amount: 0, totalGot: 0, discovered: false},
                uwu: {amount: 0, totalGot: 0, discovered: false},
                tom: {amount: 0, totalGot: 0, discovered: false},
                demoncat: {amount: 0, totalGot: 0, discovered: false},
                bongocat: {amount: 0, totalGot: 0, discovered: false},
                grumpycat: {amount: 0, totalGot: 0, discovered: false},
                ghostcat: {amount: 0, totalGot: 0, discovered: false}
              },
              money: { catmoney: 0 },
              times: { dailyTime: 0, voteTime: 0, usedBotLast: date },
              stats: { catsSold: 0, saidCat: 1, dailyStreak: 0 }
            })

            if (!settings) {
              guildCol.insertOne({
                guildID: message.guild.id,
                CatGottenPopupMessage: 'disappar'
              }).catch(err => bot.log('error', `processCommand guildsettings saving failed: ${err}`))
            }

            const newUserEmbed = new Discord.RichEmbed()
              .setAuthor(message.author.username, message.author.avatarURL)
              .setColor(bot.config.color.darkblue)
              .setDescription('Welcome new cat collector!\nto get started do `cat help` to get the list of commands')
            return message.channel.send(newUserEmbed)

          }
        })
      })
    }
  }

  // If The User Is A New User, Types 'cat {anything}' Send Them A Message Telling Them To Do 'cat start'
  userCol.findOne({ userID: message.author.id }, (err, userdata) => {
    if (err) bot.log('error', `processCommand userdata failed: ${err}`)

    if (!userdata) {
      if (Object.prototype.hasOwnProperty.call(cmd, 'help')) {
        if (cmd.help.name !== 'start') {
          if (!message.content.trim().toLowerCase().startsWith(prefix)) return
          const newPersonEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.darkblue)
            .setDescription('hmm it looks like you\'re a new cat collector!!\nDo `cat start` to start collecting cats')
          return message.channel.send(newPersonEmbed)
        }
      }
    }

    if (userdata) {
      // Don't Show 'level messages' In (DBL && DBGG && BFD (discord bot list servers) ) As It Is Agaest The Rules
      if (
        message.guild.id !== '264445053596991498' &&
        message.guild.id !== '110373943822540800' &&
        message.guild.id !== '374071874222686211'
      ) {
        const checkCats = require('../lib/checkCats')
        const getCats = require('./getCats')
        // checkCats.run(bot, message)
        getCats.run(bot, message)
      }

      // Logging stuff
      userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'stats.saidCat': userdata.stats.saidCat + 1}})

    }
  })
}
