let prefix = 'cat';
exports.run = async (bot, message) => {
  if (!message.guild || message.IsPrivate || message.author.bot) return;
  let permCheck = require("../handlers/permCheck.js");
  let processCommand = require('../handlers/processCommand');
  if(message.content.startsWith(`<@${bot.user.id}>`)){
    prefix = `<@${bot.user.id}>`;
    if(message.content.trim() === `<@${bot.user.id}>`){
      message.channel.send(`**${message.author.username}**, my prefix is \`cat\` uwu`);
      return;
    }
  }
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const command = args.shift().toLowerCase(); 
  let cmd = bot.getCmd(bot, message, command, args);
  processCommand.run(bot, message, cmd, args, prefix);
  if (!cmd || permCheck(message, bot, cmd) == false) return;
  if(!message.content.trim().toLowerCase().startsWith(prefix)) return;
  try {
    cmd.run(bot, message, args)
  } catch (Error) {
    bot.log("error", Error)
  }
}