newUser = false;

//* Main Discord Vars
Discord = require("discord.js");
global.bot = new Discord.Client({
  fetchAllMembers: false,
  disableEveryone: true,
  disabledEvents: ['GUILD_MEMBER_ADD', 'GUILD_MEMBER_REMOVE', 'GUILD_MEMBER_UPDATE', 'GUILD_MEMBERS_CHUNK', 'GUILD_INTEGRATIONS_UPDATE', 'GUILD_ROLE_CREATE', 'GUILD_ROLE_DELETE', 'GUILD_ROLE_UPDATE', 'GUILD_BAN_ADD', 'GUILD_BAN_REMOVE', 'CHANNEL_CREATE', 'CHANNEL_DELETE', 'CHANNEL_UPDATE', 'CHANNEL_PINS_UPDATE', 'MESSAGE_DELETE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE_BULK', 'MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE', 'MESSAGE_REACTION_REMOVE_ALL', 'USER_UPDATE', 'USER_NOTE_UPDATE', 'USER_SETTINGS_UPDATE', 'PRESENCE_UPDATE', 'VOICE_STATE_UPDATE', 'TYPING_START', 'VOICE_SERVER_UPDATE', 'RELATIONSHIP_ADD', 'RELATIONSHIP_REMOVE'],
});
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//* .json Vars
const config = require("./config.json");

//* Other Module Vars
require('dotenv/config');
global.fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
  useNewUrlParser: true,
  useFindAndModify: false
});
const Userdata = require("./moduls/userdata.js");
const Logs = require('./moduls/logs.js');

//* DBL posting stats && DB.GG posting stats && BFD posting stats
if(process.env.DEBUG === 'false'){
  require('./utils/API/db.js');
  require('./utils/API/dbgg.js');
  require('./utils/API/bfd.js');
  require('./utils/API/dbl.js');
}

//* Includes The Script For Loading All The Commands Within The Bot
require('./utils/loadCommands.js');

//* When The Bot Is 'ready' Console Log Some Info && Set The Bot Activity
bot.on("ready", async () => {
  let realUsers = bot.users.filter(user => !user.bot).size;
  let botUsers = bot.users.filter(bot => bot.bot).size;
  console.log(`\n~~${bot.user.username} has started~~\n${realUsers} users\n${botUsers} bots\n${bot.channels.size} channels\n${bot.guilds.size} guilds\n`);
	setInterval(() => {
		bot.user.setActivity(`with cattos on ${bot.guilds.size} servers | do 'cat help' for help`, { type: "PLAYING"} );
  }, 600000); // 10 min
  require('./utils/webhook.js');
});

//* Whenever A Message Is Sent Run The Code Below
bot.on("message", async message => {

  //* Figure out if the user used @mention or cat for the prefix
  let prefix = config.prefix;
  if(message.content.startsWith(`<@${bot.user.id}>`)){
    prefix = `<@${bot.user.id}>`;
    if(message.content.trim() === `<@${bot.user.id}>`){
      message.channel.send(`**${message.author.username}**, my prefix is \`cat\` uwu`);
      return;
    }
  }

  //* Set Vars For The Commands
  let args = message.content.slice(prefix.length).trim().split(' ');
  global.cmd = args.shift().toLowerCase();
  let command;

  //* Make Sure The Prefix Is Used
  if(!message.content.trim().toLowerCase().startsWith(prefix)) return;

  //* Make Sure It Doesn't Run A Command From Itself (endless loop) && No One Trys To Send A Command Though A DM
  if (message.author.bot || message.channel.type === "dm"){
    return;
  };

  //* Check to see if the bot has the permissions
  if(message.guild.me.hasPermission(['SEND_MESSAGES', 'MANAGE_MESSAGES', 'USE_EXTERNAL_EMOJIS', 'EMBED_LINKS', 'ADD_REACTIONS']) === false){
    return;
  }

  //* Setup Command 'start' To Setup The Database For New Users
  require('./utils/newCat.js');

  // Loging stuff
  Logs.findOne({}, (err, log) => {
    if(log){
      log.botUsed += 1;
      log.save().catch(err => console.log(err));
    }
    if(!log){
      let newLog = new Logs({
        botUsed: 1
      });
      newLog.save().catch(err => console.log(err));
    }
  });
      
  if(newUser === false) {

    //* Load All The Commands From ./commands/
    if(bot.commands.has(cmd)) {
      command = bot.commands.get(cmd);
    } else {command = bot.commands.get(bot.aliases.get(cmd));}

    if(command) command.run(bot, message, args);

  }
});

bot.on("guildCreate", async guild => {
  let catsomighty = bot.guilds.find(search => search.id === '574420903169884170');
  let logChannel = catsomighty.channels.find(search => search.name === 'bot-server-data');
  if(!logChannel) return console.log("Can't find incidents channel.");

  let date = new Date();
  let guildCreateEmbed = new Discord.RichEmbed()
  .setDescription(`**• Guild:** \`${guild.name}\`\n**• Members:** \`${guild.memberCount}\`\n**• Owner:** \`${guild.owner.user.tag}\`\n**• Region:** \`${guild.region}\``)
  .setFooter(`${bot.guilds.size} guilds`)
  .setColor(config.color.utility)
  .setTimestamp(date);
  if(guild.iconURL != null){
    guildCreateEmbed.setThumbnail(guild.iconURL)
  }
  if(guild.large === true){
    guildCreateEmbed.setTitle(':inbox_tray: Added Guild - **large**');
  } else {guildCreateEmbed.setTitle(':inbox_tray: Added Guild');}
  if(guild.verified === true){
    guildCreateEmbed.addField('Verified', 'i dont know how to make this look good :p')
  }

  logChannel.send(guildCreateEmbed);

});

bot.on("guildDelete", async guild => {
  let catsomighty = bot.guilds.find(search => search.id === '574420903169884170');
  let logChannel = catsomighty.channels.find(search => search.name === 'bot-server-data');
  if(!logChannel) return console.log("Can't find incidents channel.");

  let date = new Date();
  let guildDeleteEmbed = new Discord.RichEmbed()
  .setDescription(`**• Guild:** \`${guild.name}\`\n**• Members:** \`${guild.memberCount}\`\n**• Owner:** \`${guild.owner.user.tag}\`\n**• Region:** \`${guild.region}\``)
  .setFooter(`${bot.guilds.size} guilds`)
  .setColor(config.color.error)
  .setTimestamp(date);
  if(guild.iconURL != null){
    guildDeleteEmbed.setThumbnail(guild.iconURL)
  }
  if(guild.large === true){
    guildDeleteEmbed.setTitle(':outbox_tray: Removed Guild - **large**');
  } else {guildDeleteEmbed.setTitle(':outbox_tray: Removed Guild');}
  if(guild.verified === true){
    guildDeleteEmbed.addField('Verified', 'i dont know how to make this look good :p')
  }

  logChannel.send(guildDeleteEmbed);
});

//* Login As The Bot (making it go online)
bot.login(process.env.BOT_TOKEN);