exports.run = async (bot) => {
  setInterval(() => {
    bot.user.setActivity(`with cattos on ${bot.guilds.size} servers | do 'cat help' for help`, { type: 'PLAYING' })
  }, 600000) // 10 min
  bot.log('system', `${bot.user.username} is online!`)
}
