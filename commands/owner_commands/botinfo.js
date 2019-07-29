const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {

	//USAGE cat botinfo

	if(message.author.id != "295255543596187650"){ return; }

	function msToTime(ms) {
    days = Math.floor((ms / 86400000)), // 1 Day = 86400000 Milliseconds
    hours = Math.floor((ms % 86400000) / 3600000), // 1 Hour = 3600000 Milliseconds
    minutes = Math.floor((ms % 3600000) / 60000), // 1 Minutes = 60000 Milliseconds
    seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
      return {
        days : days,
        hours : hours,
        minutes : minutes,
        seconds : seconds,
    };
  }

	let bIcon = bot.user.displayAvatarURL;
	let date = msToTime(bot.uptime);

	let botEmbed = new Discord.RichEmbed()
	.setAuthor(bot.user.username, bot.user.avatarURL)
	.setColor(config.color.utility)
	.setThumbnail(bIcon)
	.addField(":date: Created On", bot.user.createdAt)
	.addField(":hourglass: Uptime", `${date.days} Days ${date.hours} Hours ${date.minutes} Minutes ${date.seconds} Seconds`)
	.addField(":desktop: Number of lines of code", "2,465 lines")
	.addField(":floppy_disk: Numbers of commands", "17")
	.addField(":alarm_clock: Time took to make", "86 hours");

	return message.channel.send(botEmbed);
}

module.exports.help = {
	name: "botinfo",
	aliases: []
}