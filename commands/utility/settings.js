const Discord = require('discord.js');
const config = require('../../config.json');

let modules = ['CatGottenPopupMessage'];
let Settings = require('../../moduls/settings.js');

module.exports.run = async (bot, message, args) => {

  //USAGE cat disable [module]
  //USAGE cat disable [CatGottenPopupMessage] [true/false]

  if(!message.member.hasPermission("MANAGE_GUILD")) return;


  Settings.findOne({
    guildID: message.guild.id
  }, (err, guildSettings) => {
    if(err) console.log(err);

    //* to view the guild settings
    if(!args[0]){
      let settingsEmbed = new Discord.RichEmbed()
      .setTitle('Settings')
      .setColor(config.color.utility)
      .setDescription(`CatGottenPopupMessage: **${guildSettings.showCat}**`);
      message.channel.send(settingsEmbed);
      return;
    }
  
    for(let i=0;i<modules.length;i++){
      if(args[0] === modules[i]){
        if(!guildSettings){return;}
        if(guildSettings){
          if(args[1] !== 'true' && args[1] !== 'false'){ message.channel.send('Please enter **true** or **false**');return;}
          if(args[1] === 'true'){
            guildSettings.showCat = true;
            message.channel.send('module: CatGottenPopupMessage\nhas been set to: **true**');
          } else {guildSettings.showCat = false;message.channel.send('module: CatGottenPopupMessage\nhas been set to: **false**');}
          guildSettings.save().catch(err => console.log(err));
          return;
        }
      }
      return;
    }

  });
}

module.exports.help = {
  name: 'settings',
  aliases: []
}