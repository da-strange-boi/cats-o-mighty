exports.run = async (bot, message) => {
  if (!message.guild || message.author.bot) return

  // Decide what prefix the user uses
  let prefix
  if (message.content.startsWith(`<@${bot.user.id}>`) || message.content.startsWith(`<@!${bot.user.id}>`)) {
    prefix = `<@${bot.user.id}>`
    if (message.content.trim() === `<@${bot.user.id}>`) {
      return message.channel.send(`**${message.author.username}**, my prefix is \`cat\` uwu`)
    }
  } else {
    prefix = 'cat'
  }

  const permCheck = require('../handlers/permCheck')
  const processCommand = require('../handlers/processCommand')

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase()

  const cmd = bot.getCmd(bot, command)
  processCommand.run(bot, message, cmd, prefix)
  if (!cmd || permCheck(message, cmd, prefix) === false) return
  if (!message.content.trim().toLowerCase().startsWith(prefix)) return
  
  // make sure the user has an account before running any commands
  bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
    if (err) bot.log('error', err)
    if (userdata) {
      try {
        cmd.run(bot, message,args)
      } catch (e) {
        bot.log('error', e)
      }
    }
  })
}
