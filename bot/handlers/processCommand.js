/* Information
  This is a big mess and probably shouldn't messed with unless you
  fully understand what this does lol
*/
const Discord = require('discord.js')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
exports.run = async (bot, message, cmd, args, prefix) => {

  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    const db = client.db('cats-o-mighty');
    const userCol = db.collection('userdatas');
    const guildCol = db.collection('guildsettings');

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
              .setDescription("hmm it looks like you're a new cat collector!!\nDo `cat start` to start collecting cats")
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
          checkCats.run(bot, message)
          getCats.run(bot, message)
        }

        // Logging stuff
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'stats.saidCat': userdata.stats.saidCat + 1}})

      }
    })
  })
}
