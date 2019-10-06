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

  //* Whenever Someone Votes Run Code
  dbl.webhook.on('vote', vote => {
    bot.db.Userdata.findOne({
      userID: vote.user
    }, (err, userdata) => {
      if (err) bot.log('databaseError', `Discordbots.org API Error: ${err}`)

      if (!userdata) {
        return
      }

      //* If It's The Weekend Add $5,000 To Their Account
      userdata.money.catmoney += 5000

      //* To reset their vote counter
      userdata.times.voteTime = Date.now()

      //* Add A Random Special Cat To Their Collection For Voting
      const votedUser = vote.user

      //* Set Vars For Special Cats
      const animals = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws']
      const result = Math.floor((Math.random() * animals.length))
      let catName

      //* Check To See What Cat It Is Then Add It To Their Cats
      if (result === 0) { userdata.cats.bandit += 1; catName = 'bandit' }
      if (result === 1) { userdata.cats.bug += 1; catName = 'bug' }
      if (result === 2) { userdata.cats.linda += 1; catName = 'linda' }
      if (result === 3) { userdata.cats.mittens += 1; catName = 'mittens' }
      if (result === 4) { userdata.cats.cash += 1; catName = 'cash' }
      if (result === 5) { userdata.cats.jackson += 1; catName = 'jackson' }
      if (result === 6) { userdata.cats.cottonball += 1; catName = 'cottonball' }
      if (result === 7) { userdata.cats.sonny += 1; catName = 'sonny' }
      if (result === 8) { userdata.cats.smokey += 1; catName = 'smokey' }
      if (result === 9) { userdata.cats.lailah += 1; catName = 'lailah' }
      if (result === 10) { userdata.cats.cher += 1; catName = 'cher' }
      if (result === 11) { userdata.cats.marvin += 1; catName = 'marvin' }
      if (result === 12) { userdata.cats.loki += 1; catName = 'loki' }
      if (result === 13) { userdata.cats.loverboy += 1; catName = 'loverboy' }
      if (result === 14) { userdata.cats.killerclaws += 1; catName = 'killerclaws' }

      //* To send a DM to the user letting them know their rewards for voting

      const votedEmbed = new Discord.RichEmbed()
        .setColor(bot.config.color.cats)
      if (vote.isWeekend === true) {
        votedEmbed.setAuthor('Thanks for upvoting Cats o Mighty • Weekend Rewards', bot.user.avatarURL)
        votedEmbed.setDescription(`**For upvoting Cats o Mighty you get:**\n\n:cat2: ${catName}\n:moneybag: $5,000\n\n:alarm_clock: **In 12 hours you can vote again to get more rewards!**`)
      } else {
        votedEmbed.setAuthor('Thanks for upvoting Cats o Mighty', bot.user.avatarURL)
        votedEmbed.setDescription(`**For upvoting Cats o Mighty you get:**\n\n:cat2: ${catName}\n\n:alarm_clock: **In 12 hours you can vote again to get more rewards!**`)
      }
      bot.users.get(votedUser).send(votedEmbed)

      //* Save value to database
      userdata.save().catch(err => console.log(err))
    })
  })
}
