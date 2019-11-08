/* eslint-disable no-new */
const Discord = require('discord.js')
const CronJob = require('cron').CronJob
const fs = require('fs')
const bot = new Discord.Client({
  fetchAllMembers: false,
  disableEveryone: true,
  disabledEvents: [
    'GUILD_MEMBER_ADD',
    'GUILD_MEMBER_REMOVE',
    'GUILD_MEMBER_UPDATE',
    'GUILD_MEMBERS_CHUNK',
    'GUILD_INTEGRATIONS_UPDATE',
    'GUILD_ROLE_CREATE',
    'GUILD_ROLE_DELETE',
    'GUILD_ROLE_UPDATE',
    'GUILD_BAN_ADD',
    'GUILD_BAN_REMOVE',
    'CHANNEL_CREATE',
    'CHANNEL_DELETE',
    'CHANNEL_UPDATE',
    'CHANNEL_PINS_UPDATE',
    'MESSAGE_DELETE',
    'MESSAGE_UPDATE',
    'MESSAGE_DELETE_BULK',
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
    'MESSAGE_REACTION_REMOVE_ALL',
    'USER_UPDATE',
    'USER_NOTE_UPDATE',
    'USER_SETTINGS_UPDATE',
    'PRESENCE_UPDATE',
    'VOICE_STATE_UPDATE',
    'TYPING_START',
    'VOICE_SERVER_UPDATE',
    'RELATIONSHIP_ADD',
    'RELATIONSHIP_REMOVE'
  ],
  http: { api: 'https://discordapp.com/api', version: 7 }
})
require('dotenv/config')

// adding onto the bot variable
bot.log = require('./lib/logging')
bot.config = require('./config')
// bot.database = require('./lib/database')
bot.getDate = require('./lib/getDate')
bot.getCmd = require('./handlers/getCommands')
require('./handlers/commandHandler')(bot)
bot.commands = new Discord.Collection()
bot.aliases = new Discord.Collection()

// have the bot login to discord
bot.login(process.env.TOKEN)

if (process.env.DEBUG === 'false') {
  const BFD = require('./lib/API/bfd.js')
  const DB = require('./lib/API/db.js')
  const DBGG = require('./lib/API/dbgg.js')
  const DBL = require('./lib/API/dbl.js')
  // top.gg (discordbots.org) gets declared out of the loop cause it has its own way of posting stats
  DB.run(bot)
  new CronJob('0 */45 * * * *', () => {
    BFD.run(bot)
    DBGG.run(bot)
    DBL.run(bot)
    bot.log('statsPosted', 'Stats posted to bot lists')
  }, null, true, 'America/New_York')
}

const init = async () => {
  // Load Events
  fs.readdir('./bot/events/', (err, files) => {
    if (err) bot.log('error', `Failed to load all events\n===============\n\n${err}`)
    files.forEach(file => {
      const eventFunction = require(`./events/${file}`)
      const eventName = file.split('.')[0]
      bot.on(eventName, (...args) => eventFunction.run(bot, ...args))
    })
  })
  // Load Commands
  fs.readdir('./bot/commands/', (err, files) => {
    if (err) bot.log('error', `Failed to load all commands\n===============\n\n${err}`)
    files.forEach(f => {
      if (!f.endsWith('.js')) return
      const response = bot.loadCommand(f)
      if (response) bot.log('error', response)
    })
  })
  bot.log('system', 'The bot is launching and attempting to login to discord')
}
init()
