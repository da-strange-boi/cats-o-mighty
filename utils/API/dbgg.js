const request = require('request-promise');
const config = require('../config.json');

setInterval(() => {
  
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': config.auth.DBGGauth,
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