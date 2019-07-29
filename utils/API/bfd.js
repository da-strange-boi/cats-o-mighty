const request = require('request-promise');
const config = require('../config.json');

setInterval(() => {

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': config.auth.BFDauth,
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
    console.log(err);
  });
}, 2400000); // 40 mins