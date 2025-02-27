const ms = require('parse-ms')
const timeout = 43200000 // 12 hours
exports.run = async (bot, message) => {
  // {USAGE} cat vote

  bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
    if (err) bot.log('error', err)
    const vote = userdata.times.voteTime

    if (vote !== null && timeout - (Date.now() - vote) > 0) {
      const time = ms(timeout - (Date.now() - vote))
      message.channel.send(`You can vote every 12 hours\nIn **${time.hours}h ${time.minutes}m ${time.seconds}s** you can vote again\nhttps://top.gg/bot/569336139186700312/vote`)
    } else {
      message.channel.send(':ballot_box_with_check: **You can claim your bi-daily vote now!**\n        You can vote every 12 hours\nhttps://top.gg/bot/569336139186700312/vote')
    }
  })
}

module.exports.help = {
  name: 'vote',
  aliases: [],
  type: 'normal'
}
