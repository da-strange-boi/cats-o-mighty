const Discord = require("discord.js");
const ms = require('parse-ms');
let cooldown = {};

let specialCats = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy'];

exports.run = async (bot, message, args) => {

  //USAGE cat daily

  /* the system works by checking your daily streak (does not reset if you miss a day)
     If your streak is below a 7 (under a week) then you get common rewards
     If your streak is above a 7 (over a week) then you get special rewards
  */

  //* Set A Cooldown
  if(cooldown[message.author.id] && cooldown[message.author.id] > 0){
    let time = ms(Date.now() - cooldown[message.author.id]);
    message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)));
    return;
  }
  cooldown[message.author.id] = Date.now();

  const displayEmbed = async (amtMoney, dailyStreak, catName, note) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(`Daily`, message.author.displayAvatarURL)
    .setColor(bot.config.color.cats)
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
    message.channel.send(embed);
  }

  bot.db.Userdata.findOne({
    userID: message.author.id
  }, async (err, userdata) => {
    if(err) console.log(err);

    let timeout = 86400000; //* 24 hours (86400000)
    let resetTime = 172800000; //* 48 hours (172800000)
    daily = userdata.times.dailyTime;

    if(daily !== null && timeout - (Date.now() - daily) > 0){
      let time = ms(timeout - (Date.now() - daily));

      let embed = new Discord.RichEmbed()
      .setAuthor(`Daily`, message.author.displayAvatarURL)
      .setColor(bot.config.color.cats)
      .setFooter('after 7 days you\'ll get better rewards')
      .setDescription(`You have to wait **${time.hours}h ${time.minutes}m ${time.seconds}s** until next daily`)
      .addField(':star2: Streak', `${userdata.stats.dailyStreak}`);
      message.channel.send(embed);
    } else if((Date.now() - daily) > resetTime) {
      userdata.times.dailyTime = Date.now();
      userdata.stats.dailyStreak = 1;
      
      //* Set Vars For Special Cats
      let animals = specialCats;
      let aResult = Math.floor((Math.random() * animals.length));

      //* Check To See What Cat It Is Then Add It To Their Cats
      userdata.cats[animals[aResult]] += 1;

      userdata.money.catmoney += 350;
      displayEmbed('300', '1', animals[aResult], 'your streak has restarted')
      userdata.save().catch(err => console.log(err));
    } else {

      userdata.times.dailyTime = Date.now();
      userdata.stats.dailyStreak += 1;

      //* If User Has Under A 7 Day Daily Streak
      if(userdata.stats.dailyStreak < 7){

        let catName;let amtMoney;

        let specialCatAmt = Math.floor(Math.random() * 6) + 1;
        let specialBaseAmt = Math.floor(Math.random() * 6) + 1;

        //* Set Vars For Special Cats
        let animals = specialCats;
        let aResult = Math.floor((Math.random() * animals.length));

        if(specialCatAmt === specialBaseAmt){

          //* Check To See What Cat It Is Then Add It To Their Cats
          userdata.cats[animals[aResult]] += 1;

          displayEmbed(undefined, userdata.stats.dailyStreak, animals[aResult]);

        } else {
          let moneyList = [200, 250, 300, 350, 400, 500, 1000];
          let mResult = Math.floor((Math.random() * moneyList.length));

          userdata.money.catmoney += moneyList[mResult];

          displayEmbed(moneyList[mResult], userdata.stats.dailyStreak, catName);
        }
      }
      //* If User Has Over A 7 Day Daily Streak
      if(userdata.stats.dailyStreak >= 7){
        let catName;let amtMoney;

        let specialCatAmt = Math.floor(Math.random() * 3) + 1;
        let specialBaseAmt = Math.floor(Math.random() * 3) + 1;

        //* Set Vars For Special Cats
        let animals = specialCats;
        let aResult = Math.floor((Math.random() * animals.length));

        if(specialCatAmt === specialBaseAmt){

          //* Check To See What Cat It Is Then Add It To Their Cats
          userdata.cats[animals[aResult]] += 1;
          
        }
        let moneyList = [400, 500, 1000, 1500, 2000];
        let mResult = Math.floor((Math.random() * moneyList.length));

        userdata.money.catmoney += moneyList[mResult];

        displayEmbed(moneyList[mResult], userdata.stats.dailyStreak, animals[aResult])
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