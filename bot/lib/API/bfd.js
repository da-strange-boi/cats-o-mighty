const fetch = require('node-fetch')
exports.run = async (bot) => {
  const bodydataToPost = { server_count: bot.guilds.size }
  fetch('https://botsfordiscord.com/api/bot/569336139186700312', {
    method: 'POST',
    body: JSON.stringify(bodydataToPost),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.BOTS_FOR_DISCORD_AUTH}`
    }
  }).catch(err => bot.log('error', `BFD API: ${err}`))
}
