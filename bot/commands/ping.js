exports.run = async (bot, message) => {
  // {USAGE} cat ping

  const m = await message.channel.send('Ping?')
  m.edit(`Pong! :alarm_clock:\nLatency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`)
}
exports.help = {
  name: 'ping',
  aliases: ['pong'],
  type: 'normal'
}
