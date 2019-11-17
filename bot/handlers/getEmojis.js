exports.run = async (bot, emoji) => {
  if (emoji === 'whiteHeart') {
    return bot.emojis.find(emoji => emoji.id === '645372678760562718')
  }
  if (emoji === 'gold') {
    return bot.emojis.find(emoji => emoji.id === '579860509264969739')
  }
  if (emoji === 'silver') {
    return bot.emojis.find(emoji => emoji.id === '579860480500301844')
  }
  if (emoji === 'bronze') {
    return bot.emojis.find(emoji => emoji.id === '579860359196704770')
  }
}