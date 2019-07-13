const Discord = require("discord.js");
let config = require("../config.json");

//* Mongoose Vars (database)
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
  useNewUrlParser: true
});
const Cat = require("../moduls/cats.js");
const Money = require("../moduls/money.js");
const Daily = require("../moduls/daily.js");

//* discordbots.org API Vars
const DBL = require("dblapi.js");
global.dbl = new DBL(config.DBLtoken, { webhookPort: 5001, webhookAuth: "Pigfucker747", statsInterval: 2400000 }, bot);

//* Ready Up The Webhook
dbl.webhook.on('ready', hook => {
  console.log(`Webhook running at http://${hook.hostname}:${hook.port}${hook.path}`);
});

//* Whenever Someone Votes Run Code
dbl.webhook.on('vote', vote => {

  //* If It's The Weekend Add $4,500 To Their Account
  if(vote.isWeekend === true){
    Money.findOne({
      userID: vote.user
    }, (err, userMoney) => {
      if(err) console.log(err);
      if(userMoney){
        userMoney.money = userMoney.money + 4500;
        userMoney.save().catch(err => console.log(err));
      }
    });
  }

  //* To reset their vote counter
  Daily.findOne({
    userID: vote.user
  }, (err, userDaily) => {
    if(err) console.log(err);

    if(!userDaily){
      const newDaily = new Daily({
        userID: vote.user, daily: '', dailyStreak: 0, vote: Date.now()
      })
      newDaily.save().catch(err => console.log(err));
    }
    if(userDaily){
      userDaily.vote = Date.now();
      userDaily.save().catch(err => console.log(err));
    }

  });

  //* Add A Random Special Cat To Their Collection For Voting
  Cat.findOne({
    userID: vote.user
  }, (err, catList) => {
    if(err) console.log(err);
    if(catList){

      userVoted = vote.user;

      //* Set Vars For Special Cats
      let animales = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin'];
      let result = Math.floor((Math.random() * animales.length));

      //* Check To See What Cat It Is Then Add It To Their Cats
      if(result === 0){catList.bandit = catList.bandit + 1; catName = "bandit";}
      if(result === 1){catList.bug = catList.bug + 1; catName = "bug";}
      if(result === 2){catList.linda = catList.linda + 1; catName = "linda";}
      if(result === 3){catList.mittens = catList.mittens + 1; catName = "mittens";}
      if(result === 4){catList.cash = catList.cash + 1; catName = "cash";}
      if(result === 5){catList.jackson = catList.jackson + 1; catName = "jackson";}
      if(result === 6){catList.cottonball = catList.cottonball + 1; catName = "cottonball";}
      if(result === 7){catList.sonny = catList.sonny + 1; catName = "sonny";}
      if(result === 8){catList.smokey = catList.smokey + 1; catName = "smokey";}
      if(result === 9){catList.lailah = catList.lailah + 1; catName = "lailah";}
      if(result === 10){catList.cher = catList.cher + 1; catName = "cher";}
      if(result === 11){catList.marvin = catList.marvin + 1; catName = "marvin";}

      //* To send a DM to the user letting them know their rewards for voting
      if(vote.isWeekend === true){
        bot.users.get(vote.user).send(`Thank you for upvoting\nYou have caught a **${catName}** for voting!\nIt's the weekend! You get a bonus of $4,500`)
      } else {
        bot.users.get(vote.user).send(`Thank you for upvoting\nYou have caught a **${catName}** for voting!`);
      }
    
    }
    catList.save().catch(err => console.log(err));
  });
});
