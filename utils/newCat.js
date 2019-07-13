const Cat = require("../moduls/cats.js");
const Money = require("../moduls/money.js");
const Daily = require("../moduls/daily.js");

const config = require("../config.json");

bot.on("message", async message => {

  //* Checks To See If Another Bot Sent A Message Or If A User Trys To DM The Bot && Make Sure It Doesn't Respond
  if (message.author.bot || message.channel.type === "dm"){
    return;
  };

  if(cmd === `start`){
    //* If The User Is A New Cat Collector And Runs 'cat start'
    Cat.findOne({userID: message.author.id}, (err, catList) => {if(err) console.log(err);
      if(catList){
        message.channel.send(`<@${message.author.id}> no need, you're already a cat collector!`);
      }
      if(!catList){
        const newCat = new Cat({
          userID: message.author.id,siamese: 0,burmese: 0,ragdoll: 0,persian: 0,maineCoon: 0,abyssinian: 0,manx: 0,sphynx: 0,cyprus: 0,foldex: 0,turkishAngora: 0,korat: 0,singapura: 0,tonkinese: 0,peterbald: 0,chartreux: 0,bandit: 0,bug: 0,linda: 0,mittens: 0,cash: 0,jackson: 0,cottonball: 0,sonny: 0,smokey: 0,lailah: 0,cher: 0,marvin: 0,squirtlett: 0,cursedcat: 0
        })
        newCat.save().catch(err => console.log(err));
      }
    });
    Money.findOne({userID: message.author.id}, (err, userMoney) => {if(err) console.log(err);
      if(!userMoney){
        const newMoney = new Money({
          placeholder: "global",userID: message.author.id,userUsername: message.author.username,money: 0
        })
        newMoney.save().catch(err => console.log(err));
      }
    });
    Daily.findOne({ userID: message.author.id }, (err, userDaily) => {if(err) console.log(err);
      if(!userDaily){
        const newDaily = new Daily({
          userID: message.author.id,daily: " ",dailyStreak:0,vote: " "
        })
        newDaily.save().catch(err => console.log(err));
      }
    });
    let newUserEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.utility).setDescription("Welcome new cat collector!\nto get started do `cat help` to get the list of commands");
    message.channel.send(newUserEmbed);
    return;
  }
});