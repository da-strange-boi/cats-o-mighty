const Userdata = require("../moduls/userdata.js");
const Guildsettings = require('../moduls/guildsettings.js');
const config = require("../config.json");

bot.on("message", async message => {

  let prefix = config.prefix;
  //* Make Sure The Prefix Is Used
  if(!message.content.trim().toLowerCase().startsWith(prefix)) return;

  //* Checks To See If Another Bot Sent A Message Or If A User Trys To DM The Bot && Make Sure It Doesn't Respond
  if (message.author.bot || message.channel.type === "dm"){
    return;
  };

  if(cmd === `start`){
    //* If The User Is A New Cat Collector And Runs 'cat start'
    Userdata.findOne({userID: message.author.id}, (err, userdata) => {
      if(err) throw err;
      Guildsettings.findOne({guildID: message.guild.id}, (err, settings) => {
        if(err) throw err;
        if(userdata){
          message.channel.send(`<@${message.author.id}> no need, you're already a cat collector!`);
          return;
        }
        if(!userdata){
          let date = Date.now();
          const newUserData = new Userdata({
            userID: message.author.id,
            userTag: message.author.tag,
            cats: {siamese: 0,burmese: 0,ragdoll: 0,persian: 0,mainecoon: 0,russianblue: 0,abyssinian: 0,manx: 0,sphynx: 0,cyprus: 0,foldex: 0,turkishangora: 0,korat: 0,singapura: 0,tonkinese: 0,peterbald: 0,chartreux: 0,munchkin: 0,bandit: 0,bug: 0,linda: 0,mittens: 0,cash: 0,jackson: 0,cottonball: 0,sonny: 0,smokey: 0,lailah: 0,cher: 0,marvin: 0,loki: 0,loverboy: 0,squirtlett: 0,cursedcat: 0,uwu: 0},
            money: {catmoney: 0},
            times: {dailyTime: 0,voteTime: 0,usedBotLast: date},
            stats: {catsSold: 0,saidCat: 1,dailyStreak: 0}
          })
          newUserData.save().catch(err => console.log(err));

          if(!settings){
            const newGuildSettings = new Guildsettings({
              guildID: message.guild.id,CatGottenPopupMessage: true
            });
            newGuildSettings.save().catch(err => console.log(err));
          }

          let newUserEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.utility).setDescription("Welcome new cat collector!\nto get started do `cat help` to get the list of commands");
          message.channel.send(newUserEmbed);
          return;
        }
      });
    });
  }

  //* If The User Is A New User, Types 'cat {anything}' Send Them A Message Telling Them To Do 'cat start'
  Userdata.findOne({
    userID: message.author.id
  }, (err, userdata) => {
    if(err) console.log(err);
    if(!userdata){
      if(cmd != "start"){
        let newPersonEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.utility).setDescription("hmm it looks like you're a new cat collector!!\nDo `cat start` to start collecting cats");
        message.channel.send(newPersonEmbed);
        return;
      }
    }

    //* Main Code For Running The Commands

    if(userdata){
      //* Don't Show 'level messages' In (DBL && DBGG && BFD) As It Is Agaest The Rules
      if(message.guild.id != "264445053596991498" && message.guild.id != "110373943822540800" && message.guild.id != "374071874222686211"){
        require("../utils/getCats.js");
        require("../utils/checkCats.js");
      }

      //* Logging stuff
      userdata.stats.saidCat += 1;
      userdata.save().catch(err => console.log(err));

    }
  });
});