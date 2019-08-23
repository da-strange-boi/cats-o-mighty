const fetch = require('node-fetch');
exports.run = async (bot) => {
  fetch('https://botsfordiscord.com/api/bot/569336139186700312', {
    method: 'post',
    body: {
      'server_count': bot.guilds.size
    },
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.BOTS_FOR_DISCORD_AUTH,
    }
  }).catch(err => bot.log('warning', `BFD API: ${err}`));
}