const request = require('request-promise');

setInterval(() => {
  
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGkiOnRydWUsImlkIjoiMjk1MjU1NTQzNTk2MTg3NjUwIiwiaWF0IjoxNTYxNTE4NjMwfQ.V2rjWT3yJulKfl-UWSbKTXZjT6ZXHU9rsCIELR9nvI0',
    },
    method: 'POST',
    uri: 'https://discord.bots.gg/api/v1/bots/569336139186700312/stats',
    body: {
      'guildCount': bot.guilds.size
    },
    json: true
  }

  request(options)
  .then(function (response){
    return true
  })
  .catch(function (err){
    console.log(err);
  });
}, 2400000);