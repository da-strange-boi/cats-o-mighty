const Discord = require('discord.js');
const config = require('../../config.json');

//mongoose vars
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {useNewUrlParser: true});
const Cat = require("../../moduls/cats.js");
const Money = require('../../moduls/money.js');
const Daily = require('../../moduls/daily.js');

module.exports.run = async (bot, message, args) => {
  //* If someone who is not me enters this command
  if(!message.author.id === "295255543596187650" && !message.author.id === "308101246160732160"){
    return;
  }

  if(!args[0]){
    message.channel.send("Check `cat help userinfo` for correct usage");
    return;
  }

  userid = args[0];

  //* Select A User Data From The Database
  Cat.findOne({
    userID: userid
  }, (err, catList) => {
    if(err) console.log(err);

    let userinfo = new Discord.RichEmbed()
    .setColor(config.color.owner);

    // set vars of cat numbers the user has || common, uncommon, rare, special
    uSiamese = catList.siamese;uBurmese = catList.burmese;uRagdoll = catList.ragdoll;uPersian = catList.persian;uMaineCoon = catList.maineCoon;uRussianBlue = catList.russianBlue;
    uAbyssinian = catList.abyssinian;uManx = catList.manx;uSphynx = catList.sphynx;uCyprus = catList.cyprus;uFoldex = catList.foldex;
    uKorat = catList.korat;uSingapura = catList.singapura;uTonkinese = catList.tonkinese;uPeterbald = catList.peterbald;uChartreux = catList.chartreux;uMunchkin = catList.munchkin;
    uBandit = catList.bandit;uBug = catList.bug;uLinda = catList.linda;uMittens = catList.mittens;uCash = catList.cash;uJackson = catList.jackson;uCottonball = catList.cottonball;uSonny = catList.sonny;uSmokey = catList.smokey;uLailah = catList.lailah;uCher = catList.cher;uMarvin = catList.marvin;uLoki = catList.loki;uPancake = catList.pancake;
    uSquirtlett = catList.squirtlett;uCursedcat = catList.cursedcat;

    // check if user has that rank of cat and assign a var depending if they do or not
    if(uSiamese === 0 && uBurmese === 0 && uRagdoll === 0 && uPersian === 0 && uMaineCoon === 0 && uRussianBlue === 0){ commonCats = false;} else { commonCats = true;}
    if(uAbyssinian === 0 && uManx === 0 && uSphynx === 0 && uCyprus === 0 && uFoldex === 0){ uncommonCats = false;} else { uncommonCats = true;}
    if(uKorat === 0 && uSingapura === 0 && uTonkinese === 0 && uPeterbald === 0 && uChartreux === 0 && uMunchkin === 0){ rareCats = false;} else { rareCats = true;}
    if(uBandit === 0 && uBug === 0 && uLinda === 0 && uMittens === 0 && uCash === 0 && uJackson === 0 && uCottonball === 0 && uSonny === 0 && uSmokey === 0 && uLailah === 0 && uCher === 0 && uMarvin === 0 && uLoki === 0 && uPancake === 0){ specialCats = false;} else { specialCats = true;}
    if(uSquirtlett === 0 && uCursedcat === 0){ impossibleCats = false } else { impossibleCats = true }
    
    //* If User Owns No Common Cats (no cats) Tell Them
    if(commonCats === false && uncommonCats === false && rareCats === false && specialCats === false && impossibleCats === false){
      userinfo.addField('Cats', 'This user has no cats')
    }

    //* See What Categories Of Cats The User Has Then Add Them
    if(commonCats === true){
      userinfo.addField(":heart: Common :heart:", `Siamese: ${uSiamese}\nBurmese: ${uBurmese}\nRagdoll: ${uRagdoll}\nPersian: ${uPersian}\nMaine Coon: ${uMaineCoon}\nRussian Blue: ${uRussianBlue}`, true)
    }
    if(uncommonCats === true){
      userinfo.addField(":blue_heart: Uncommon :blue_heart:", `Abyssinian: ${uAbyssinian}\nManx: ${uManx}\nSphynx: ${uSphynx}\nCyprus: ${uCyprus}\nFoldex: ${uFoldex}`, true)
    }
    if(rareCats === true){
      userinfo.addField(":yellow_heart: Rare :yellow_heart:", `Korat: ${uKorat}\nSingapura: ${uSingapura}\nTonkinese: ${uTonkinese}\nPeterbald: ${uPeterbald}\nChartreux: ${uChartreux}\nMunchkin: ${uMunchkin}`, true)
    }
    if(specialCats === true){
      userinfo.addField(":sparkling_heart: Special :sparkling_heart:", `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nPancake: ${uPancake}`, true);
    }
    if(impossibleCats === true){
      userinfo.addField(":gem: Impossible :gem:", `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}`, true)
    }
    
    Money.findOne({
      userID: userid
    }, (err, userMoney) => {
      if(err) console.log(err);
      if(userMoney){
        userinfo.setTitle(`User Data - ${userMoney.userUsername} (${userMoney.userID})`);
        let uMoney = userMoney.money;
        function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {try {decimalCount = Math.abs(decimalCount);decimalCount = isNaN(decimalCount) ? 2 : decimalCount;const negativeSign = amount < 0 ? "-" : "";let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();let j = (i.length > 3) ? i.length % 3 : 0;return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");} catch (e) {console.log(e)}};
        userinfo.addField('User Money', `**$${formatMoney(uMoney)}**`);
      }
      if(!userMoney){
        userinfo.addField('User Money', `*user does not have money*`);
      }

      Daily.findOne({
        userID: userid
      }, (err, userDaily) => {
        if(err) console.log(err);
        if(userDaily){
          uDaily = userDaily.dailyStreak
          userinfo.addField('User Daily', `${uDaily}`);
        }
        if(!userDaily){
          userinfo.addField('User Daily', `*user does not have dailies*`);
        }
        message.channel.send(userinfo);
      });
    });
  });
}

module.exports.help = {
  name: 'userinfo',
  aliases: []
}