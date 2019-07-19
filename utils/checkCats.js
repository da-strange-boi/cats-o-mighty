//* Discord.js
const Discord = require("discord.js");

//* Mongoose Vars (database)
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Cat = require("../moduls/cats.js");
let Settings = require('../moduls/settings.js');

bot.on("message", async message => {

  //* Checks To See If Another Bot Sent A Message Or If A User Trys To DM The Bot && Make Sure It Doesn't Respond
  if (message.author.bot || message.channel.type === "dm"){
    return;
  };

  //* Select A User Data From The Database
  Cat.findOne({
    userID: message.author.id
  }, (err, catList) => {
    if(err) console.log(err);
    if(catList){
      if(catList.cursedcat === undefined){
        catList.cursedcat = 0;
        catList.save().catch(err => console.log(err));
      }
      if(catList.russianBlue === undefined && catList.munchkin === undefined){
        catList.russianBlue = 0;
        catList.munchkin = 0;
        catList.save().catch(err => console.log(err));
      }
      if(catList.turkishAngora === undefined){
        catList.turkishAngora = 0;
      }
      if(catList.loki === undefined && catList.pancake === undefined){
        catList.loki = 0;
        catList.pancake = 0;
      }
      if(catList.uwu === undefined){
        catList.uwu = 0;
      }
      catList.save().catch(err => console.log(err));
    }
  });

  Settings.findOne({
    guildID: message.guild.id
  }, (err, guildSettings) => {
    if(err) console.log(err);
    if(!guildSettings){
      const newSettings = new Settings({
        guildID: message.guild.id,showCat: true
      });
      newSettings.save().catch(err => console.log(err));
    }

  });

});