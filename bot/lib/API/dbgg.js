const fetch = require('node-fetch');
exports.run = async (bot) => {
  let bodydata = {guildCount: bot.guilds.size}
  bot.log('warning', 'DBGG Stats Updated');
  fetch('https://discord.bots.gg/api/v1/bots/569336139186700312/stats', {
    method: 'post',
    body: JSON.stringify(bodydata),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${process.env.DISCORD_BOTS_G_AUTH}`,
    }
  }).catch(err => bot.log('warning', `DBGG API: ${err}`));
}