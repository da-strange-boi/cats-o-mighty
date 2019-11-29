const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}

const timeout = 86400000 //* 24 hours (86400000)
const resetTime = 172800000 //* 48 hours (172800000)

const specialCats = Object.keys(require('../lib/catData.json').special)

exports.run = async (bot, message) => {
  // {USAGE} cat daily

  /* the system works by checking your daily streak
     If your streak is below a 7 (under a week) then you get common rewards
     If your streak is above a 7 (over a week) then you get special rewards
  */

  // #region cooldown
  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  // Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 3500)
  // #endregion cooldown

  const displayEmbed = async (amtMoney, dailyStreak, catName, note) => {
    const embed = new Discord.RichEmbed()
      .setAuthor('Daily', message.author.displayAvatarURL)
      .setColor(bot.config.color.blue)
      .addField(':star2: Streak', `${dailyStreak}`)
    if (note) embed.setDescription(note)
    if (amtMoney) embed.addField(':moneybag: Collected Money', `$${amtMoney}`)
    if (catName) embed.addField('Random stray cat you found', `${catName}`)
    if (dailyStreak <= 7) embed.setFooter('after 7 days you\'ll get better rewards')
    message.channel.send(embed)
  }

  const userCol = bot.database.Userdata
  userCol.findOne({ userID: message.author.id }, async (err, userdata) => {
    if (err) bot.log('error', err)
    const daily = userdata.times.dailyTime

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      const time = ms(timeout - (Date.now() - daily))

      const embed = new Discord.RichEmbed()
        .setAuthor('Daily', message.author.displayAvatarURL)
        .setColor(bot.config.color.blue)
        .setFooter('after 7 days you\'ll get better rewards')
        .setDescription(`You have to wait **${time.hours}h ${time.minutes}m ${time.seconds}s** until next daily`)
        .addField(':star2: Streak', `${userdata.stats.dailyStreak}`)
      message.channel.send(embed)
    } else if ((Date.now() - daily) > resetTime) {
      userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'times.dailyTime': Date.now()}})
      userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'stats.dailyStreak': 1}})

      // Set Vars For Special Cats
      const animals = specialCats
      const aResult = Math.floor((Math.random() * animals.length))

      // Check To See What Cat It Is Then Add It To Their Cats
      const catDbName = `cats.${animals[aResult]}.amount`
      userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animals[aResult]].amount + 1}})

      if (userdata.cats[animals[aResult]].discovered === false) {
        const catDbNameDis = `cats.${animals[aResult]}.discovered`
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbNameDis]: true}})
      }

      userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + 350}})
      displayEmbed('350', userdata.stats.dailyStreak, animals[aResult], 'Your streak has restarted')
    } else {
      userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'times.dailyTime': Date.now()}})
      userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'stats.dailyStreak': userdata.stats.dailyStreak + 1}})

      // If User Has Under A 7 Day Daily Streak
      if (userdata.stats.dailyStreak < 7) {
        let catName

        const specialCatAmt = Math.floor(Math.random() * 6) + 1
        const specialBaseAmt = Math.floor(Math.random() * 6) + 1

        //* Set Vars For Special Cats
        const animals = specialCats
        const aResult = Math.floor((Math.random() * animals.length))

        if (specialCatAmt === specialBaseAmt) {
          //* Check To See What Cat It Is Then Add It To Their Cats
          const catDbName = `cats.${animals[aResult]}.amount`
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animals[aResult]].amount + 1}})

          if (userdata.cats[animals[aResult]].discovered === false) {
            const catDbNameDis = `cats.${animals[aResult]}.discovered`
            userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbNameDis]: true}})
          }

          displayEmbed(undefined, userdata.stats.dailyStreak, animals[aResult])
        } else {
          const moneyList = [200, 250, 300, 350, 400, 500, 1000]
          const mResult = Math.floor((Math.random() * moneyList.length))

          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + moneyList[mResult]}})

          displayEmbed(moneyList[mResult], userdata.stats.dailyStreak, catName)
        }
      }
      // If User Has Over A 7 Day Daily Streak
      if (userdata.stats.dailyStreak >= 7) {
        const specialCatAmt = Math.floor(Math.random() * 3) + 1
        const specialBaseAmt = Math.floor(Math.random() * 3) + 1

        // Set Vars For Special Cats
        const animals = specialCats
        const aResult = Math.floor((Math.random() * animals.length))

        const moneyList = [800, 1000, 1700, 2000, 15000]
        const mResult = Math.floor((Math.random() * moneyList.length))
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'money.catmoney': userdata.money.catmoney + moneyList[mResult]}})

        if (specialCatAmt === specialBaseAmt) {
          // Check To See What Cat It Is Then Add It To Their Cats
          const catDbName = `cats.${animals[aResult]}.amount`
          userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbName]: userdata.cats[animals[aResult]].amount + 1}})
          if (userdata.cats[animals[aResult]].discovered === false) {
            const catDbNameDis = `cats.${animals[aResult]}.discovered`
            userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {[catDbNameDis]: true}})
          }
          displayEmbed(moneyList[mResult], userdata.stats.dailyStreak, animals[aResult])
        } else {
          displayEmbed(moneyList[mResult], userdata.stats.dailyStreak, undefined)
        }
      }
    }
  })
}

module.exports.help = {
  name: 'daily',
  aliases: [],
  type: 'normal'
}
