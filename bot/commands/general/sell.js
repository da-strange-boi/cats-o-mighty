const Discord = require("discord.js");
const ms = require('parse-ms');
let cooldown = {};
catNum = 0;
exports.run = async (bot, message, args) => {
  bot.db.Userdata.findOne({
    userID: message.author.id
  }, (err, userdata) => {
    if(err) console.log(err);
    if(!userdata){message.channel.send('Account Error');return;}
    if(userdata){

      //* If The User Doesn't Specify Anything (cat sell)
      if(!args[0]){
        message.channel.send(`<@${message.author.id}> please use the command correctly, check 'cat help sell'`);
      }

      //* Set A Cooldown
      if(cooldown[message.author.id] && cooldown[message.author.id] > 0){
        let time = ms(Date.now() - cooldown[message.author.id]);
        message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)));
        return;
      }
      cooldown[message.author.id] = Date.now();

      //USAGE cat sell simese 1
      if(args[1]){
        let animalSellName;
        animal = args[0].toLowerCase().trim();
        amtAnimal = args[1];

        animalList = ['siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishangora', 'korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin', 'bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'squirtlett', 'cursedcat', 'uwu'];
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


            
        //? Try To Find A Better Way To Do This,,, Please ||| hey i found a better way to do this
        for(let i=0;i < animalList.length; i++){
          if(animal === animalList[i]){
            if(i <= 5){catSellPrice = 25} // common
            if(i >= 7 && i <= 11){catSellPrice = 55} // uncommon
            if(i >= 12 && i <= 17){catSellPrice = 200} // rare
            if(i >= 18 && i <= 31){catSellPrice = 2500} // special
            if(i >= 32){catSellPrice = 10000} // impossible

            if(animalSellName === undefined){
              animalSellName = animalList[i];
            }

            if(userdata.cats[animalList[i]] === 0){
              message.channel.send(`You don't have any ${animalList[i]} cats to sell!`);
              return;
            }
            if(userdata.cats[animalList[i]] - amtAnimal < 0){
              amtAnimal = userdata.cats[animalList[i]];
            }
            userdata.cats[animalList[i]] = userdata.cats[animalList[i]] - amtAnimal;
            userdata.money.catmoney += (amtAnimal * catSellPrice);
            let soldCat = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.cats)
            .setDescription(`You sold ${amtAnimal} ${animalSellName} cats for $${amtAnimal * catSellPrice}`);
            message.channel.send(soldCat); 
            userdata.stats.catsSold += amtAnimal;
            catNum++;
          }
        }
      }

      //USAGE cat sell [all, catType{common || uncommon || rare || special || impossible}
      if(args[0]){
        let sellOption = args[0];
        
        //* Geting Vars Of All Cats
        uSiamese = userdata.cats.siamese;uBurmese = userdata.cats.burmese;uRagdoll = userdata.cats.ragdoll;uPersian = userdata.cats.persian;uMaineCoon = userdata.cats.mainecoon;uRussianBlue = userdata.cats.russianblue;uAbyssinian = userdata.cats.abyssinian;uManx = userdata.cats.manx;uSphynx = userdata.cats.sphynx;uCyprus = userdata.cats.cyprus;uFoldex = userdata.cats.foldex;uTurkishAngora = userdata.cats.turkishangora;uKorat = userdata.cats.korat;uSingapura = userdata.cats.singapura;uTonkinese = userdata.cats.tonkinese;uPeterbald = userdata.cats.peterbald;uChartreux = userdata.cats.chartreux;uMunchkin = userdata.cats.munchkin;uBandit = userdata.cats.bandit;uBug = userdata.cats.bug;uLinda = userdata.cats.linda;uMittens = userdata.cats.mittens;uCash = userdata.cats.cash;uJackson = userdata.cats.jackson;uCottonball = userdata.cats.cottonball;uSonny = userdata.cats.sonny;uSmokey = userdata.cats.smokey;uLailah = userdata.cats.lailah;uCher = userdata.cats.cher;uMarvin = userdata.cats.marvin;uLoki = userdata.cats.loki;uLoverBoy = userdata.cats.loverboy;uSquirtlett = userdata.cats.squirtlett;uCursedcat = userdata.cats.cursedcat;uUWU = userdata.cats.uwu;
        let commonCatTotal = uSiamese + uBurmese + uRagdoll + uPersian + uMaineCoon + uRussianBlue;let uncommonCatTotal = uAbyssinian + uManx + uSphynx + uCyprus + uFoldex + uTurkishAngora;let rareCatTotal = uKorat + uSingapura + uTonkinese + uPeterbald + uChartreux + uMunchkin;let specialCatTotal = uBandit + uBug + uLinda + uMittens + uCash + uJackson + uCottonball + uSonny + uSmokey + uLailah + uCher + uMarvin + uLoki + uLoverBoy;let impossibleCatTotal = uSquirtlett + uCursedcat + uUWU;

        //USAGE cat sell all
        if(sellOption === "all" || sellOption === "allcats"){
          //* Check To See If User Has Any Cats
          if(commonCatTotal === 0 && uncommonCatTotal === 0 && rareCatTotal === 0 && specialCatTotal === 0 && impossibleCatTotal === 0){
            let noCats = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.error)
            .setDescription(`you don't own any cats to sell`);
            message.channel.send(noCats);
            catNum++;
            return;
          }
          //* Convert The Cats Numbers Into Money
          userdata.money.catmoney += (commonCatTotal * 25);  
          userdata.money.catmoney += (uncommonCatTotal * 55);
          userdata.money.catmoney += (rareCatTotal * 200);
          userdata.money.catmoney += (specialCatTotal * 2500);
          userdata.money.catmoney += (impossibleCatTotal * 10000);

          userdata.cats.siamese=0;userdata.cats.burmese=0;userdata.cats.ragdoll=0;userdata.cats.persian=0;userdata.cats.mainecoon=0;userdata.cats.russianblue=0;userdata.cats.abyssinian=0;userdata.cats.manx=0;userdata.cats.sphynx=0;userdata.cats.cyprus=0;userdata.cats.foldex=0;userdata.cats.turkishangora=0;userdata.cats.korat=0;userdata.cats.singapura=0;userdata.cats.tonkinese=0;userdata.cats.peterbald=0;userdata.cats.chartreux=0;userdata.cats.munchkin=0;userdata.cats.bandit=0;userdata.cats.bug=0;userdata.cats.linda=0;userdata.cats.mittens=0;userdata.cats.cash=0;userdata.cats.jackson=0;userdata.cats.cottonball=0;userdata.cats.sonny=0;userdata.cats.smokey=0;userdata.cats.lailah=0;userdata.cats.cher=0;userdata.cats.marvin=0;userdata.cats.loki=0;userdata.cats.loverboy=0;userdata.cats.squirtlett=0;userdata.cats.cursedcat=0;userdata.cats.uwu=0;

          catTotal = commonCatTotal + uncommonCatTotal + rareCatTotal + specialCatTotal + impossibleCatTotal;
          let sellAllCatsEmbed = new Discord.RichEmbed()
          .setAuthor(message.author.username, message.author.avatarURL)
          .setColor(bot.config.color.cats)
          .setDescription(`You sold ${catTotal} cats for $${(commonCatTotal * 25)+(uncommonCatTotal * 55)+(rareCatTotal * 200)+(specialCatTotal * 2500)+(impossibleCatTotal * 10000)}`);
          message.channel.send(sellAllCatsEmbed);
          userdata.stats.catsSold += catTotal;
        }

        //USAGE cat sell catType{common, uncommon, rare, special, impossible} 
        //* Little Compacted Code
        else if(sellOption === "common" || sellOption === "commoncat" || sellOption === "commoncats"){
          //* Check To See If User Has Any Common Cats
          if(commonCatTotal === 0){
            let noCommonCats = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.error)
            .setDescription(`you don't own any common cats to sell`);
            message.channel.send(noCommonCats);
            catNum++;
            return;
          }
          //* Convert The Cats Numbers Into Money
          userdata.money.catmoney += (commonCatTotal * 25);
          userdata.cats.siamese=0;userdata.cats.burmese=0;userdata.cats.ragdoll=0;userdata.cats.persian=0;userdata.cats.mainecoon=0;userdata.cats.russianblue=0;
          let sellCommonCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.cats).setDescription(`You sold ${commonCatTotal} cats for $${(commonCatTotal * 25)}`);
          message.channel.send(sellCommonCatsEmbed);
          userdata.stats.catsSold += commonCatTotal;
        }
        else if(sellOption === "uncommon" || sellOption === "uncommoncat" || sellOption === "uncommons"){
          //* Check To See If User Has Any Uncommon Cats
          if(uncommonCatTotal === 0){
            let noUncommonCats = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.error)
            .setDescription(`you don't own any uncommon cats to sell`);
            message.channel.send(noUncommonCats);
            catNum++;
            return;
          }
          //* Convert The Cats Numbers Into Money
          userdata.money.catmoney += (uncommonCatTotal * 55);
          userdata.cats.abyssinian=0;userdata.cats.manx=0;userdata.cats.sphynx=0;userdata.cats.cyprus=0;userdata.cats.foldex=0;userdata.cats.turkishangora=0;
          let sellUncommonCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.cats).setDescription(`You sold ${uncommonCatTotal} cats for $${(uncommonCatTotal * 55)}`);
          message.channel.send(sellUncommonCatsEmbed);
          userdata.stats.catsSold += uncommonCatTotal;
        }
        else if(sellOption === "rare" || sellOption === "rarecat" || sellOption === "rarecats"){
          //* Check To See If User Has Any Rare Cats
          if(rareCatTotal === 0){
            let noRareCats = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.error)
            .setDescription(`you don't own any rare cats to sell`);
            message.channel.send(noRareCats);
            catNum++;
            return;
          }
          //* Convert The Cats Numbers Into Money
          userdata.money.catmoney += (rareCatTotal * 200);
          userdata.cats.korat=0;userdata.cats.singapura=0;userdata.cats.tonkinese=0;userdata.cats.peterbald=0;userdata.cats.chartreux=0;userdata.cats.munchkin=0;
          let sellRareCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.cats).setDescription(`You sold ${rareCatTotal} cats for $${(rareCatTotal * 200)}`);
          message.channel.send(sellRareCatsEmbed);
          userdata.stats.catsSold += rareCatTotal;
        }
        else if(sellOption === "special" || sellOption === "specialcat" || sellOption === "specialcats"){
          //* Check To See If User Has Any Special Cats
          if(specialCatTotal === 0){
            let noSpecialCats = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.error)
            .setDescription(`you don't own any special cats to sell`);
            message.channel.send(noSpecialCats);
            catNum++;
            return;
          }
          //* Convert The Cats Numbers Into Money
          userdata.money.catmoney += (specialCatTotal * 2500);
          userdata.cats.bandit=0;userdata.cats.bug=0;userdata.cats.linda=0;userdata.cats.mittens=0;userdata.cats.cash=0;userdata.cats.jackson=0;userdata.cats.cottonball=0;userdata.cats.sonny=0;userdata.cats.smokey=0;userdata.cats.lailah=0;userdata.cats.cher=0;userdata.cats.marvin=0;userdata.cats.loki=0;userdata.cats.loverboy=0;
          let sellSpecialCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.cats).setDescription(`You sold ${specialCatTotal} cats for $${(specialCatTotal * 2500)}`);
          message.channel.send(sellSpecialCatsEmbed);
          userdata.stats.catsSold += specialCatTotal;
        }
        else if(sellOption === "impossible" || sellOption === "impossiblecat" || sellOption === "impossiblecats"){
          //* Check To See If User Has Any Impossible Cats
          if(impossibleCatTotal === 0){
            let noImpossibleCats = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(bot.config.color.error)
            .setDescription(`you don't own any impossible cats to sell`);
            message.channel.send(noImpossibleCats);
            catNum++;
            return;
          }
          //* Convert The Cats Numbers Into Money
          userdata.money.catmoney += (impossibleCatTotal * 10000);
          userdata.cats.squirtlett=0;userdata.cats.cursedcat=0;userdata.cats.uwu=0;
          let sellImpossibleCatsEmbed = new Discord.RichEmbed().setAuthor(message.author.username, message.author.avatarURL).setColor(bot.config.color.cats).setDescription(`You sold ${impossibleCatTotal} cats for $${(impossibleCatTotal * 10000)}`);
          message.channel.send(sellImpossibleCatsEmbed);
          userdata.stats.catsSold += impossibleCatTotal;
        }
      }
      //* Delete The Cooldown // Resetting It
      setTimeout(() => {
        delete cooldown[message.author.id];
      }, 3500);
    }
    userdata.save().catch(err => console.log(err));
  });
}

exports.help = {
  name: "sell",
  aliases: []
}