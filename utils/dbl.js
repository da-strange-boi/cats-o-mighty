const Discord = require('discord.js');
const request = require('request-promise');
const config = require('../config.json');

setInterval(() => {

  //let realUsers = bot.guild.members.filter(member => !member.user.bot).size; 

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bot ${config.auth.DBLauth}`,
    },
    method: 'POST',
    uri: 'https://discordbotlist.com/api/bots/569336139186700312/stats',
    body: {
      guilds: bot.guilds.size,
      users: bot.users.size,
    },
    json: true
  }

  request(options)
  .then(function(response){
    return true
  })
  .catch(function(err){
    console.log(err);
  });
}, 2400000);