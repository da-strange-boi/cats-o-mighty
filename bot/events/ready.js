exports.run = async (bot) => {
  bot.user.setActivity('just got up from a nap and i might be a little slow', { type: 'PLAYING' })
  setInterval(() => {
    bot.user.setActivity(`with cattos on ${bot.guilds.size} servers | do 'cat help' for help`, { type: 'PLAYING' })
  }, 600000) // 10 min
  //bot.log('system', `${bot.user.username} is online!`)
  bot.log('botOnline')
}
