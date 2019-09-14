const fetch = require('node-fetch');
exports.run = async (bot) => {
  let bodydata = {server_count: bot.guilds.size}
  bot.log('warning', 'BFD Stats Updated');
  fetch('https://botsfordiscord.com/api/bot/569336139186700312', {
    method: 'POST',
    body: JSON.stringify(bodydata),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${process.env.BOTS_FOR_DISCORD_AUTH}`
    }
  }).catch(err => bot.log('warning', `BFD API: ${err}`));
}