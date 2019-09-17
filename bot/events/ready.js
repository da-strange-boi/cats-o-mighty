exports.run = async (bot) => {
  setInterval(() => {
		bot.user.setActivity(`with cattos on ${bot.guilds.size} servers | do 'cat help' for help`, { type: "PLAYING"} );
  }, 600000); // 10 min
  if(process.env.DEBUG === 'false'){
    let BFD = require('../lib/API/bfd.js'), DB = require('../lib/API/db.js'), DBGG = require('../lib/API/dbgg.js'), DBL = require('../lib/API/dbl.js');
    DB.run(bot);
    setInterval(() => {
      BFD.run(bot);
      DBGG.run(bot);
      DBL.run(bot);
      bot.log('system', 'Bot stats posted');
    }, 2400000); // 40 mins
  }
  bot.log(`system`, `${bot.user.username} is online!`);
}