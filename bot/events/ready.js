exports.run = async (bot) => {
  bot.user.setActivity('just got up from a nap and i might be a little slow', { type: 'PLAYING' })
  setInterval(() => {
    bot.user.setActivity(`Thank you all! It was a fun ride | playing with cattos on ${bot.guilds.size} servers`, { type: 'PLAYING' })
  }, 600000) // 10 min
  bot.log('botOnline')
}
