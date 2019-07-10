//! Alerts
//TODO yeah
//USAGE yep
//* Information
//? questioning
////get rid of a peac of code////

runCommand = true;
newUser = false;

//* Main Discord Vars
Discord = require("discord.js");
global.bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

//* .json Vars
const config = require("./config.json");
let cooldown = new Set();
let cdseconds = 3.5;


//* Other Module Vars
global.fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
  useNewUrlParser: true
});
const Cat = require("./moduls/cats.js");
const Money = require("./moduls/money.js");
const Daily = require("./moduls/daily.js");

//* DBL posting stats && DBGG posting stats
if(config.debug === false){
  require('./utils/dbl.js');
  require('./utils/dbgg.js');
}

//* Includes The Script For Loading All The Commands Within The Bot
require('./utils/loadCommands.js');

//* When The Bot Is 'ready' Console Log Some Info && Set The Bot Activity
bot.on("ready", async () => {
    console.log(`${bot.user.username} has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.\n`);
	setInterval(() => {
		bot.user.setActivity(`with cattos on ${bot.guilds.size} servers | do 'cat help' for help`, { type: "PLAYING"} );
	}, 600000); // 10 mins
});

//* Whenever A Message Is Sent Run The Code Below
bot.on("message", async message => {

  //* Set Vars For The Commands
  let prefix = config.prefix;
  let args = message.content.slice(prefix.length).trim().split(' ');
  global.cmd = args.shift().toLowerCase();
  let command;

  //* Make Sure The Prefix Is Used
  if(!message.content.trim().toLowerCase().startsWith(prefix)) return;

  //* Make Sure It Doesn't Run A Command From Itself (endless loop) && No One Trys To Send A Command Though A DM
  if (message.author.bot || message.channel.type === "dm"){
    return;
  };

  //* set up logging
  require('./utils/logging.js');

  //* Setup Command 'start' To Setup The Database For New Users
  require('./utils/newCat.js');

  //* If The User Is A New User, Types 'cat {anything}' Send Them A Message Telling Them To Do 'cat start'
  Cat.findOne({
      userID: message.author.id
  }, (err, catList) => {
    if(err) console.log(err);
    if(!catList){
      if(cmd != "start"){
        let newPersonEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.utility).setDescription("hmm it looks like you're a new cat collector!!\nDo `cat start` to start collecting cats");
        message.channel.send(newPersonEmbed);
        return;
      }
    }

    //* Main Code For Running The Commands

    if(catList){

      //* Don't Show 'level messages' In DBL As It Is Agaest The Rules
      if(message.guild.id != "264445053596991498" && message.guild.id != "110373943822540800" && message.guild.id != "374071874222686211"){
        require("./utils/getCats.js");
        require("./utils/checkCats.js");
      }

      //? Maybe Find A Better Way To Do This
      //* Set A Cooldown For Commands
      if(cmd != `${prefix}collection` || cmd != `${prefix}cattos` || cmd != `${prefix}c`){
        if(cooldown.has(message.author.id)){
          message.channel.send(`<@${message.author.id}>You gotta wait 3.5 seconds between commands`).then(msg => msg.delete(3500));
          runCommand = false;
        }
        cooldown.add(message.author.id);
      }
      
      if(runCommand === true && newUser === false) {

        //* Load All The Commands From ./commands/
        if(bot.commands.has(cmd)) {
          command = bot.commands.get(cmd);
        } else {command = bot.commands.get(bot.aliases.get(cmd));}

        if(command) command.run(bot, message, args);

      }

      //* Delete The Cooldown Resetting It
      setTimeout(() => {
        cooldown.delete(message.author.id);
        runCommand = true;
      }, cdseconds * 1000)
    }
  });
});

bot.on("guildCreate", async guild => {
  let catsomighty = bot.guilds.find(search => search.id === '574420903169884170');
  let logChannel = catsomighty.channels.find(search => search.name === 'bot-added');
  if(!logChannel) return console.log("Can't find incidents channel.");

  let date = new Date();
  let guildCreateEmbed = new Discord.RichEmbed()
  .setTitle("**Bot added to server**")
  .setDescription(`**Server Count Is Now** ${bot.guilds.size}`)
  .setColor(config.color.utility)
  .addField("**Server Name**", `${guild.name}`)
  .addField("**Members in server**", `${guild.memberCount}`)
  .addField("**Server Region**", `${guild.region}`)
  .setTimestamp(date);

  logChannel.send(guildCreateEmbed);

});

bot.on("guildDelete", async guild => {
  let catsomighty = bot.guilds.find(search => search.id === '574420903169884170');
  let logChannel = catsomighty.channels.find(search => search.name === 'bot-added');
  if(!logChannel) return console.log("Can't find incidents channel.");

  let date = new Date();
  let guildDeleteEmbed = new Discord.RichEmbed()
  .setTitle("**Bot deleted from server**")
  .setDescription(`**Server Count Is Now** ${bot.guilds.size}`)
  .setColor(config.color.error)
  .addField("**Server Name**", `${guild.name}`)
  .setTimestamp(date);

  logChannel.send(guildDeleteEmbed);
});

//* Login As The Bot (making it go online)
bot.login(config.token);
