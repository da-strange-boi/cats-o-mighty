const Discord = require("discord.js");
const config = require("../../config.json");

//mongoose vars
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
  useNewUrlParser: true
});
const Cat = require("../../moduls/cats.js");

let cooldowncats = new Set();
let cdseconds = 30;

module.exports.run = async (bot, message, args) => {

  //* Select A User Data From The Database
  Cat.findOne({
    userID: message.author.id
  }, (err, catList) => {
    if(err) console.log(err);

    // set vars of cat numbers the user has || common, uncommon, rare, special
    uSiamese = catList.siamese;uBurmese = catList.burmese;uRagdoll = catList.ragdoll;uPersian = catList.persian;uMaineCoon = catList.maineCoon;uRussianBlue = catList.russianBlue;
    uAbyssinian = catList.abyssinian;uManx = catList.manx;uSphynx = catList.sphynx;uCyprus = catList.cyprus;uFoldex = catList.foldex;uTurkishAngora = catList.turkishAngora;
    uKorat = catList.korat;uSingapura = catList.singapura;uTonkinese = catList.tonkinese;uPeterbald = catList.peterbald;uChartreux = catList.chartreux;uMunchkin = catList.munchkin;
    uBandit = catList.bandit;uBug = catList.bug;uLinda = catList.linda;uMittens = catList.mittens;uCash = catList.cash;uJackson = catList.jackson;uCottonball = catList.cottonball;uSonny = catList.sonny;uSmokey = catList.smokey;uLailah = catList.lailah;uCher = catList.cher;uMarvin = catList.marvin;uLoki = catList.loki;uPancake = catList.pancake;
    uSquirtlett = catList.squirtlett;uCursedcat = catList.cursedcat;

    // check if user has that rank of cat and assign a var depending if they do or not
    if(uSiamese === 0 && uBurmese === 0 && uRagdoll === 0 && uPersian === 0 && uMaineCoon === 0 && uRussianBlue === 0){ commonCats = false;} else { commonCats = true;}
    if(uAbyssinian === 0 && uManx === 0 && uSphynx === 0 && uCyprus === 0 && uFoldex === 0 && uTurkishAngora === 0){ uncommonCats = false;} else { uncommonCats = true;}
    if(uKorat === 0 && uSingapura === 0 && uTonkinese === 0 && uPeterbald === 0 && uChartreux === 0 && uMunchkin === 0 && uLoki === 0 && uPancake === 0){ rareCats = false;} else { rareCats = true;}
    if(uBandit === 0 && uBug === 0 && uLinda === 0 && uMittens === 0 && uCash === 0 && uJackson === 0 && uCottonball === 0 && uSonny === 0 && uSmokey === 0 && uLailah === 0 && uCher === 0 && uMarvin === 0 && uLoki === 0 && uPancake === 0){ specialCats = false;} else { specialCats = true;}
    if(uSquirtlett === 0 && uCursedcat === 0){ impossibleCats = false } else { impossibleCats = true }
    
    //* If User Owns No Common Cats (no cats) Tell Them
    if(commonCats === false && uncommonCats === false && rareCats === false && specialCats === false && impossibleCats === false){
      let noCatsEmbed = new Discord.RichEmbed()
      .setColor(config.color.error)
      .setDescription("Sorry " + message.author.username + " you dont have any cats :(");
      message.channel.send(noCatsEmbed);
      return;
    }

    //USAGE cat collection
    if(!args[0]){

      //* Set A Cooldown
      if(cooldowncats.has(message.author.id)){
        let cooldownEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`You gotta wait 30 seconds before looking at your full cat collection again\nyou can do \`cat collection common\` to look at your cats`)
        .setColor(config.color.error);
        message.channel.send(cooldownEmbed).then(msg => msg.delete(30000));
        return;
        }
        cooldowncats.add(message.author.id);

        //* Make Embed To Display The Cats The User Has
        let catsEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username + " cat collection!")
        .setColor(config.color.cats);

        //* See What Categories Of Cats The User Has Then Add Them
        if(commonCats === true){
          catsEmbed.addField(":heart: Common :heart:", `Siamese: ${uSiamese}\nBurmese: ${uBurmese}\nRagdoll: ${uRagdoll}\nPersian: ${uPersian}\nMaine Coon: ${uMaineCoon}\nRussian Blue: ${uRussianBlue}`, true);
        }
        if(uncommonCats === true){
          catsEmbed.addField(":blue_heart: Uncommon :blue_heart:", `Abyssinian: ${uAbyssinian}\nManx: ${uManx}\nSphynx: ${uSphynx}\nCyprus: ${uCyprus}\nFoldex: ${uFoldex}\nTurkish Angora: ${uTurkishAngora}`, true);
        }
        if(rareCats === true){
          catsEmbed.addField(":yellow_heart: Rare :yellow_heart:", `Korat: ${uKorat}\nSingapura: ${uSingapura}\nTonkinese: ${uTonkinese}\nPeterbald: ${uPeterbald}\nChartreux: ${uChartreux}\nMunchkin: ${uMunchkin}`, true);
        }
        if(specialCats === true){
          catsEmbed.addField(":sparkling_heart: Special :sparkling_heart:", `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nPancake: ${uPancake}`, true);
        }
        if(impossibleCats === true){
          catsEmbed.addField(":gem: Impossible :gem:", `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}`, true);
        }
        message.channel.send(catsEmbed);

        //* Delete The Cooldown // Resetting It
        setTimeout(() => {
          cooldowncats.delete(message.author.id)
        }, cdseconds * 1000)
    }

    //USAGE cat collection {common|uncommon|rare|special|impossible}
    if(args[0]) {
      let catType = args[0].toLowerCase().trim();
      let allCatType = ['common', 'uncommon', 'rare', 'special', 'impossible'];
  
      for(let i=0; i < allCatType.length; i++){
        
        if(allCatType[i] === 'common'){if(commonCats === false){message.channel.send(`<@${message.author.id}> you don't have any common cats to look at! sad uwu`); return; }}
        if(allCatType[i] === 'uncommon'){if(uncommonCats === false){ message.channel.send(`<@${message.author.id}> you don't have any uncommon cats to look at! sad uwu`); return; }}
        if(allCatType[i] === 'rare'){if(rareCats === false){ message.channel.send(`<@${message.author.id}> you don't have any rare cats to look at! sad uwu`); return; }}
        if(allCatType[i] === 'special'){if(specialCats === false){ message.channel.send(`<@${message.author.id}> you don't have any special cats to look at! sad uwu`); return; }}
        if(allCatType[i] === 'impossible'){if(impossibleCats === false){message.channel.send(`<@${message.author.id}> you don't have any impossible cats to look at! sad uwu`); return; }}
        
        if(catType === allCatType[i]){
          let catsEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username + `'s ${allCatType[i]} cat collection!`)
          .setColor(config.color.cats);
          if(allCatType[i] === "common"){
            catsEmbed.addField(":heart: Common :heart:", `Siamese: ${uSiamese}\nBurmese: ${uBurmese}\nRagdoll: ${uRagdoll}\nPersian: ${uPersian}\nMaine Coon: ${uMaineCoon}\nRussian Blue: ${uRussianBlue}`, true);
          }
          if(allCatType[i] === "uncommon"){
            catsEmbed.addField(":blue_heart: Uncommon :blue_heart:", `Abyssiniam: ${uAbyssinian}\nManx: ${uManx}\nSphynx: ${uSphynx}\nCyprus: ${uCyprus}\nFoldex: ${uFoldex}\nTurkish Angora: ${uTurkishAngora}`, true);
          }
          if(allCatType[i] === "rare"){
            catsEmbed.addField(":yellow_heart: Rare :yellow_heart:", `Korat: ${uKorat}\nSingapura: ${uSingapura}\nTonkinese: ${uTonkinese}\nPeterbald: ${uPeterbald}\nChartreux: ${uChartreux}\nMunchkin: ${uMunchkin}`, true);
          }
          if(allCatType[i] === "special"){
            catsEmbed.addField(":sparkling_heart: Special :sparkling_heart:", `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nPancake: ${uPancake}`, true);
          }
          if(allCatType[i] === "impossible"){
            catsEmbed.addField(":gem: Impossible :gem:", `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}`, true);
          }
          message.channel.send(catsEmbed);
          return;
        }
      }
    }
  });
}

module.exports.help = {
  name: "collection",
  aliases: ['cattos', 'c']
}