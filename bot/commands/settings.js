const Discord = require('discord.js')
const modules = ['CatGottenPopupMessage']

exports.run = async (bot, message, args) => {
  // {USAGE} cat disable [module]
  // {USAGE} cat disable [CatGottenPopupMessage] [show/hidden/disappear]

  if (!message.member.hasPermission('MANAGE_GUILD')) message.channel.send('You need to have **Manage Guild** permission to use this command')

  const guildCol = bot.database.Guildsettings

  guildCol.findOne({ guildID: message.guild.id }, async (err, settings) => {
    if (err) bot.log('error', err)
    if (!settings) { return }

    if (settings) {
      // to view the guild settings
      if (!args[0]) {
        const settingsEmbed = new Discord.RichEmbed()
          .setTitle('Settings - [uppercases matter]')
          .setColor(bot.config.color.darkblue)
          .setDescription(`CatGottenPopupMessage: **${settings.CatGottenPopupMessage}**`)
        return message.channel.send(settingsEmbed)
      }

      for (let i = 0; i < modules.length; i++) {
        if (args[0].trim() === modules[i]) {
          let userCondition
          if (args[1]) { userCondition = args[1].trim().toLowerCase() } else { userCondition = undefined }
          if (userCondition !== 'show' && userCondition !== 'hidden' && userCondition !== 'disappear') {
            return message.channel.send('Please enter **show**, **hidden**, **disappear**')
          }

          switch(userCondition){
            case('show'): guildCol.findOneAndUpdate({ guildID: message.guild.id }, {$set: {'CatGottenPopupMessage': 'show'}}); break
            case('hidden'): guildCol.findOneAndUpdate({ guildID: message.guild.id }, {$set: {'CatGottenPopupMessage': 'hidden'}}); break
            case('disappear'): guildCol.findOneAndUpdate({ guildID: message.guild.id }, {$set: {'CatGottenPopupMessage': 'disappear'}}); break
          }
          return message.channel.send(`module: CatGottenPopupMessage\nhas been set to: **${userCondition}**`)
        }
      }
    }
  })
}

exports.help = {
  name: 'settings',
  aliases: [],
  type: 'normal'
}
