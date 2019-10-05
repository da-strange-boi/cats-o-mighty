exports.run = async (bot, message) => {
  if (!message.guild || message.IsPrivate || message.author.bot) return;

  let prefix;
  if(message.content.startsWith(`<@${bot.user.id}>`) || message.content.startsWith(`<@!${bot.user.id}>`)){
    prefix = `<@${bot.user.id}>`;
    if(message.content.trim() === `<@${bot.user.id}>`){
      return message.channel.send(`**${message.author.username}**, my prefix is \`cat\` uwu`);
    }
  } else {
    prefix = 'cat';
  }

  let permCheck = require("../handlers/permCheck.js");
  let processCommand = require('../handlers/processCommand');

  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase();

  let cmd = bot.getCmd(bot, message, command, args);
  processCommand.run(bot, message, cmd, args, prefix);
  if (!cmd || permCheck(message, bot, cmd, prefix) == false) return;
  if(!message.content.trim().toLowerCase().startsWith(prefix)) return;
  bot.db.Userdata.findOne({userID: message.author.id}, async (err, userdata) => {
    if(userdata){
      try {
        cmd.run(bot, message, args)
      } catch (Error) {
        bot.log("error", Error)
      }
    }
  });
}