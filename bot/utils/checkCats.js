exports.run = (bot, message) => {
  //* Select A User Data From The Database
  bot.db.Userdata.findOne({
    userID: message.author.id
  }, (err, userdata) => {
    if(err) bot.log('databaseError', err);
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
      userdata.userTag = message.author.tag;
      userdata.save().catch(err => console.log(err));
    }
  });

  bot.db.Guildsettings.findOne({
    guildID: message.guild.id
  }, (err, guildSettings) => {
    if(err) bot.log('databaseError', err);
    if(!guildSettings){
      const newSettings = new bot.db.Guildsettings({
        guildID: message.guild.id,CatGottenPopupMessage: 'disappear'
      });
      newSettings.save().catch(err => console.log(err));
    }
  });
}