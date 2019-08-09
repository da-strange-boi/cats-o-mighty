const Discord = require("discord.js");
const ms = require('parse-ms');
const config = require("../../config.json");
const Userdata = require("../../moduls/userdata.js");
let cooldown = {};

module.exports.run = async (bot, message, args) => {

  //* Select A User Data From The Database
  Userdata.findOne({
    userID: message.author.id
  }, async (err, userdata) => {
    if(err) console.log(err);

    // set vars of cat numbers the user has || common, uncommon, rare, special
    uSiamese = userdata.cats.siamese;uBurmese = userdata.cats.burmese;uRagdoll = userdata.cats.ragdoll;uPersian = userdata.cats.persian;uMaineCoon = userdata.cats.mainecoon;uRussianBlue = userdata.cats.russianblue;
    uAbyssinian = userdata.cats.abyssinian;uManx = userdata.cats.manx;uSphynx = userdata.cats.sphynx;uCyprus = userdata.cats.cyprus;uFoldex = userdata.cats.foldex;uTurkishAngora = userdata.cats.turkishangora;
    uKorat = userdata.cats.korat;uSingapura = userdata.cats.singapura;uTonkinese = userdata.cats.tonkinese;uPeterbald = userdata.cats.peterbald;uChartreux = userdata.cats.chartreux;uMunchkin = userdata.cats.munchkin;
    uBandit = userdata.cats.bandit;uBug = userdata.cats.bug;uLinda = userdata.cats.linda;uMittens = userdata.cats.mittens;uCash = userdata.cats.cash;uJackson = userdata.cats.jackson;uCottonball = userdata.cats.cottonball;uSonny = userdata.cats.sonny;uSmokey = userdata.cats.smokey;uLailah = userdata.cats.lailah;uCher = userdata.cats.cher;uMarvin = userdata.cats.marvin;uLoki = userdata.cats.loki;uLoverboy = userdata.cats.loverboy;
    uSquirtlett = userdata.cats.squirtlett;uCursedcat = userdata.cats.cursedcat;uUWU = userdata.cats.uwu;

    // check if user has that rank of cat and assign a var depending if they do or not
    if(uSiamese === 0 && uBurmese === 0 && uRagdoll === 0 && uPersian === 0 && uMaineCoon === 0 && uRussianBlue === 0){ commonCats = false;} else { commonCats = true;}
    if(uAbyssinian === 0 && uManx === 0 && uSphynx === 0 && uCyprus === 0 && uFoldex === 0 && uTurkishAngora === 0){ uncommonCats = false;} else { uncommonCats = true;}
    if(uKorat === 0 && uSingapura === 0 && uTonkinese === 0 && uPeterbald === 0 && uChartreux === 0 && uMunchkin === 0){ rareCats = false;} else { rareCats = true;}
    if(uBandit === 0 && uBug === 0 && uLinda === 0 && uMittens === 0 && uCash === 0 && uJackson === 0 && uCottonball === 0 && uSonny === 0 && uSmokey === 0 && uLailah === 0 && uCher === 0 && uMarvin === 0 && uLoki === 0 && uLoverboy === 0){ specialCats = false;} else { specialCats = true;}
    if(uSquirtlett === 0 && uCursedcat === 0 && uUWU === 0){ impossibleCats = false } else { impossibleCats = true }
    
    //* If User Owns No Common Cats (no cats) Tell Them
    if(commonCats === false && uncommonCats === false && rareCats === false && specialCats === false && impossibleCats === false){
      let noCatsEmbed = new Discord.RichEmbed()
      .setColor(config.color.error)
      .setDescription("Sorry " + message.author.username + " you dont have any cats :(");
      await message.channel.send(noCatsEmbed);
      return;
    }

    //USAGE cat collection
    if(!args[0]){

      //* Set A Cooldown
      if(cooldown[message.author.id] && cooldown[message.author.id > 0]){
        let time = ms(Date.now() - cooldown[message.author.id]);
        await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${30 - time.seconds}s**`).then(msg => msg.delete(1000 * (30 - time.seconds)));
        return;
      }
      cooldown[message.author.id] = Date.now();

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
        catsEmbed.addField(":sparkling_heart: Special :sparkling_heart:", `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nLoverboy: ${uLoverboy}`, true);
      }
      if(impossibleCats === true){
        catsEmbed.addField(":gem: Impossible :gem:", `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}\nUWU: ${uUWU}`, true);
      }
      message.channel.send(catsEmbed);

      console.log(cooldown);

      //* Delete The Cooldown // Resetting It
      setTimeout(() => {
        delete cooldown[message.author.id];
      }, 30000);
    }

    //USAGE cat collection {common|uncommon|rare|special|impossible}
    if(args[0]) {
      let catType = args[0].toLowerCase().trim();
      let allCatType = ['common', 'uncommon', 'rare', 'special', 'impossible'];
  
      for(let i=0; i < allCatType.length; i++){
        
        if(allCatType[i] === catType){if(commonCats === false && catType === 'common'){message.channel.send(`<@${message.author.id}> you don't have any common cats to look at! sad uwu`);return;}}
        if(allCatType[i] === catType){if(uncommonCats === false && catType === 'uncommon'){message.channel.send(`<@${message.author.id}> you don't have any uncommon cats to look at! sad uwu`);return;}}
        if(allCatType[i] === catType){if(rareCats === false && catType === 'rare'){message.channel.send(`<@${message.author.id}> you don't have any rare cats to look at! sad uwu`);return;}}
        if(allCatType[i] === catType){if(specialCats === false && catType === 'special'){message.channel.send(`<@${message.author.id}> you don't have any special cats to look at! sad uwu`);return;}}
        if(allCatType[i] === catType){if(impossibleCats === false && catType === 'impossible'){message.channel.send(`<@${message.author.id}> you don't have any impossible cats to look at! sad uwu`);return;}}
        
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
            catsEmbed.addField(":sparkling_heart: Special :sparkling_heart:", `Smokey: ${uSmokey}\nBandit: ${uBandit}\nBug: ${uBug}\nLinda: ${uLinda}\nMittens: ${uMittens}\nCash: ${uCash}\nJackson: ${uJackson}\nCottonball: ${uCottonball}\nSonny: ${uSonny}\nLailah: ${uLailah}\nCher: ${uCher}\nMarvin: ${uMarvin}\nLoki: ${uLoki}\nLoverboy: ${uLoverboy}`, true);
          }
          if(allCatType[i] === "impossible"){
            catsEmbed.addField(":gem: Impossible :gem:", `Squirtlett: ${uSquirtlett}\nCursed Cat: ${uCursedcat}\nUWU: ${uUWU}`, true);
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