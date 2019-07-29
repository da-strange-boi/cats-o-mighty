//* Discord.js
const Discord = require("discord.js");

//* Mongoose Vars (database)
const Userdata = require("../moduls/userdata.js");
let Guildsettings = require('../moduls/guildsettings.js');

bot.on("message", async message => {

  //* Checks To See If Another Bot Sent A Message Or If A User Trys To DM The Bot && Make Sure It Doesn't Respond
  if (message.author.bot || message.channel.type === "dm"){
    return;
  };

  //* Select A User Data From The Database
  Userdata.findOne({
    userID: message.author.id
  }, (err, userdata) => {
    if(err) console.log(err);
    if(userdata){
      if(userdata.cats.cursedcat === undefined){
        userdata.cats.cursedcat = 0;
      }
      if(userdata.cats.russianBlue === undefined && userdata.cats.munchkin === undefined){
        userdata.cats.russianBlue = 0;
        userdata.cats.munchkin = 0;
      }
      if(userdata.cats.turkishAngora === undefined){
        userdata.cats.turkishAngora = 0;
      }
      if(userdata.cats.loki === undefined && userdata.cats.loverboy === undefined){
        userdata.cats.loki = 0;
        userdata.cats.loverboy = 0;
      }
      if(userdata.cats.uwu === undefined){
        userdata.cats.uwu = 0;
      }
      userdata.save().catch(err => console.log(err));
    }
  });

  Guildsettings.findOne({
    guildID: message.guild.id
  }, (err, guildSettings) => {
    if(err) throw err;
    if(!guildSettings){
      const newSettings = new Guildsettings({
        guildID: message.guild.id,CatGottenPopupMessage: true
      });
      newSettings.save().catch(err => console.log(err));
    }

  });

});