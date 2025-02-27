const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}

exports.run = async (bot, message) => {
  // {USAGE} cat money

  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
    if (err) bot.log('error', err)
    if (userdata) {
      const uMoney = userdata.money.catmoney
      const moneyEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor(bot.config.color.blue)
        .setDescription(`You have **$${bot.functions.formatMoney(uMoney)}**`)
      message.channel.send(moneyEmbed)
    }
  })

  // Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 3500)
}

exports.help = {
  name: 'money',
  aliases: ['cash'],
  type: 'normal'
}
