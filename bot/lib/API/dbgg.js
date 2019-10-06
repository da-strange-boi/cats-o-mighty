const fetch = require('node-fetch')
exports.run = async (bot) => {
  const bodydataToPost = { guildCount: bot.guilds.size }
  fetch('https://discord.bots.gg/api/v1/bots/569336139186700312/stats', {
    method: 'post',
    body: JSON.stringify(bodydataToPost),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.DISCORD_BOTS_G_AUTH}`
    }
  }).catch(err => bot.log('error', `DBGG API: ${err}`))
}
