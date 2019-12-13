const { RichEmbed } = require('discord.js')
const DBL = require('dblapi.js')

exports.run = async (bot) => {
  const dbl = new DBL(process.env.DISCORD_BOTS_AUTH, { webhookPort: 5454, webhookAuth: process.env.DISCORD_BOTS_WSAUTH, statsInterval: 2400000 }, bot)

  // Ready Up The Webhook
  dbl.webhook.on('ready', hook => {
    bot.log('system', `Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`)
  })

  // Post The Stats Of The Bot
  dbl.webhook.on('posted', () => {})

  dbl.webhook.on('error', e => {
    console.log(`Oops! ${e}`)
  })

  // Whenever Someone Votes
  dbl.webhook.on('vote', vote => {
    const votedUser = vote.user
    const userCol = bot.database.Userdata
    const parse = bot.functions.parseRarityForDB

    userCol.findOne({ userID: votedUser }, (err, userdata) => {
      if (err) bot.log('error', `topp.org API Error: ${err}`)

      if (!userdata) return

      // To reset their vote counter
      userCol.findOneAndUpdate({ userID: votedUser }, {$set: {'times.voteTime': Date.now()}})

      const specialCats = Object.keys(bot.catData.d_special)
      const result = specialCats[Math.floor(Math.random() * specialCats.length)]

      // Check To See What Cat Is Randomly Slected Then Add It To Their Cats
      userCol.findOneAndUpdate({ userID: votedUser }, {$inc: {[`cats.${parse('special')}.${result}.amount`]: 1}})

      if (userdata.cats[parse('special')][result].discovered === false) {
        userCol.findOneAndUpdate({ userID: votedUser }, {$set: {[`cats.${parse('special')}.${result}.discovered`]: true}})
      }

      // To send a DM to the user letting them know their rewards for voting
      const votedEmbed = new RichEmbed()
        .setColor(bot.config.color.blue)
      if (vote.isWeekend === true) {
        // If It's The Weekend Add $5,000 To Their Account
        userCol.findOneAndUpdate({ userID: votedUser }, {$set: {'money.catmoney': userdata.money.catmoney + 5000}})

        votedEmbed.setAuthor('Thanks for upvoting Cats o\' Mighty • Weekend Rewards', bot.user.avatarURL)
        votedEmbed.setDescription(`**For upvoting Cats o' Mighty you get:**\n\n:cat2: ${result}\n:moneybag: $5,000\n\n:alarm_clock: **In 12 hours you can vote again to get more rewards!**`)
      } else {
        votedEmbed.setAuthor('Thanks for upvoting Cats o\' Mighty', bot.user.avatarURL)
        votedEmbed.setDescription(`**For upvoting Cats o' Mighty you get:**\n\n:cat2: ${result}\n\n:alarm_clock: **In 12 hours you can vote again to get more rewards!**`)
      }
      bot.users.get(votedUser).send(votedEmbed)

    })
  })
}
