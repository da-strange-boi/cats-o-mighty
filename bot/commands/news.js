const { RichEmbed } = require('discord.js')
exports.run = async (bot, message) => {
  const newsEmbed = new RichEmbed()
    .setTitle(':warning: Important :warning:')
    .setDescription(`da strange boi & benluelo (the developers of \`${bot.user.username}\`) have made the decision to shutdown the bot in a couple of days.\nWe left some fun things for you all :wink:\n\nWe love you all and thank you so much for using our bot!\n\nFor more infomation join our [support server](https://discord.gg/p4JEEuD)`)
    .setColor(bot.config.color.orangered)

  message.channel.send(newsEmbed)

}

exports.help = {
  name: 'news',
  aliases: [],
  type: 'normal'
}
