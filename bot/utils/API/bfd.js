const request = require('request-promise');
exports.run = async (bot) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.BOTS_FOR_DISCORD_AUTH,
    },
    method: 'POST',
    uri: 'https://botsfordiscord.com/api/bot/569336139186700312',
    body: {
      'server_count': bot.guilds.size
    },
    json: true
  }

  request(options)
  .catch(function(err){
    bot.log('warning', `Bots for Discord API Error: ${err}`);
  });
}