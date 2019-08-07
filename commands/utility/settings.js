const Discord = require('discord.js');
const config = require('../../config.json');

let modules = ['CatGottenPopupMessage'];
let Guildsettings = require('../../moduls/guildsettings.js');

module.exports.run = async (bot, message, args) => {

  //USAGE cat disable [module]
  //USAGE cat disable [CatGottenPopupMessage] [show/hidden/disappear]

  if(!message.member.hasPermission("MANAGE_GUILD")) return;

  Guildsettings.findOne({
    guildID: message.guild.id
  }, async (err, guildSettings) => {
    if(err) console.log(err);
    if(!guildSettings){return;}

    if(guildSettings){
      //* to view the guild settings
      if(!args[0]){
        let settingsEmbed = new Discord.RichEmbed()
        .setTitle('Settings')
        .setColor(config.color.utility)
        .setDescription(`CatGottenPopupMessage: **${guildSettings.CatGottenPopupMessage}**`);
        await message.channel.send(settingsEmbed);
        return;
      }
      
      for(let i=0;i<modules.length;i++){
        if(args[0].trim() === modules[i]){
          if(args[1]){userCondition = args[1].trim().toLowerCase();}else{userCondition = undefined}
          if(userCondition !== 'show' && userCondition !== 'hidden' && userCondition !== 'disappear'){ 
            await message.channel.send('Please enter **show**, **hidden**, **disappear**');
            return;
          }
          if(userCondition === 'show'){
            guildSettings.CatGottenPopupMessage = 'show';
          } else if(userCondition === 'hidden'){
            guildSettings.CatGottenPopupMessage = 'hidden';
          } else if(userCondition === 'disappear'){
            guildSettings.CatGottenPopupMessage = 'disappear';
          }
          message.channel.send(`module: CatGottenPopupMessage\nhas been set to: **${userCondition}**`);
          guildSettings.save().catch(err => console.log(err));
          return;
        }
      }
    }
  });
}

module.exports.help = {
  name: 'settings',
  aliases: []
}