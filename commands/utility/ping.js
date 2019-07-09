const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    //USAGE cat ping

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! :alarm_clock:\nLatency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
}

module.exports.help = {
	name: "ping",
    aliases: []
}