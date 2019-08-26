exports.run = (bot, message) => {

  if(!message.guild || message.IsPrivate || message.author.bot) return;

  let prefix = bot.config.prefix;
  if(message.content.startsWith(`<@${bot.user.id}>`)){
    prefix = `<@${bot.user.id}>`;
    if(message.content.trim() === `<@${bot.user.id}>`){
      message.channel.send(`**${message.author.username}**, my prefix is \`cat\` uwu`);
      return;
    }
  }

  if(message.author.id !== '295255543596187650') return;

  //* Set Vars For The Commands
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  let processCommand = require('../utils/processCommand.js');
  processCommand.run(bot, message, cmd, args, prefix);

  // Loging stuff
  bot.db.Logs.findOne({}, (err, log) => {
    if(log){
      log.botUsed += 1;
      log.save().catch(err => bot.log("warning", `Log saving error: ${err}`));
    }
    if(!log){
      let newLog = new bot.db.Logs({
        botUsed: 1
      });
      newLog.save().catch(err => bot.log("warning", `Log saving error: ${err}`));
    }
  });
}