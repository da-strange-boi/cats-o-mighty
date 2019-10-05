const Discord = require("discord.js");
const ms = require('parse-ms');
let cooldown = {};
ifcat = 0;
exports.run = async (bot, message, args) => {

  //USAGE cat dex|catinfo {cat name}

  //* If User Doesn't Specifiy What Cat To Look At
  if(!args[0]){
    message.channel.send(`**${message.author.username}**, you need to specify which cat to look at`);
    return;
  }

  //* Set A Cooldown
  if(cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0){
    let time = ms(Date.now() - cooldown[message.author.id]);
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)));
    return;
  }
  cooldown[message.author.id] = Date.now();

  //* If User Does Specifiy The Cat Type
  if(args[0]){
    let catInfo = args[0].toLowerCase().trim();

    bot.db.Totals.findOne({}, (err, totalList) => {
      if(err) console.log(err);
      if(totalList){

        tSiamese = totalList.cats.siamese;tBurmese = totalList.cats.burmese;tRagdoll = totalList.cats.ragdoll;tPersian = totalList.cats.persian;tMaineCoon = totalList.cats.mainecoon;tRussianBlue = totalList.cats.russianblue;tCalico = totalList.cats.calico;tTabby = totalList.cats.tabby;
        tAbyssinian = totalList.cats.abyssinian;tManx = totalList.cats.manx;tSphynx = totalList.cats.sphynx;tCyprus = totalList.cats.cyprus;tFoldex = totalList.cats.foldex;tTurkishAngora = totalList.cats.turkishangora;tNorwegianForest = totalList.cats.norwegianforest;tDevonrex = totalList.cats.devonrex;
        tKorat = totalList.cats.korat;tSingapura = totalList.cats.singapura;tTonkinese = totalList.cats.tonkinese;tPeterbald = totalList.cats.peterbald;tChartreux = totalList.cats.chartreux;tMunchkin = totalList.cats.munchkin;tBritishShorthair = totalList.cats.britishshorthair;tOjosazules = totalList.cats.ojosazules;
        tBandit = totalList.cats.bandit;tBug = totalList.cats.bug;tLinda = totalList.cats.linda;tMittens = totalList.cats.mittens;tCash = totalList.cats.cash;tJackson = totalList.cats.jackson;tCottonball = totalList.cats.cottonball;tSonny = totalList.cats.sonny;tSmokey = totalList.cats.smokey;tLailah = totalList.cats.lailah;tCher = totalList.cats.cher;tMarvin = totalList.cats.marvin;tLoki = totalList.cats.loki;tLoverboy = totalList.cats.loverboy;tKillerClaws = totalList.cats.killerclaws;
        tSquirtlett = totalList.cats.squirtlett;tCursedcat = totalList.cats.cursedcat;tUWU = totalList.cats.uwu;tTom = totalList.cats.tom;tDemoncat = totalList.cats.demoncat;tBongocat = totalList.cats.bongocat;tGrumpycat = totalList.cats.grumpycat;
        tGhostcat = totalList.cats.ghostcat;

        //* Function To Make The First Letter Of A Word Capitalized
        const cap = (string) => {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        //* Function To Display The Dex For The Cat
        const displayCat = (catName, sellAmount, totalCat, url, sidenote) => {
          if(catInfo === `${catName}`){
            dexHelp = new Discord.RichEmbed()
            .setTitle(`${cap(catName)}`)
            .setColor(bot.config.color.dex)
            .setImage(`${url}`);
            if(sidenote){
              dexHelp.setDescription(`**Total Got**: ${totalCat} \n**Sell Amount**: ${sellAmount} \n\n ${sidenote} \n`);
            } else {dexHelp.setDescription(`**Total Got**: ${totalCat} \n**Sell Amount**: ${sellAmount}`);}
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
        displayCat('russianblue', '25', tRussianBlue, 'https://i.imgur.com/XWmYcSC.jpg', '*cat suggested by, __jana__*');
        displayCat('calico', '25', tCalico, 'https://i.imgur.com/yD6sXrt.jpg', '*cat suggested by, __n u g g e t__ and __Chad__*');
        displayCat('tabby', '25', tTabby, 'https://i.imgur.com/frXE4oN.jpg', '*cat suggested by, __Chad__*');

        //------uncommon------

        displayCat('abyssinian', '55', tAbyssinian, 'https://i.imgur.com/DaVPTXH.jpg');
        displayCat('manx', '55', tManx, 'https://i.imgur.com/uDgcTTJ.jpg');
        displayCat('sphynx', '55', tSphynx, 'https://i.imgur.com/XuwNWBE.jpg');
        displayCat('cyprus', '55', tCyprus, 'https://i.imgur.com/McEdtMS.jpg');
        displayCat('foldex', '55', tFoldex, 'https://i.imgur.com/AQl6z6t.jpg');
        displayCat('turkishangora', '55', tTurkishAngora, 'https://i.imgur.com/LkkPAJh.jpg', '*cat suggested by, __๑DelusionalHermit๑__*');
        displayCat('norwegianforest', '55', tNorwegianForest, 'https://i.imgur.com/s54Hq6D.jpg', '*cat suggested by, __mxrningstar__ and __Cactus Cat__*');
        displayCat('devonrex', '55', tDevonrex, 'https://i.imgur.com/Dg20uZJ.jpg');

        //------rare------

        displayCat('korat', '200', tKorat, 'https://i.imgur.com/yoGvgow.jpg');
        displayCat('singapura', '200', tSingapura, 'https://i.imgur.com/1wjvREo.jpg');
        displayCat('tonkinese', '200', tTonkinese, 'https://i.imgur.com/BVVQ89V.jpg');
        displayCat('peterbald', '200', tPeterbald, 'https://i.imgur.com/OSlqoj7.jpg');
        displayCat('chartreux', '200', tChartreux, 'https://i.imgur.com/dBRF5iR.jpg');
        displayCat('munchkin', '200', tMunchkin, 'https://i.imgur.com/iUIOKGR.jpg', '*cat suggested by, __[C] [R] [K] [N] [I]__*');
        displayCat('britishshorthair', '200', tBritishShorthair, 'https://i.imgur.com/u8zG7fG.jpg', '*cat suggested by, __TheRealNicole__*');
        displayCat('ojosazules', '200', tOjosazules, 'https://i.imgur.com/vzYywnk.jpg');

        //------special------

        displayCat('bandit', '2,500', tBandit, 'https://i.imgur.com/yxIaIqe.jpg');
        displayCat('bug', '2,500', tBug, 'https://i.imgur.com/umoPzou.jpg');
        displayCat('linda', '2,500', tLinda, 'https://i.imgur.com/uieRlR9.jpg');
        displayCat('mittens', '2,500', tMittens, 'https://i.imgur.com/vPyIsRd.jpg');
        displayCat('cash', '2,500', tCash, 'https://i.imgur.com/21odRlh.jpg');
        displayCat('jackson', '2,500', tJackson, 'https://i.imgur.com/NdE2s2E.jpg');
        displayCat('cottonball', '2,500', tCottonball, 'https://i.imgur.com/ceqsPX4.jpg');
        displayCat('sonny', '2,500', tSonny, 'https://i.imgur.com/r7Fb0xU.jpg');
        displayCat('smokey', '2,500', tSmokey, 'https://i.imgur.com/Z2vz3un.jpg');
        displayCat('lailah', '2,500', tLailah, 'https://i.imgur.com/XEBy623.jpg');
        displayCat('cher', '2,500', tCher, 'https://i.imgur.com/I06Qynx.jpg');
        displayCat('marvin', '2,500', tMarvin, 'https://i.imgur.com/AO3QmAU.jpg');
        displayCat('loki', '2,500', tLoki, 'https://i.imgur.com/PBV6Ijq.jpg');
        displayCat('loverboy', '2,500', tLoverboy, 'https://i.imgur.com/SJ40Y1E.jpg');
        displayCat('killerclaws', '2,500', tKillerClaws, 'https://i.imgur.com/eRO5bK5.jpg');

        //------impossible------
        
        displayCat('squirtlett', '10,000', tSquirtlett, 'https://i.imgur.com/6RcJXap.png', '*\'cat\' suggested by utiyi#3353*');
        displayCat('cursedcat', '10,000', tCursedcat, 'https://i.imgur.com/yIFIyJq.jpg', '*\'cat\' suggested by, Hispanic Ｓｔｉｎｋｙ Bean#5474*');
        displayCat('uwu', '10,000', tUWU, 'https://i.imgur.com/WJ87FfU.jpg');
        displayCat('tom', '10,000', tTom, 'https://i.imgur.com/Nj05cMm.png', '*cat suggested by, __˙ssǝlǝs∩__*');
        displayCat('demoncat', '10,000', tDemoncat, 'https://i.imgur.com/Li7UCFf.png');
        displayCat('bongocat', '10,000', tBongocat, 'https://i.imgur.com/DZPzDEo.gif');
        displayCat('grumpycat', '10,000', tGrumpycat, 'https://i.imgur.com/sGIlYdc.jpg', 'R.I.P Tardar Sauce');

        //------seasonal------

        displayCat('ghostcat', "Can't sell", tGhostcat, 'https://i.imgur.com/qlbLgWj.jpg', '*Halloween of 2019*')

        if (ifcat === 0){message.channel.send("check `cat help dex` for how to use the command")};
      }
    });
  }
  //* Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id];
  }, 3500);
}

exports.help = {
  name: "dex",
  aliases: ['catinfo', 'catdex'],
  type: 'normal'
}