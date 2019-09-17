const fetch = require('node-fetch');
exports.run = async (bot) => {
  let realUsers = bot.users.filter(user => !user.bot).size;
  let bodydata = {guilds: bot.guilds.size,users: realUsers}
  bot.log('warning', 'DBL Stats Updated');
  fetch('https://discordbotlist.com/api/bots/569336139186700312/stats', {
    method: 'POST',
    body: JSON.stringify(bodydata),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${process.env.DISCORD_BOT_LIST_AUTH}`,
    }
  }).catch(err => bot.log('warning', `DBL API: ${err}`));
}