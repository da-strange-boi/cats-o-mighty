/* eslint-disable no-unreachable */
//* Discord / Json Vars
const Discord = require('discord.js')
// Cooldown Vars
const cooldowncats = new Set()
const cdseconds = 300
exports.run = async (bot, message, args) => {
  // {USAGE} cat suggestion <suggestion>

  message.channel.send('This command will be temporary disabled due to a massive amount of suggestions')
  return

  //* Select User Data From Database
  bot.db.Suggestion.findOne({}, async (err, userSuggestion) => {
    if (err) throw err

    //* Check To See If User Entered A Suggestion
    if (!args[0]) {
      await message.channel.send(`<@${message.author.id}> you need to enter a suggestion\n` + '```cat help suggest``` check the help for more info')
      return
    }

    //* If User Already Has A Cooldown Tell Them To Wait
    if (cooldowncats.has(message.author.id)) {
      const cooldownEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription('You gotta wait 5 minutes before adding another suggestion to avoid spam\nif you abuse this command you will be banned from the bot for a day')
        .setColor(bot.config.color.red)
      await message.channel.send(cooldownEmbed).then(msg => msg.delete(300000))
      return
    }
    cooldowncats.add(message.author.id)

    //* Get The Suggestion And Add It To The Database
    const suggestion = args.join(' ')
    const numRand = Math.floor(Math.random() * 100000)
    const newSuggestion = new Suggestion({
      userID: message.author.id, userTag: message.author.tag, suggestionNumber: numRand, suggestion: suggestion
    })
    newSuggestion.save().catch(err => console.log(err))

    const suggestionEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription('Thanks so much for the suggestion!!\nI\'ll take it into consideration and possibly add it to the bot')
      .setColor(bot.config.color.blue)
    await message.channel.send(suggestionEmbed)

    //* Delete The Cooldown When Time Is Up // Resetting It
    setTimeout(() => {
      cooldowncats.delete(message.author.id)
    }, cdseconds * 1000)
  })
}

exports.help = {
  name: 'suggest',
  aliases: [],
  type: 'normal'
}
