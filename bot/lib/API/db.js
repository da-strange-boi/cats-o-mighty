const Discord = require('discord.js')
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

    userCol.findOne({ userID: votedUser }, (err, userdata) => {
      if (err) bot.log('error', `Discordbots.org API Error: ${err}`)

      if (!userdata) return

      // To reset their vote counter
      userCol.findOneAndUpdate({ userID: votedUser }, {$set: {'times.voteTime': Date.now()}})

      const specialCats = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws']
      const result = Math.floor((Math.random() * specialCats.length))

      // Check To See What Cat Is Randomly Slected Then Add It To Their Cats
      const catDbName = `cats.${specialCats[result]}.amount`
      userCol.findOneAndUpdate({ userID: votedUser }, {$set: {[catDbName]: userdata.cats[specialCats[result]].amount + 1}})

      // To send a DM to the user letting them know their rewards for voting
      const votedEmbed = new Discord.RichEmbed()
        .setColor(bot.config.color.blue)
      if (vote.isWeekend === true) {
        // If It's The Weekend Add $5,000 To Their Account
        userCol.findOneAndUpdate({ userID: votedUser }, {$set: {'money.catmoney': userdata.money.catmoney + 5000}})

        votedEmbed.setAuthor('Thanks for upvoting Cats o Mighty • Weekend Rewards', bot.user.avatarURL)
        votedEmbed.setDescription(`**For upvoting Cats o Mighty you get:**\n\n:cat2: ${specialCats[result]}\n:moneybag: $5,000\n\n:alarm_clock: **In 12 hours you can vote again to get more rewards!**`)
      } else {
        votedEmbed.setAuthor('Thanks for upvoting Cats o Mighty', bot.user.avatarURL)
        votedEmbed.setDescription(`**For upvoting Cats o Mighty you get:**\n\n:cat2: ${specialCats[result]}\n\n:alarm_clock: **In 12 hours you can vote again to get more rewards!**`)
      }
      bot.users.get(votedUser).send(votedEmbed)

    })
  })
}
