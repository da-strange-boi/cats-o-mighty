const fetch = require('node-fetch')
exports.run = async (bot) => {
  const realUsersCount = bot.users.filter(user => !user.bot).size
  const bodydataToPost = { guilds: bot.guilds.size, users: realUsersCount }
  fetch('https://discordbotlist.com/api/bots/569336139186700312/stats', {
    method: 'POST',
    body: JSON.stringify(bodydataToPost),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${process.env.DISCORD_BOT_LIST_AUTH}`
    }
  }).catch(err => bot.log('error', `DBL API: ${err}`))
}
