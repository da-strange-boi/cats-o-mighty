function cmdRun (bot, message, cmd, args) {
  if (bot.commands.has(cmd)) return bot.commands.get(cmd)
  else if (bot.aliases.has(cmd)) return bot.commands.get(bot.aliases.get(cmd))
  else {
    return false
  }
}

module.exports = cmdRun
