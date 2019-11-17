const fetch = require('node-fetch')
exports.run = async (bot) => {
  const bodyData = { server_count: bot.guilds.size }
  fetch('https://discord.boats/api/bot/569336139186700312', {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${process.env.DISCORD_BOATS}`
    }
  }).catch(err => bot.log('error', `DBOATS: ${err}`))
}