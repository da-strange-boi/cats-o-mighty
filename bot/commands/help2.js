const Discord = require('discord.js')
const helpJSON = require('./help2.json').help
const HELP = {}

for (const key in helpJSON) {
  const h = key.split(',')

  for (const i in h) {
    HELP[h[i]] = helpJSON[key]
  }
}
exports.run = async (bot, message, args) => {
  // if no argument(s) given
  if (!args[0]) {
    message.channel.send('**`[HELP COMMAND FILLER]`**')
  } else {

    const hCmd = HELP[args[0]]

    if (hCmd !== undefined) {
      const embed = new Discord.RichEmbed()
        .setTitle(hCmd.description)
        .setAuthor('Cats o\' Mighty Help', bot.user.avatarURL)
        .setTimestamp()
        .setFooter('Made by da strange boi#7087')
        .addField('**Usage**', `${hCmd.usage}`)
        .setColor(bot.config.color.blue)
      
      // get paramaters for command
      if (hCmd.parameters !== undefined) {
        let params = ''
        for (const i in hCmd.parameters) {
          params += '`' + hCmd.parameters[i][0] + '`' + '\n' + hCmd.parameters[i][1]
          if (i !== hCmd.parameters.length) {
            params += '\n'
          }
        }
        embed.addField('**Parameters**', params)
      }
      
      //get aliases for command
      if ((hCmd.aliases !== undefined) && (hCmd.aliases.length !== 0)) {
        let als = ''
        for (const i in hCmd.aliases) {
          als += '`' + hCmd.aliases[i] + '`'
          if (i !== hCmd.aliases.length) {
            als += ', '
          }
        }
        embed.addField('**Aliases**', als)
      }

      message.channel.send(embed)
    } else {
      message.channel.send('Unknown command! Maybe you misspelled it?')
    }      
  }
}

exports.help = {
  name: 'help2',
  aliases: [],
  type: 'normal'
}