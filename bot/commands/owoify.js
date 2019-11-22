const zuzak = require('@zuzak/owo')
const owoify = require('owoify-js').default
const ms = require('parse-ms')
const cooldown = {}
exports.run = async (bot, message, args) => {
  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${10 - time.seconds}s**`).then(msg => msg.delete(1000 * (10 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  // {usage}owoify <message>
  const messageToOwoify = args.join(' ')
  message.channel.send(owoify(zuzak(messageToOwoify), 'owo'))

  // Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 10000)
}

exports.help = {
  name: 'owoify',
  aliases: [],
  type: 'normal'
}