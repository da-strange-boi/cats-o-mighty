const Discord = require('discord.js');
exports.run = async (bot, guild) => {
  let catsomighty = bot.guilds.find(search => search.id === process.env.COM_GUILD_ID);
  let logChannel = catsomighty.channels.find(search => search.name === 'bot-server-data');
  if(!logChannel) return console.log("Can't find incidents channel.");

  let date = new Date();
  let guildDeleteEmbed = new Discord.RichEmbed()
  .setDescription(`**• Guild:** \`${guild.name}\`\n**• Members:** \`${guild.memberCount}\`\n**• Owner:** \`${guild.owner.user.tag}\`\n**• Region:** \`${guild.region}\``)
  .setFooter(`${bot.guilds.size} guilds`)
  .setColor(bot.config.color.error)
  .setTimestamp(date);
  if(guild.iconURL != null){
    guildDeleteEmbed.setThumbnail(guild.iconURL)
  }
  if(guild.large === true){
    guildDeleteEmbed.setTitle(':outbox_tray: Removed Guild - **large**');
  } else {guildDeleteEmbed.setTitle(':outbox_tray: Removed Guild');}
  if(guild.verified === true){
    guildDeleteEmbed.addField('Verified', 'i dont know how to make this look good :p')
  }

  logChannel.send(guildDeleteEmbed);
}