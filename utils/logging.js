const fs = require('fs');

bot.on("message", async message => {

  //* Checks To See If Another Bot Sent A Message Or If A User Trys To DM The Bot && Make Sure It Doesn't Respond
  if (message.author.bot || message.channel.type === "dm" || message.content === "cat checklog"){
    return;
  };

  var log = JSON.parse(fs.readFileSync('./utils/log.json', 'utf8'));

  newNum = log.messages + 1;
  newLog = {
    "time": log.time,
    "messages": newNum
  }
  fs.writeFile("./utils/log.json", JSON.stringify(newLog), (err) => { if (err) console.log(err) });
  
});