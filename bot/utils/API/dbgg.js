const request = require('request-promise');

exports.run = async (bot) => {
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': process.env.DISCORD_BOTS_G_AUTH,
    },
    method: 'POST',
    uri: 'https://discord.bots.gg/api/v1/bots/569336139186700312/stats',
    body: {
      'guildCount': bot.guilds.size
    },
    json: true
  }

  request(options)
  .catch(function(err){
    bot.log('warning', `discord.bots.gg API Error: ${err}`);
  });
}