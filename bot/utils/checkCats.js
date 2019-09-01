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
      if(userdata.cats.calico === undefined && userdata.cats.tabby === undefined && userdata.cats.norwegianforest === undefined && userdata.cats.britishshorthair === undefined && userdata.cats.tom === undefined && userdata.cats.demoncat === undefined){
        userdata.cats.calico = 0;
        userdata.cats.tabby = 0;
        userdata.cats.norwegianforest = 0;
        userdata.cats.britishshorthair = 0;
        userdata.cats.tom = 0;
        userdata.cats.demoncat = 0;
      }
      if(userdata.cats.killerclaws === undefined){
        userdata.cats.killerclaws = 0;
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