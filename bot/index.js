const Discord = require('discord.js');
const fs = require('fs');
require('dotenv/config');
bot = new Discord.Client({
  fetchAllMembers: false,
  disableEveryone: true,
  disabledEvents: ['GUILD_MEMBER_ADD', 'GUILD_MEMBER_REMOVE', 'GUILD_MEMBER_UPDATE', 'GUILD_MEMBERS_CHUNK', 'GUILD_INTEGRATIONS_UPDATE', 'GUILD_ROLE_CREATE', 'GUILD_ROLE_DELETE', 'GUILD_ROLE_UPDATE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'CHANNEL_CREATE', 'CHANNEL_DELETE', 'CHANNEL_UPDATE', 'CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE_BULK', 'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 'USER_UPDATE', 'USER_NOTE_UPDATE', 'USER_SETTINGS_UPDATE', 'PRESENCE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE'],
  http: { api: 'https://discordapp.com/api', version: 7 }
});
bot.log = require("./logging/basic.js");
bot.config = require('./config.json');
bot.db = require('./utils/db.js');
bot.wh = require('./utils/webhook.js');
bot.catdata = require('./utils/catNames.js');
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//login
bot.login(process.env.TOKEN);

//setup events
let loadCommands = require('./utils/loadCommands.js');
const init = async () => {
  fs.readdir("./bot/events/", (err, files) => {
    if (err) return bot.log(`priority`, `Failed to load all events\n===============\n\n${err}`)
    files.forEach(file => {
      let eventFunction = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      bot.on(eventName, (...args) => eventFunction.run(bot, ...args));
    });
  });
  loadCommands.run(bot, fs);
  bot.log("system", `The bot is launching and attempting to login to discord`);
};
init();
