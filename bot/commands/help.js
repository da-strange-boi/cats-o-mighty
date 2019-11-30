const { RichEmbed } = require('discord.js')
const HELP = {}

exports.run = async (bot, message, args) => {
  // {USAGE} cat help || cat help <command>
  
  for (const key in bot.helpCommand.help) {
    const h = key.split(',')
  
    for (const i in h) {
      HELP[h[i]] = bot.helpCommand.help[key]
    }
  }

  // if no argument(s) given
  if (!args[0]) {
    const helpEmbed = new RichEmbed()
      .setColor(bot.config.color.darkblue)
      .setTitle('List of commands')
      .setDescription('Here is all the commands!\nFor help on the commands, use `cat help {command}`')
      .addField(':cat2: General', '`chance`, `collection`, `daily`, `dex`, `feed`, `leaderboard`, `money`, `profile`, `sell`, `vote`')
      .addField(':cat: Fun', '`image`, `facts`, `owoify`')
      .addField(':gear: Utility', '`disable`, `help`, `invite`, `ping`, `settings`, `supportserver`')

    if (message.author.id === '295255543596187650' || message.author.id === '481318379907579916' || message.author.id === '552316796439494658' || message.author.id === '527729016849956874') {
      helpEmbed.addField(':beginner: Bot Admin Commands', '`userinfo`, `botinfo`')
    }
    if (message.author.id === '295255543596187650' || message.author.id === '527729016849956874') {
      helpEmbed.addField(':gem: Bot Admin Commands', '`addcat`, `addmoney`, `clearcats`, `clearmoney`, `clearstats`, `eval`, `stop`')
    }

    return message.channel.send(helpEmbed)

  } else {

    const hCmd = HELP[args[0]]

    if (hCmd !== undefined) {
      const embed = new RichEmbed()
        .setDescription(hCmd.description)
        .setAuthor('Cats o\' Mighty Help', bot.user.avatarURL)
        .setColor(bot.config.color.blue)
        .addField('**Usage**', `${hCmd.usage}`)
        .setFooter('<>  =  optional     |     {}  =  required')
        //.setTimestamp()    // maybe re-add later
      
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
          if (i < hCmd.aliases.length) {
            als += ', '
          }
        }
        embed.addField('**Aliases**', als.slice(0, -2))
      }

      message.channel.send(embed)
    } else {
      message.channel.send('Unknown command! Maybe you misspelled it?')
    }      
  }
}

exports.help = {
  name: 'help',
  aliases: [],
  type: 'normal'
}