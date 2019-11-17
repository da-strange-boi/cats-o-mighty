exports.run = async (bot, emoji) => {
  if (emoji === 'whiteHeart') {
    return bot.emojis.find(emoji => emoji.id === '645372678760562718')
  }
}