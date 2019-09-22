const Discord = require('discord.js');
let schedule = require('node-schedule');
const fs = require('fs');
const bot = new Discord.Client({
  fetchAllMembers: false,
  disableEveryone: true,
  disabledEvents: ['GUILD_MEMBER_ADD', 'GUILD_MEMBER_REMOVE', 'GUILD_MEMBER_UPDATE', 'GUILD_MEMBERS_CHUNK', 'GUILD_INTEGRATIONS_UPDATE', 'GUILD_ROLE_CREATE', 'GUILD_ROLE_DELETE', 'GUILD_ROLE_UPDATE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'CHANNEL_CREATE', 'CHANNEL_DELETE', 'CHANNEL_UPDATE', 'CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE_BULK', 'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 'USER_UPDATE', 'USER_NOTE_UPDATE', 'USER_SETTINGS_UPDATE', 'PRESENCE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE'],
  http: { api: 'https://discordapp.com/api', version: 7 }
});
require('dotenv/config');
bot.log = require("./lib/logging");
bot.config = require('./config.json');
bot.db = require('./lib/db.js');
// bot.wh = require('./utils/webhook.js');
bot.getCmd = require("./handlers/getCommands");
require("./handlers/commandHandler")(bot);
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//login
bot.login(process.env.TOKEN);

// const dataStats = async () => {
//   if(process.env.DEBUG === 'false'){
//     let BFD = require('lib/API/bfd.js'), DB = require('lib/API/db.js'), DBGG = require('lib/API/dbgg.js'), DBL = require('lib/API/dbl.js');
//     await DB.run(bot);
//     setInterval(async() => {
//       await BFD.run(bot);
//       await DBGG.run(bot);
//       await DBL.run(bot);
//     }, 2400000); // 40 mins
//   }
// }
// dataStats();


const dataStats = async (client) => {
  if(process.env.DEBUG === 'false'){
    let BFD = require('lib/API/bfd.js');
    let DB = require('lib/API/db.js');
    let DBGG = require('lib/API/dbgg.js');
    let DBL = require('lib/API/dbl.js');
    DB.run(client);
    let job = schedule.scheduleJob('0 */45 * * * *', function(){
      BFD.run(client);
      DBGG.run(client);
      DBL.run(client);
      bot.log('default', 'Stats posted to bot lists');
    });
  } else {
    return;
  }
}
dataStats(bot);


//setup events
const init = async () => {
  fs.readdir("./bot/events/", (err, files) => {
    if (err) return bot.log(`error`, `Failed to load all events\n===============\n\n${err}`);
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
  });
  fs.readdir('./bot/commands/', (err, files) => {
    if (err) bot.log(`error`, `Failed to load all commands\n===============\n\n${err}`);
    files.forEach(f => {
      if (!f.endsWith(".js")) return;
      const response = bot.loadCommand(f);
      if (response) console.log(response);
    });
  });
  bot.log("system", `The bot is launching and attempting to login to discord`);
}
init();
