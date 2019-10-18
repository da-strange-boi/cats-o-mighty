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
    bot.database.Userdata.findOne({ userID: vote.user }, (err, userdata) => {
      if (err) bot.log('error', `Discordbots.org API Error: ${err}`)

      if (!userdata) return

      // To reset their vote counter
      userdata.times.voteTime = Date.now()

      const votedUser = vote.user
      const userCats = userdata.cats
      const specialCats = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws']
      const result = Math.floor((Math.random() * specialCats.length))
      let catName

      // Check To See What Cat Is Randomly Slected Then Add It To Their Cats
      if (result === 0) { userCats.bandit += 1; catName = 'bandit' }
      if (result === 1) { userCats.bug += 1; catName = 'bug' }
      if (result === 2) { userCats.linda += 1; catName = 'linda' }
      if (result === 3) { userCats.mittens += 1; catName = 'mittens' }
      if (result === 4) { userCats.cash += 1; catName = 'cash' }
      if (result === 5) { userCats.jackson += 1; catName = 'jackson' }
      if (result === 6) { userCats.cottonball += 1; catName = 'cottonball' }
      if (result === 7) { userCats.sonny += 1; catName = 'sonny' }
      if (result === 8) { userCats.smokey += 1; catName = 'smokey' }
      if (result === 9) { userCats.lailah += 1; catName = 'lailah' }
      if (result === 10) { userCats.cher += 1; catName = 'cher' }
      if (result === 11) { userCats.marvin += 1; catName = 'marvin' }
      if (result === 12) { userCats.loki += 1; catName = 'loki' }
      if (result === 13) { userCats.loverboy += 1; catName = 'loverboy' }
      if (result === 14) { userCats.killerclaws += 1; catName = 'killerclaws' }

      // To send a DM to the user letting them know their rewards for voting
      const votedEmbed = new Discord.RichEmbed()
        .setColor(bot.config.color.blue)
      if (vote.isWeekend === true) {
        // If It's The Weekend Add $5,000 To Their Account
        userdata.money.catmoney += 5000

        votedEmbed.setAuthor('Thanks for upvoting Cats o Mighty • Weekend Rewards', bot.user.avatarURL)
        votedEmbed.setDescription(`**For upvoting Cats o Mighty you get:**\n\n:cat2: ${catName}\n:moneybag: $5,000\n\n:alarm_clock: **In 12 hours you can vote again to get more rewards!**`)
      } else {
        votedEmbed.setAuthor('Thanks for upvoting Cats o Mighty', bot.user.avatarURL)
        votedEmbed.setDescription(`**For upvoting Cats o Mighty you get:**\n\n:cat2: ${catName}\n\n:alarm_clock: **In 12 hours you can vote again to get more rewards!**`)
      }
      bot.users.get(votedUser).send(votedEmbed)

      // Save value to database
      userdata.save().catch(err => console.log(err))
    })
  })
}
