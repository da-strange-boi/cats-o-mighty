const Discord = require('discord.js')
exports.run = async (bot, message, args) => {
  //* Select User Data From Database
  bot.db.Suggestion.find({}, (err, res) => {
    if (err) bot.log('error', err)
    if (!res) {
      const noSuggestionsEmbed = new Discord.RichEmbed()
        .setColor(bot.config.color.red)
        .setDescription('There are no suggestions :(')
      message.channel.send(noSuggestionsEmbed)
      return
    }
    if (res) {
      const embed = new Discord.RichEmbed()
        .setTitle('**Suggestions List**')

      //* If There Are No Results
      if (res.length === 0) {
        embed.setColor(bot.config.color.red)
        embed.addField('No data found', 'No one has suggesed anything')
      } else {
        embed.setColor(bot.config.color.lightblue)
        if (res.length > 25) {
          for (let i = 0; i < 25; i++) {
            embed.addField(`${res[i].userTag} (${res[i].userID}) || #${res[i].suggestionNumber}`, `${res[i].suggestion}`)
          }
          embed.setFooter(`only 25 out of ${res.length} displayed`)
        } else {
          for (let i = 0; i < res.length; i++) {
            embed.addField(`${res[i].userTag} (${res[i].userID}) || #${res[i].suggestionNumber}`, `${res[i].suggestion}`)
          }
        }
      }
      message.channel.send(embed)
    }
  })
}

exports.help = {
  name: 'showsuggestions',
  aliases: [],
  type: 'admin'
}
