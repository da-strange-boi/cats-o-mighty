const { inspect } = require('util')
exports.run = async (bot, message, args) => {
  let toEval = args.join(" ");
  let evaluated = inspect(eval(toEval, { depth: 0 }));
  try {
    if(toEval){
      let hrStart = process.hrtime();
      let hrDiff;
      hrDiff = process.hrtime(hrStart);
      return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 });
    } else {
      message.channel.send("Error whilst evaluating: `cannot evaluated air`");
    }
  } catch(e) {
    message.channel.send(`Error whilst evaluating: \`${e.message}\``);
  }
};

exports.help = {
  name: 'eval',
  aliases: [],
  type: 'admin'
};