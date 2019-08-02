let config = require("../../config.json");

//* Mongoose Vars (database)
const Userdata = require("../../moduls/userdata.js");

//* discordbots.org API Vars
const DBL = require("dblapi.js");
global.dbl = new DBL(config.auth.DBauth, { webhookPort: 5001, webhookAuth: "Pigfucker747", statsInterval: 2400000 }, bot);

//* Ready Up The Webhook
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

//* Whenever Someone Votes Run Code
dbl.webhook.on('vote', vote => {

  Userdata.findOne({
    userID: vote.user
  }, (err, userdata) => {
    if(err) throw err;

    if(!userdata){
      return;
    }

    //* If It's The Weekend Add $5,000 To Their Account
    userdata.money.catmoney += 5000;

    //* To reset their vote counter
    userdata.times.voteTime = Date.now();

    //* Add A Random Special Cat To Their Collection For Voting
    let votedUser = vote.user;

    //* Set Vars For Special Cats
    let animales = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy'];
    let result = Math.floor((Math.random() * animales.length));

    //* Check To See What Cat It Is Then Add It To Their Cats
    if(result === 0){userdata.cats.bandit += 1; catName = "bandit";}
    if(result === 1){userdata.cats.bug += 1; catName = "bug";}
    if(result === 2){userdata.cats.linda += 1; catName = "linda";}
    if(result === 3){userdata.cats.mittens += 1; catName = "mittens";}
    if(result === 4){userdata.cats.cash += 1; catName = "cash";}
    if(result === 5){userdata.cats.jackson += 1; catName = "jackson";}
    if(result === 6){userdata.cats.cottonball += 1; catName = "cottonball";}
    if(result === 7){userdata.cats.sonny += 1; catName = "sonny";}
    if(result === 8){userdata.cats.smokey += 1; catName = "smokey";}
    if(result === 9){userdata.cats.lailah += 1; catName = "lailah";}
    if(result === 10){userdata.cats.cher += 1; catName = "cher";}
    if(result === 11){userdata.cats.marvin += 1; catName = "marvin";}
    if(result === 12){userdata.cats.loki += 1; catName = "loki"}
    if(result === 13){userdata.cats.loverboy += 1; catName = "loverboy"}

    //* To send a DM to the user letting them know their rewards for voting
    if(vote.isWeekend === true){
      bot.users.get(votedUser).send(`Thank you for upvoting\nYou have caught a **${catName}** for voting!\nIt's the weekend! You get a bonus of $5,000`)
    } else {
      bot.users.get(votedUser).send(`Thank you for upvoting\nYou have caught a **${catName}** for voting!`);
    }

    //* Save value to database
    userdata.save().catch(err => console.log(err));
  });
});
