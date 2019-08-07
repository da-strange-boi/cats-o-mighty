const request = require('request-promise');

setInterval(() => {
  
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
    console.log(err);
  });
}, 2400000); // 40 mins