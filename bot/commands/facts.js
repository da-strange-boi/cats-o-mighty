const superagent = require('superagent')
const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}
exports.run = async (bot, message) => {
  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${10 - time.seconds}s**`).then(msg => msg.delete(1000 * (10 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  // Get the json page contents
  const { body } = await superagent.get('https://cat-fact.herokuapp.com/facts/random')
  const factsEmbed = new Discord.RichEmbed()
    .setTitle('Random Cat Fact')
    .setDescription(`\`${body.text}\``)
    .setColor(bot.config.color.blue)
  await message.channel.send(factsEmbed)

  // Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 10000)
}

exports.help = {
  name: 'facts',
  aliases: ['fact'],
  type: 'normal'
}
