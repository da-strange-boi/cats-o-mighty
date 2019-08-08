const Discord = require("discord.js");
const ms = require('parse-ms');
const config = require('../../config.json');
const Userdata = require("../../moduls/userdata.js");
let cooldown = {};

module.exports.run = async (bot, message, args) => {

  //USAGE cat daily

  /* the system works by checking your daily streak (does not reset if you miss a day)
     If your streak is below a 7 (under a week) then you get common rewards
     If your streak is above a 7 (over a week) then you get special rewards
  */

  //* Set A Cooldown
  if(cooldown[message.author.id] && cooldown[message.author.id > 0]){
    let time = ms(Date.now() - cooldown[message.author.id]);
    message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)));
    return;
  }
  cooldown[message.author.id] = Date.now();

  const displayEmbed = async (amtMoney, dailyStreak, catName, note) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Daily`, message.author.displayAvatarURL)
    .setColor(config.color.cats)
    .setFooter('after 7 days you\'ll get better rewards')
    .addField(':star2: Streak', `${dailyStreak}`);
    if(note){
      embed.setDescription(note);
    }
    if(amtMoney){
      embed.addField(`:moneybag: Collected Money`, `$${amtMoney}`)
    }
    if(catName){
      embed.addField(`Random stray cat you found`, `${catName}`)
    }
    await message.channel.send(embed);
  }

  Userdata.findOne({
    userID: message.author.id
  }, async (err, userdata) => {
    if(err) console.log(err);

    let timeout = 86400000; //* 24 hours (86400000)
    let resetTime = 7200000; //* 48 hours (7200000)
    daily = userdata.times.dailyTime;

    if(daily !== null && timeout - (Date.now() - daily) > 0){
      let time = ms(timeout - (Date.now() - daily));

      let embed = new Discord.RichEmbed()
      .setAuthor(`Daily`, message.author.displayAvatarURL)
      .setColor(config.color.cats)
      .setFooter('after 7 days you\'ll get better rewards')
      .setDescription(`You have to wait **${time.hours}h ${time.minutes}m ${time.seconds}s** until next daily`)
      .addField(':star2: Streak', `${userdata.stats.dailyStreak}`);
      await message.channel.send(embed);
    } else if((Date.now() - daily) > resetTime) {
      userdata.times.dailyTime = Date.now();
      userdata.stats.dailyStreak = 1;
      userdata.money.catmoney += 350;
      displayEmbed('300', '1', 'smokey', 'your streak has restarted')
      userdata.save().catch(err => console.log(err));
    } else {

      userdata.times.dailyTime = Date.now();
      userdata.stats.dailyStreak += 1;

      //* If User Has Under A 7 Day Daily Streak
      if(userdata.stats.dailyStreak < 7){

        let catName;let amtMoney;

        let specialCatAmt = Math.floor(Math.random() * 6) + 1;
        let specialBaseAmt = Math.floor(Math.random() * 6) + 1;

        if(specialCatAmt === specialBaseAmt){
                  
          //* Set Vars For Special Cats
          let animales = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy'];
          let aResult = Math.floor((Math.random() * animales.length));

          //* Check To See What Cat It Is Then Add It To Their Cats
          if(aResult === 0){userdata.cats.bandit += 1; catName = "bandit";}if(aResult === 1){userdata.cats.bug += 1; catName = "bug";}if(aResult === 2){userdata.cats.linda += 1; catName = "linda";}if(aResult === 3){userdata.cats.mittens += 1; catName = "mittens";}if(aResult === 4){userdata.cats.cash += 1; catName = "cash";}if(aResult === 5){userdata.cats.jackson += 1; catName = "jackson";}if(aResult === 6){userdata.cats.cottonball += 1; catName = "cottonball";}if(aResult === 7){userdata.cats.sonny += 1; catName = "sonny";}if(aResult === 8){userdata.cats.smokey += 1; catName = "smokey";}if(aResult === 9){userdata.cats.lailah += 1; catName = "lailah";}if(aResult === 10){userdata.cats.cher += 1; catName = "cher";}if(aResult === 11){userdata.cats.marvin += 1; catName = "marvin";}if(aResult === 12){userdata.cats.loki += 1; catName = "loki";}if(aResult === 13){userdata.cats.loverboy += 1; catName = "loverboy";}

        } else {
          let moneyList = [200, 250, 300, 350, 400, 500, 1000];
          let mResult = Math.floor((Math.random() * moneyList.length));

          if(mResult === 0){userdata.money.catmoney += 200; amtMoney = '200'}
          if(mResult === 1){userdata.money.catmoney += 250; amtMoney = '250'}
          if(mResult === 2){userdata.money.catmoney += 300; amtMoney = '300'}
          if(mResult === 3){userdata.money.catmoney += 350; amtMoney = '250'}
          if(mResult === 4){userdata.money.catmoney += 400; amtMoney = '400'}
          if(mResult === 5){userdata.money.catmoney += 500; amtMoney = '500'}
          if(mResult === 6){userdata.money.catmoney += 1000; amtMoney = '1,000'}

        }
        displayEmbed(amtMoney, userdata.stats.dailyStreak, catName)
      }
      //* If User Has Over A 7 Day Daily Streak
      if(userdata.stats.dailyStreak >= 7){
        let catName;let amtMoney;

        let specialCatAmt = Math.floor(Math.random() * 3) + 1;
        let specialBaseAmt = Math.floor(Math.random() * 3) + 1;

        if(specialCatAmt === specialBaseAmt){
                  
          //* Set Vars For Special Cats
          let animales = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy'];
          let aResult = Math.floor((Math.random() * animales.length));

          //* Check To See What Cat It Is Then Add It To Their Cats
          if(aResult === 0){userdata.cats.bandit += 1; catName = "bandit";}if(aResult === 1){userdata.cats.bug += 1; catName = "bug";}if(aResult === 2){userdata.cats.linda += 1; catName = "linda";}if(aResult === 3){userdata.cats.mittens += 1; catName = "mittens";}if(aResult === 4){userdata.cats.cash += 1; catName = "cash";}if(aResult === 5){userdata.cats.jackson += 1; catName = "jackson";}if(aResult === 6){userdata.cats.cottonball += 1; catName = "cottonball";}if(aResult === 7){userdata.cats.sonny += 1; catName = "sonny";}if(aResult === 8){userdata.cats.smokey += 1; catName = "smokey";}if(aResult === 9){userdata.cats.lailah += 1; catName = "lailah";}if(aResult === 10){userdata.cats.cher += 1; catName = "cher";}if(aResult === 11){userdata.cats.marvin += 1; catName = "marvin";}if(aResult === 12){userdata.cats.loki += 1; catName = "loki";}if(aResult === 13){userdata.cats.loverboy += 1; catName = "loverboy";}
          
        }
        let moneyList = [400, 500, 1000, 1500, 2000];
        let mResult = Math.floor((Math.random() * moneyList.length));

        if(mResult === 0){userdata.money.catmoney += 400; amtMoney = '400'}
        if(mResult === 1){userdata.money.catmoney += 500; amtMoney = '500'}
        if(mResult === 2){userdata.money.catmoney += 1000; amtMoney = '1,000'}
        if(mResult === 3){userdata.money.catmoney += 1500; amtMoney = '1,500'}
        if(mResult === 4){userdata.money.catmoney += 2000; amtMoney = '2,000'}
        displayEmbed(amtMoney, userdata.stats.dailyStreak, catName)
      }
    userdata.save().catch(err => console.log(err));
    }
  });
  //* Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id];
  }, 3500);
}

module.exports.help = {
	name: "daily",
  aliases: []
}