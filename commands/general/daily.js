const Discord = require("discord.js");
const ms = require('parse-ms');

const config = require('../../config.json');

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {useNewUrlParser: true});
const Daily = require("../../moduls/daily.js");
const Cat = require("../../moduls/cats.js");
const Money = require("../../moduls/money.js");

module.exports.run = async (bot, message, args) => {

  //USAGE cat daily

  /* the system works by checking your daily streak (does not reset if you miss a day)
     If your streak is below a 7 (under a week) then you get common rewards
     If your streak is above a 7 (over a week) then you get special rewards
  */

  const displayEmbed = (amtMoney, dailyStreak, catName) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Daily`, message.author.displayAvatarURL)
    .setColor(config.color.cats)
    .setFooter('after 7 days you\'ll get better rewards || this still needs a lot of work lol')
    .addField(':star2: Streak', `${dailyStreak}`);
    if(amtMoney){
      embed.addField(`:moneybag: Collected Money`, `$${amtMoney}`)
    }
    if(catName){
      embed.addField(`Random stray cat you found`, `${catName}`)
    }
    message.channel.send(embed);
  }

  Daily.findOne({
    userID: message.author.id
  }, (err, userDaily) => {
    if(err) console.log(err);

    if(!userDaily){
      const newDaily = new Daily({
        userID: message.author.id, daily: Date.now(), dailyStreak: 0
      })
      newDaily.save().catch(err => console.log(err));

      Money.findOne({userID: message.author.id}, (err, userMoney) => {if(err) console.log(err);
        if(userMoney){
          userMoney.money = userMoney.money + 500;
          userMoney.save().catch(err => console.log(err));
        }});

      let catName;
      displayEmbed(500, 0, catName)
      return;
    }

    let timeout = 86400000; //* 24 hours
    daily = userDaily.daily;

    if(daily !== null && timeout - (Date.now() - daily) > 0){
      let time = ms(timeout - (Date.now() - daily));

      let embed = new Discord.RichEmbed()
      .setAuthor(`Daily`, message.author.displayAvatarURL)
      .setColor(config.color.cats)
      .setFooter('after 7 days you\'ll get better rewards || this still needs a lot of work lol')
      .setDescription(`You have to wait **${time.hours}h ${time.minutes}m ${time.seconds}s** until next daily`)
      .addField(':star2: Streak', `${userDaily.dailyStreak}`);
      message.channel.send(embed);
    } else {

      userDaily.daily = Date.now();
      userDaily.dailyStreak = userDaily.dailyStreak + 1;

      Cat.findOne({
        userID: message.author.id
      }, (err, catList) => {
        if(err) console.log(err);

        Money.findOne({
          userID: message.author.id
        }, (err, userMoney) => {
          if(err) console.log(err);
          if(userMoney){

            //* If User Has Under A 7 Day Daily Streak
            if(userDaily.dailyStreak < 7){

              let catName;let amtMoney;

              let specialCatAmt = Math.floor(Math.random() * 6) + 1;
              let specialBaseAmt = Math.floor(Math.random() * 6) + 1;

              if(specialCatAmt === specialBaseAmt){
                        
                //* Set Vars For Special Cats
                let animales = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin'];
                let aResult = Math.floor((Math.random() * animales.length));
    
                //* Check To See What Cat It Is Then Add It To Their Cats
                if(aResult === 0){catList.bandit = catList.bandit + 1; catName = "bandit";}if(aResult === 1){catList.bug = catList.bug + 1; catName = "bug";}if(aResult === 2){catList.linda = catList.linda + 1; catName = "linda";}if(aResult === 3){catList.mittens = catList.mittens + 1; catName = "mittens";}if(aResult === 4){catList.cash = catList.cash + 1; catName = "cash";}if(aResult === 5){catList.jackson = catList.jackson + 1; catName = "jackson";}if(aResult === 6){catList.cottonball = catList.cottonball + 1; catName = "cottonball";}if(aResult === 7){catList.sonny = catList.sonny + 1; catName = "sonny";}if(aResult === 8){catList.smokey = catList.smokey + 1; catName = "smokey";}if(aResult === 9){catList.lailah = catList.lailah + 1; catName = "lailah";}if(aResult === 10){catList.cher = catList.cher + 1; catName = "cher";}if(aResult === 11){catList.marvin = catList.marvin + 1; catName = "marvin";}
    
              } else {
                let moneyList = [200, 250, 300, 350, 400, 500, 1000];
                let mResult = Math.floor((Math.random() * moneyList.length));

                if(mResult === 0){userMoney.money = userMoney.money + 200; amtMoney = '200'}
                if(mResult === 1){userMoney.money = userMoney.money + 250; amtMoney = '250'}
                if(mResult === 2){userMoney.money = userMoney.money + 300; amtMoney = '300'}
                if(mResult === 3){userMoney.money = userMoney.money + 350; amtMoney = '250'}
                if(mResult === 4){userMoney.money = userMoney.money + 400; amtMoney = '400'}
                if(mResult === 5){userMoney.money = userMoney.money + 500; amtMoney = '500'}
                if(mResult === 6){userMoney.money = userMoney.money + 1000; amtMoney = '1,000'}

              }
              displayEmbed(amtMoney, userDaily.dailyStreak, catName)
            }
            //* If User Has Over A 7 Day Daily Streak
            if(userDaily.dailyStreak > 7){
              let catName;let amtMoney;

              let specialCatAmt = Math.floor(Math.random() * 3) + 1;
              let specialBaseAmt = Math.floor(Math.random() * 3) + 1;

              if(specialCatAmt === specialBaseAmt){
                        
                //* Set Vars For Special Cats
                let animales = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin'];
                let aResult = Math.floor((Math.random() * animales.length));
    
                //* Check To See What Cat It Is Then Add It To Their Cats
                if(aResult === 0){catList.bandit = catList.bandit + 1; catName = "bandit";}if(aResult === 1){catList.bug = catList.bug + 1; catName = "bug";}if(aResult === 2){catList.linda = catList.linda + 1; catName = "linda";}if(aResult === 3){catList.mittens = catList.mittens + 1; catName = "mittens";}if(aResult === 4){catList.cash = catList.cash + 1; catName = "cash";}if(aResult === 5){catList.jackson = catList.jackson + 1; catName = "jackson";}if(aResult === 6){catList.cottonball = catList.cottonball + 1; catName = "cottonball";}if(aResult === 7){catList.sonny = catList.sonny + 1; catName = "sonny";}if(aResult === 8){catList.smokey = catList.smokey + 1; catName = "smokey";}if(aResult === 9){catList.lailah = catList.lailah + 1; catName = "lailah";}if(aResult === 10){catList.cher = catList.cher + 1; catName = "cher";}if(aResult === 11){catList.marvin = catList.marvin + 1; catName = "marvin";}
                
              }
              let moneyList = [400, 500, 1000, 1500, 2000];
              let mResult = Math.floor((Math.random() * moneyList.length));

              if(mResult === 0){userMoney.money = userMoney.money + 400; amtMoney = '400'}
              if(mResult === 1){userMoney.money = userMoney.money + 500; amtMoney = '500'}
              if(mResult === 2){userMoney.money = userMoney.money + 1000; amtMoney = '1000'}
              if(mResult === 3){userMoney.money = userMoney.money + 1500; amtMoney = '1500'}
              if(mResult === 4){userMoney.money = userMoney.money + 2000; amtMoney = '2000'}
              displayEmbed(amtMoney, userDaily.dailyStreak, catName)
            }
          }
          userMoney.save().catch(err => console.log(err));
        });
        catList.save().catch(err => console.log(err));
      });
      userDaily.save().catch(err => console.log(err));
    }
  });
}

module.exports.help = {
	name: "daily",
  aliases: []
}