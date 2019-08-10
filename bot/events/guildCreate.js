const Discord = require('discord.js');
exports.run = async (bot, guild) => {
  let catsomighty = bot.guilds.find(search => search.id === process.env.COM_GUILD_ID);
  let logChannel = catsomighty.channels.find(search => search.name === 'bot-server-data');
  if(!logChannel) return console.log("Can't find incidents channel.");

  let date = new Date();
  let guildCreateEmbed = new Discord.RichEmbed()
  .setDescription(`**• Guild:** \`${guild.name}\`\n**• Members:** \`${guild.memberCount}\`\n**• Owner:** \`${guild.owner.user.tag}\`\n**• Region:** \`${guild.region}\``)
  .setFooter(`${bot.guilds.size} guilds`)
  .setColor(bot.config.color.utility)
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
}