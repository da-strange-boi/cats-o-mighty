const Discord = require("discord.js");
const config = require("../../config.json");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const totalCat = require("../../moduls/totalCat.js");

ifcat = 0;

module.exports.run = async (bot, message, args) => {

  //USAGE cat dex|catinfo {cat name}

  //* If User Doesn't Specifiy What Cat To Look At
  if(!args[0]){
    message.channel.send(`<@${message.author.id}> you need to specify which cat to look at`).then(msg => msg.delete(6000));
  }

  //* If User Does Specifiy The Cat Type
  if(args[0]){
    let catInfo = args[0].toLowerCase().trim();

    totalCat.findOne({
      totalcat: "placeholder"
    }, (err, catTotalList) => {
      if(err) console.log(err);
      if(catTotalList){

        tSiamese = catTotalList.siamese;tBurmese = catTotalList.burmese;tRagdoll = catTotalList.ragdoll;tPersian = catTotalList.persian;tMaineCoon = catTotalList.maineCoon;tRussianBlue = catTotalList.russianBlue;
        tAbyssinian = catTotalList.abyssinian;tManx = catTotalList.manx;tSphynx = catTotalList.sphynx;tCyprus = catTotalList.cyprus;tFoldex = catTotalList.foldex;tTurkishAngora = catTotalList.turkishAngora;
        tKorat = catTotalList.korat;tSingapura = catTotalList.singapura;tTonkinese = catTotalList.tonkinese;tPeterbald = catTotalList.peterbald;tChartreux = catTotalList.chartreux;tMunchkin = catTotalList.munchkin;
        tBandit = catTotalList.bandit;tBug = catTotalList.bug;tLinda = catTotalList.linda;tMittens = catTotalList.mittens;tCash = catTotalList.cash;tJackson = catTotalList.jackson;tCottonball = catTotalList.cottonball;tSonny = catTotalList.sonny;tSmokey = catTotalList.smokey;tLailah = catTotalList.lailah;tCher = catTotalList.cher;tMarvin = catTotalList.marvin;tLoki = catTotalList.loki;tPancake = catTotalList.pancake;
        tSquirtlett = catTotalList.squirtlett;tCursedcat = catTotalList.cursedcat;tUWU = catTotalList.uwu;
        
        //* Function To Make The First Letter Of A Word Capitalized
        const cap = (string) => {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        //* Function To Display The Dex For The Cat
        const displayCat = (catName, sellAmount, totalCat, url) => {
          if(catInfo === `${catName}`){
            dexHelp = new Discord.RichEmbed()
            .setTitle(`${cap(catName)}`)
            .setDescription(`**Total Got**: ${totalCat} \n**Sell Amount**: $${sellAmount}`)
            .setColor(config.color.dex)
            .setImage(`${url}`);
            message.channel.send(dexHelp);
            ifcat++;
          }
        }
    
        //? Possibly Find A Better Way To Do This

        //------common------

        displayCat('siamese', '25', tSiamese, 'https://i.imgur.com/Q72dhHH.jpg');
        displayCat('burmese', '25', tBurmese, 'https://i.imgur.com/i2wLXer.jpg');
        displayCat('ragdoll', '25', tRagdoll, 'https://i.imgur.com/BHI2A5B.jpg');
        displayCat('persian', '25', tPersian, 'https://i.imgur.com/7zk7qMR.jpg');
        displayCat('mainecoon', '25', tMaineCoon, 'https://i.imgur.com/BdqURwX.png');

        //------uncommon------

        displayCat('abyssinian', '55', tAbyssinian, 'https://i.imgur.com/DaVPTXH.jpg')
        displayCat('manx', '55', tManx, 'https://i.imgur.com/uDgcTTJ.jpg')
        displayCat('sphynx', '55', tSphynx, 'https://i.imgur.com/XuwNWBE.jpg')
        displayCat('cyprus', '55', tCyprus, 'https://i.imgur.com/McEdtMS.jpg')
        displayCat('foldex', '55', tFoldex, 'https://i.imgur.com/AQl6z6t.jpg')

        //------rare------

        displayCat('korat', '200', tKorat, 'https://i.imgur.com/yoGvgow.jpg')
        displayCat('singapura', '200', tSingapura, 'https://i.imgur.com/1wjvREo.jpg')
        displayCat('tonkinese', '200', tTonkinese, 'https://i.imgur.com/BVVQ89V.jpg')
        displayCat('peterbald', '200', tPeterbald, 'https://i.imgur.com/OSlqoj7.jpg')
        displayCat('chartreux', '200', tChartreux, 'https://i.imgur.com/dBRF5iR.jpg')

        //------special------

        displayCat('bandit', '2500', tBandit, 'https://i.imgur.com/FjSuQay.jpg');
        displayCat('bug', '2500', tBug, 'https://i.imgur.com/lvO0EA8.jpg');
        displayCat('linda', '2500', tLinda, 'https://i.imgur.com/LmHVdDn.jpg');
        displayCat('mittens', '2500', tMittens, 'https://i.imgur.com/BCsUSU6.jpg');
        displayCat('cash', '2500', tCash, 'https://i.imgur.com/rWnjhLM.jpg');
        displayCat('jackson', '2500', tJackson, 'https://i.imgur.com/NdE2s2E.jpg');
        displayCat('cottonball', '2500', tCottonball, 'https://i.imgur.com/3jI4GjU.jpg');
        displayCat('sonny', '2500', tSonny, 'https://i.imgur.com/bda6zxd.jpg');
        displayCat('smokey', '2500', tSmokey, 'https://i.imgur.com/9uxOMQB.jpg');
        displayCat('lailah', '2500', tLailah, 'https://i.imgur.com/lcWRZZN.jpg');
        displayCat('cher', '2500', tCher, 'https://i.imgur.com/I06Qynx.jpg');
        displayCat('marvin', '2500', tMarvin, 'https://i.imgur.com/izG1phc.jpg');
        displayCat('loki', '2500', tLoki, 'https://i.imgur.com/PBV6Ijq.jpg');
        displayCat('pancake', '2500', tPancake, 'https://i.imgur.com/SJ40Y1E.jpg');

        //------impossible------

        displayCat('uwu', '10000', tUWU, 'https://i.imgur.com/WJ87FfU.jpg');

        if(catInfo === 'squirtlett'){
          dexHelp = new Discord.RichEmbed()
          .setTitle(`${cap('squirtlett')}`)
          .setDescription(`**Total Got**: ${tSquirtlett} \n**Sell Amount**: $10000 \n\n *'cat' suggested by utiyi#3353* \n`)
          .setColor(config.color.dex)
          .setImage('https://i.imgur.com/6RcJXap.png');
          message.channel.send(dexHelp);
          ifcat++;
        }

        if(catInfo === `cursedcat`){
          dexHelp = new Discord.RichEmbed()
          .setTitle(`${cap('cursed cat')}`)
          .setDescription(`**Total Got**: ${tCursedcat} \n**Sell Amount**: $10000 \n\n *'cat' suggested by, Hispanic Ｓｔｉｎｋｙ Bean#5474* \n`)
          .setColor(config.color.dex)
          .setImage('https://i.imgur.com/yIFIyJq.jpg');
          message.channel.send(dexHelp);
          ifcat++;
        }

        if(catInfo === `russianblue` || catInfo === `russian blue`){
          dexHelp = new Discord.RichEmbed()
          .setTitle(`${cap('russian blue')}`)
          .setDescription(`**Total Got**: ${tRussianBlue} \n**Sell Amount**: $25 \n\n *cat suggested by, jana* \n`)
          .setColor(config.color.dex)
          .setImage('https://i.imgur.com/XWmYcSC.jpg');
          message.channel.send(dexHelp);
          ifcat++;
        }

        if(catInfo === "munchkin"){
          dexHelp = new Discord.RichEmbed()
          .setTitle(`${cap('munchkin')}`)
          .setDescription(`**Total Got**: ${tMunchkin} \n**Sell Amount**: $200 \n\n *cat suggested by, [C] [R] [K] [N] [I]* \n`)
          .setColor(config.color.dex)
          .setImage('https://i.imgur.com/iUIOKGR.jpg');
          message.channel.send(dexHelp);
          ifcat++;
        }

        if(catInfo === "turkishangora"){
          dexHelp = new Discord.RichEmbed()
          .setTitle(`${cap('turkish Angora')}`)
          .setDescription(`**Total Got**: ${tTurkishAngora} \n**Sell Amount**: $55 \n\n *cat suggested by, ๑DelusionalHermit๑* \n`)
          .setColor(config.color.dex)
          .setImage('https://i.imgur.com/LkkPAJh.jpg');
          message.channel.send(dexHelp);
          ifcat++;
        }

        if (ifcat === 0){message.channel.send("check `cat help dex` for how to use the command")};
      }
    });
  }
}

module.exports.help = {
    name: "dex",
    aliases: ['catinfo', 'catdex']
}