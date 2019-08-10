const Discord = require("discord.js");
const updateData = require("../../utils/updateData.json");
updateNum = 0;
exports.run = async (bot, message, args) => {

  date430 = updateData.date430;
  date501 = updateData.date501;
  date502 = updateData.date502;
  date505 = updateData.date505;
  date507 = updateData.date507;
  date517 = updateData.date517;
  date519 = updateData.date519;
  date521 = updateData.date521;
  date525 = updateData.date525;
  date601 = updateData.date601;
  date607 = updateData.date607;
  date625 = updateData.date625;
  date630 = updateData.date630;
  date702 = updateData.date702;
  date709 = updateData.date709;
  date714 = updateData.date714;
  date719 = updateData.date719;
  date728 = updateData.date728;
  date802 = updateData.date802;
  date803 = updateData.date803;
  date804 = updateData.date804;

  let bicon = bot.user.displayAvatarURL;
  updateEmbed = new Discord.RichEmbed()
  .setThumbnail(bicon)
  .setColor(bot.config.color.utility)
  .setTitle(`**${bot.user.username} - 0.4.8**`);

  if(!args[0]){    
    updateEmbed.setDescription(date804);updateNum++;
    await message.channel.send(updateEmbed);return;
  }
    
  if(args[0]){
    if(args[0] === "4/30" || args[0] === "4-30" || args[0] === "430"){updateEmbed.setDescription(date430);updateNum++;}
    if(args[0] === "5/1" || args[0] === "5-1" || args[0] === "501"){updateEmbed.setDescription(date501);updateNum++;}
    if(args[0] === "5/2" || args[0] === "5-2" || args[0] === "502"){updateEmbed.setDescription(date502);updateNum++;}
    if(args[0] === "5/5" || args[0] === "5-5" || args[0] === "505"){updateEmbed.setDescription(date505);updateNum++;}
    if(args[0] === "5/7" || args[0] === "5-7" || args[0] === "507"){updateEmbed.setDescription(date507);updateNum++;}
    if(args[0] === "5/17" || args[0] === "5-17" || args[0] === "517"){updateEmbed.setDescription(date517);updateNum++;}
    if(args[0] === "5/19" || args[0] === "5-19" || args[0] === "519"){updateEmbed.setDescription(date519);updateNum++;}
    if(args[0] === "5/21" || args[0] === "5-21" || args[0] === "521"){updateEmbed.setDescription(date521);updateNum++;}
    if(args[0] === "5/25" || args[0] === "5-25" || args[0] === "525"){updateEmbed.setDescription(date521);updateNum++;}
    if(args[0] === "6/1" || args[0] === "6-1" || args[0] === "601"){updateEmbed.setDescription(date601);updateNum++;}
    if(args[0] === "6/7" || args[0] === "6-7" || args[0] === "607"){updateEmbed.setDescription(date607);updateNum++;}
    if(args[0] === "6/25" || args[0] === "6-25" || args[0] === "625"){updateEmbed.setDescription(date625);updateNum++;}
    if(args[0] === "6/30" || args[0] === "6-30" || args[0] === "630"){updateEmbed.setDescription(date630);updateNum++;}
    if(args[0] === "7/2" || args[0] === "7-2" || args[0] === "702"){updateEmbed.setDescription(date702);updateNum++;}
    if(args[0] === "7/9" || args[0] === "7-9" || args[0] === "709"){updateEmbed.setDescription(date709);updateNum++;}
    if(args[0] === "7/14" || args[0] === "7-14" || args[0] === "714"){updateEmbed.setDescription(date714);updateNum++;}
    if(args[0] === "7/19" || args[0] === "7-19" || args[0] === "719"){updateEmbed.setDescription(date719);updateNum++;}

    message.channel.send(updateEmbed);
  }
  if(updateNum === 0){message.channel.send("check `cat help updates` for how to use the command")};

}

exports.help = {
	name: "updates",
  aliases: ['update']
}