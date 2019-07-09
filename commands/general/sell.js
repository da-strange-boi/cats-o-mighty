const Discord = require("discord.js");
let config = require("../../config.json");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Money = require("../../moduls/money.js");
const Cat = require("../../moduls/cats.js");

catNum = 0;

module.exports.run = async (bot, message, args) => {
  Money.findOne({
    userID: message.author.id
  }, (err, userMoney) => {
    if(err) console.log(err);
    if(!userMoney){
      const newMoney = new Money({
        placeholder: "global",
        userID: message.author.id,
        userUsername: message.author.username,
        money: 0
      })
      newMoney.save().catch(err => console.log(err));
    }
    if(userMoney){

      //* If The User Doesn't Specify Anything (cat sell)
      if(!args[0]){
        message.channel.send(`<@${message.author.id}> please use the command correctly, check 'cat help sell'`);
      }

      //USAGE cat sell simese 1
      if(args[1]){
        animal = args[0].toLowerCase().trim();
        amtAnimal = args[1];

        animalList = ['siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'korat', 'singapura', 'tonkinese', 'perterbald', 'chartreux', 'munchkin', 'bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'laliah', 'cher', 'marvin', 'squirtlett', 'cursedcat'];
        const checkAnimal = () => {  
          for(let i=0; i < animalList.length;i++){
            if(animal === animalList[i]){
              if(isNaN(amtAnimal) === false){
                if(amtAnimal > 0){
                  return true;
                } else {return 'neg';}
              } else {return 'num';}
            }
          }
        }

        if(checkAnimal() === 'neg'){
          message.channel.send('You can\'t sell negative amounts of cats!');
          return;
        } 
        else if(checkAnimal() === 'num'){
          message.channel.send('That\'s not a number!');
          return;
        }
        else if(checkAnimal() === 'animal'){
          message.channel.send('That\'s not a vaild animal!');
          return;
        }

        Cat.findOne({
          userID: message.author.id
        }, (err, catList) => {
          if(err) console.log(err);
          if(catList){
            
            //? Try To Find A Better Way To Do This,,, Please ||| hey i found a better way to do this
            for(let i=0;i < animalList.length; i++){
              if(animal === animalList[i]){
                if(i <= 5){catSellPrice = 25} // common
                if(i >= 6 && i <= 10){catSellPrice = 55} // uncommon
                if(i >= 11 && i <= 16){catSellPrice = 200} // rare
                if(i >= 17 && i <= 28){catSellPrice = 2500} // special
                if(i >= 29){catSellPrice = 10000} // impossible


                if(catList[animalList[i]] === 0){
                  message.channel.send(`You don't have any ${animalList[i]} cats to sell!`);
                  return;
                }
                if(catList[animalList[i]] - amtAnimal < 0){
                  amtAnimal = catList[animalList[i]];
                }
                catList[animalList[i]] = catList[animalList[i]] - amtAnimal;
                userMoney.money = userMoney.money + (amtAnimal * catSellPrice);
                let soldCat = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(config.color.cats)
                .setDescription(`You sold ${amtAnimal} ${animalList[i]} cats for $${amtAnimal * catSellPrice}`);
                message.channel.send(soldCat); 
                catNum++;
              }
            }

          }
          catList.save().catch(err => console.log(err));
        });
      }

      //USAGE cat sell [all, catType{common || uncommon || rare || special || impossible}
      if(args[0]){
          let sellOption = args[0];

          Cat.findOne({
            userID: message.author.id
          }, (err, catList) => {
            if(err) console.log(err);
            if(catList){

              //* Geting Vars Of All Cats
              uSiamese = catList.siamese;uBurmese = catList.burmese;uRagdoll = catList.ragdoll;uPersian = catList.persian;uMaineCoon = catList.maineCoon;uRussianBlue = catList.russianBlue;uAbyssinian = catList.abyssinian;uManx = catList.manx;uSphynx = catList.sphynx;uCyprus = catList.cyprus;uFoldex = catList.foldex;uKorat = catList.korat;uSingapura = catList.singapura;uTonkinese = catList.tonkinese;uPeterbald = catList.peterbald;uChartreux = catList.chartreux;uMunchkin = catList.munchkin;uBandit = catList.bandit;uBug = catList.bug;uLinda = catList.linda;uMittens = catList.mittens;uCash = catList.cash;uJackson = catList.jackson;uCottonball = catList.cottonball;uSonny = catList.sonny;uSmokey = catList.smokey;uLailah = catList.lailah;uCher = catList.cher;uMarvin = catList.marvin;uSquirtlett = catList.squirtlett;uCursedcat = catList.cursedcat;
              let commonCatTotal = uSiamese + uBurmese + uRagdoll + uPersian + uMaineCoon + uRussianBlue;let uncommonCatTotal = uAbyssinian + uManx + uSphynx + uCyprus + uFoldex;let rareCatTotal = uKorat + uSingapura + uTonkinese + uPeterbald + uChartreux + uMunchkin;let specialCatTotal = uBandit + uBug + uLinda + uMittens + uCash + uJackson + uCottonball + uSonny + uSmokey + uLailah + uCher + uMarvin;let impossibleCatTotal = uSquirtlett + uCursedcat;

              //USAGE cat sell all
              if(sellOption === "all" || sellOption === "allcats"){
                //* Check To See If User Has Any Cats
                if(commonCatTotal === 0 && uncommonCatTotal === 0 && rareCatTotal === 0 && specialCatTotal === 0 && impossibleCatTotal === 0){
                  let noCats = new Discord.RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setColor(config.color.error)
                  .setDescription(`you don't own any cats to sell`);
                  message.channel.send(noCats);
                  catNum++;
                  return;
                }
                //* Convert The Cats Numbers Into Money
                userMoney.money = userMoney.money + (commonCatTotal * 25);  
                userMoney.money = userMoney.money + (uncommonCatTotal * 55);
                userMoney.money = userMoney.money + (rareCatTotal * 200);
                userMoney.money = userMoney.money + (specialCatTotal * 2500);
                userMoney.money = userMoney.money + (impossibleCatTotal * 10000);

                catList.siamese=0;catList.burmese=0;catList.ragdoll=0;catList.persian=0;catList.maineCoon=0;catList.russianBlue=0;catList.abyssinian=0;catList.manx=0;catList.sphynx=0;catList.cyprus=0;catList.foldex=0;catList.korat=0;catList.singapura=0;catList.tonkinese=0;catList.peterbald=0;catList.chartreux=0;catList.munchkin=0;catList.bandit=0;catList.bug=0;catList.linda=0;catList.mittens=0;catList.cash=0;catList.jackson=0;catList.cottonball=0;catList.sonny=0;catList.smokey=0;catList.lailah=0;catList.cher=0;catList.marvin=0;catList.squirtlett=0;catList.cursedcat=0;
                catList.save().catch(err => console.log(err));

                let sellAllCatsEmbed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(config.color.cats)
                .setDescription(`You sold ${commonCatTotal + uncommonCatTotal + rareCatTotal + specialCatTotal + impossibleCatTotal} cats for $${(commonCatTotal * 25)+(uncommonCatTotal * 55)+(rareCatTotal * 200)+(specialCatTotal * 2500)+(impossibleCatTotal * 10000)}`);
                message.channel.send(sellAllCatsEmbed);
              }

              //USAGE cat sell catType{common, uncommon, rare, special, impossible} 
              //* Little Compacted Code
              else if(sellOption === "common" || sellOption === "commoncat" || sellOption === "commoncats"){
                //* Check To See If User Has Any Common Cats
                if(commonCatTotal === 0){
                  let noCommonCats = new Discord.RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setColor(config.color.error)
                  .setDescription(`you don't own any common cats to sell`);
                  message.channel.send(noCommonCats);
                  catNum++;
                  return;
                }
                //* Convert The Cats Numbers Into Money
                userMoney.money = userMoney.money + (commonCatTotal * 25);
                catList.siamese=0;catList.burmese=0;catList.ragdoll=0;catList.persian=0;catList.maineCoon=0;catList.russianBlue=0;
                catList.save().catch(err => console.log(err));
                let sellCommonCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.cats).setDescription(`You sold ${commonCatTotal} cats for $${(commonCatTotal * 25)}`);
                message.channel.send(sellCommonCatsEmbed);
              }
              else if(sellOption === "uncommon" || sellOption === "uncommoncat" || sellOption === "uncommons"){
                //* Check To See If User Has Any Uncommon Cats
                if(uncommonCatTotal === 0){
                  let noUncommonCats = new Discord.RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setColor(config.color.error)
                  .setDescription(`you don't own any uncommon cats to sell`);
                  message.channel.send(noUncommonCats);
                  catNum++;
                  return;
                }
                //* Convert The Cats Numbers Into Money
                userMoney.money = userMoney.money + (uncommonCatTotal * 55);
                catList.abyssinian=0;catList.manx=0;catList.sphynx=0;catList.cyprus=0;catList.foldex=0;
                catList.save().catch(err => console.log(err));
                let sellUncommonCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.cats).setDescription(`You sold ${uncommonCatTotal} cats for $${(uncommonCatTotal * 55)}`);
                message.channel.send(sellUncommonCatsEmbed);
              }
              else if(sellOption === "rare" || sellOption === "rarecat" || sellOption === "rarecats"){
                //* Check To See If User Has Any Rare Cats
                if(rareCatTotal === 0){
                  let noRareCats = new Discord.RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setColor(config.color.error)
                  .setDescription(`you don't own any rare cats to sell`);
                  message.channel.send(noRareCats);
                  catNum++;
                  return;
                }
                //* Convert The Cats Numbers Into Money
                userMoney.money = userMoney.money + (rareCatTotal * 200);
                catList.korat=0;catList.singapura=0;catList.tonkinese=0;catList.peterbald=0;catList.chartreux=0;catList.munchkin=0;
                catList.save().catch(err => console.log(err));
                let sellRareCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.cats).setDescription(`You sold ${rareCatTotal} cats for $${(rareCatTotal * 200)}`);
                message.channel.send(sellRareCatsEmbed);
              }
              else if(sellOption === "special" || sellOption === "specialcat" || sellOption === "specialcats"){
                //* Check To See If User Has Any Special Cats
                if(specialCatTotal === 0){
                  let noSpecialCats = new Discord.RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setColor(config.color.error)
                  .setDescription(`you don't own any special cats to sell`);
                  message.channel.send(noSpecialCats);
                  catNum++;
                  return;
                }
                //* Convert The Cats Numbers Into Money
                userMoney.money = userMoney.money + (specialCatTotal * 2500);
                catList.bandit=0;catList.bug=0;catList.linda=0;catList.mittens=0;catList.cash=0;catList.jackson=0;catList.cottonball=0;catList.sonny=0;catList.smokey=0;catList.lailah=0;catList.cher=0;catList.marvin=0;
                catList.save().catch(err => console.log(err));
                let sellSpecialCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.cats).setDescription(`You sold ${specialCatTotal} cats for $${(specialCatTotal * 2500)}`);
                message.channel.send(sellSpecialCatsEmbed);
              }
              else if(sellOption === "impossible" || sellOption === "impossiblecat" || sellOption === "impossiblecats"){
                //* Check To See If User Has Any Impossible Cats
                if(impossibleCatTotal === 0){
                  let noImpossibleCats = new Discord.RichEmbed()
                  .setAuthor(message.author.username, message.author.avatarURL)
                  .setColor(config.color.error)
                  .setDescription(`you don't own any impossible cats to sell`);
                  message.channel.send(noImpossibleCats);
                  catNum++;
                  return;
                }
                //* Convert The Cats Numbers Into Money
                userMoney.money = userMoney.money + (impossibleCatTotal * 10000);
                catList.squirtlett=0;
                catList.save().catch(err => console.log(err));
                let sellImpossibleCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(config.color.cats).setDescription(`You sold ${impossibleCatTotal} cats for $${(impossibleCatTotal * 10000)}`);
                message.channel.send(sellImpossibleCatsEmbed);
              }
            }
          userMoney.save().catch(err => console.log(err));
        });
      }
    }
  });
}

module.exports.help = {
  name: "sell",
  aliases: []
}