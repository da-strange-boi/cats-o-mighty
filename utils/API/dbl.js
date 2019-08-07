const request = require('request-promise');

setInterval(() => {

  let realUsers = bot.users.filter(user => !user.bot).size;

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${process.env.DISCORD_BOT_LIST_AUTH}`,
    },
    method: 'POST',
    uri: 'https://discordbotlist.com/api/bots/569336139186700312/stats',
    body: {
      guilds: bot.guilds.size,
      users: realUsers,
    },
    json: true
  }

  request(options)
  .catch(function(err){
    console.log(err);
  });
}, 2400000);