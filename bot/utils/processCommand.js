const Discord = require('discord.js');
exports.run = async (bot, message, cmd, args, prefix) => {

  let command;

  //* Checks To See If Another Bot Sent A Message Or If A User Trys To DM The Bot && Make Sure It Doesn't Respond
  if (message.author.bot || message.channel.type === "dm") return;

  if(cmd === `start`){
    //* If The User Is A New Cat Collector And Runs 'cat start'
    bot.db.Userdata.findOne({userID: message.author.id}, async (err, userdata) => {
      if(err) bot.log("priority", `processCommand userdata failed: ${err}`);
      bot.db.Guildsettings.findOne({guildID: message.guild.id}, async (err, settings) => {
        if(err) bot.log("priority", `processCommand guildsettings failed: ${err}`);
        if(userdata){
          message.channel.send(`<@${message.author.id}> no need, you're already a cat collector!`);
          return;
        }
        if(!userdata){
          let date = Date.now();
          const newUserData = new bot.db.Userdata({
            userID: message.author.id,
            userTag: message.author.tag,
            cats: {siamese: 0,burmese: 0,ragdoll: 0,persian: 0,mainecoon: 0,russianblue: 0,abyssinian: 0,manx: 0,sphynx: 0,cyprus: 0,foldex: 0,turkishangora: 0,korat: 0,singapura: 0,tonkinese: 0,peterbald: 0,chartreux: 0,munchkin: 0,bandit: 0,bug: 0,linda: 0,mittens: 0,cash: 0,jackson: 0,cottonball: 0,sonny: 0,smokey: 0,lailah: 0,cher: 0,marvin: 0,loki: 0,loverboy: 0,squirtlett: 0,cursedcat: 0,uwu: 0},
            money: {catmoney: 0},
            times: {dailyTime: 0,voteTime: 0,usedBotLast: date},
            stats: {catsSold: 0,saidCat: 1,dailyStreak: 0}
          });
          newUserData.save().catch(err => bot.log("priority", `processCommand userdata saving failed: ${err}`));

          if(!settings){
            const newGuildSettings = new bot.db.Guildsettings({
              guildID: message.guild.id,CatGottenPopupMessage: true
            });
            newGuildSettings.save().catch(err => bot.log("priority", `processCommand guildsettings saving failed: ${err}`));
          }

          let newUserEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.utility).setDescription("Welcome new cat collector!\nto get started do `cat help` to get the list of commands");
          message.channel.send(newUserEmbed);
          return;
        }
      });
    });
  }

  //* If The User Is A New User, Types 'cat {anything}' Send Them A Message Telling Them To Do 'cat start'
  bot.db.Userdata.findOne({
    userID: message.author.id
  }, (err, userdata) => {
    if(err) bot.log("priority", `processCommand userdata failed: ${err}`)
    if(!userdata){
      if(cmd != "start"){
        if(!message.content.trim().toLowerCase().startsWith(prefix)) return;
        let newPersonEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.utility).setDescription("hmm it looks like you're a new cat collector!!\nDo `cat start` to start collecting cats");
        message.channel.send(newPersonEmbed);
        return;
      }
    }

    //* Main Code For Running The Commands

    if(userdata){
      //* Don't Show 'level messages' In (DBL && DBGG && BFD) As It Is Agaest The Rules
      if(message.guild.id != "264445053596991498" && message.guild.id != "110373943822540800" && message.guild.id != "374071874222686211"){
        let checkCats = require("./checkCats.js");
        let getCats = require("./getCats.js");
        checkCats.run(bot, message);
        getCats.run(bot, message);
      }

      //* Make Sure The Prefix Is Used
      if(!message.content.trim().toLowerCase().startsWith(prefix)) return;

      //* Logging stuff
      userdata.stats.saidCat += 1;
      userdata.save().catch(err => bot.log("priority", `processCommand userdata logging failed: ${err}`));

      if(bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
      } else {command = bot.commands.get(bot.aliases.get(cmd));}
      if(command) command.run(bot, message, args);

    }
  });
}