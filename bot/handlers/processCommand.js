const Discord = require('discord.js');
exports.run = async (bot, message, cmd, args, prefix) => {

  if(cmd === `start`){
    //* If The User Is A New Cat Collector And Runs 'cat start'
    bot.db.Userdata.findOne({userID: message.author.id}, async (err, userdata) => {
      if(err) bot.log("priority", `processCommand userdata failed: ${err}`);
      bot.db.Guildsettings.findOne({guildID: message.guild.id}, async (err, settings) => {
        if(err) bot.log("priority", `processCommand guildsettings failed: ${err}`);
        if(userdata){
          // make sure the prefix is being used when typing 'cat start'
          let prefix = bot.config.prefix;
          if(message.content.startsWith(`<@${bot.user.id}>`)){
            prefix = `<@${bot.user.id}>`;
          }
          if(!message.content.trim().toLowerCase().startsWith(prefix)) return;
          message.channel.send(`<@${message.author.id}> no need, you're already a cat collector!`);
          return;
        }
        if(!userdata){
          let date = Date.now();
          console.log(bot.catdata.start(message, date));
          const newUserData = new bot.db.Userdata(bot.catdata.start(message, date));
          newUserData.save().catch(err => bot.log("error", `processCommand userdata saving failed: ${err}`));

          if(!settings){
            const newGuildSettings = new bot.db.Guildsettings({
              guildID: message.guild.id,CatGottenPopupMessage: true
            });
            newGuildSettings.save().catch(err => bot.log("error", `processCommand guildsettings saving failed: ${err}`));
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
    if(err) bot.log("error", `processCommand userdata failed: ${err}`)
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
        let checkCats = require("../lib/checkCats.js");
        let getCats = require("./getCats.js");
        checkCats.run(bot, message);
        getCats.run(bot, message);
      }


      //* Logging stuff
      userdata.stats.saidCat += 1;
      userdata.save().catch(err => bot.log("error", `processCommand userdata logging failed: ${err}`));
    }
  });
}