const Discord = require('discord.js');

exports.run = async (bot, message) => {

  if(!message.guild || message.IsPrivate || message.author.bot) return;

  let prefix = bot.config.prefix;
  if(message.content.startsWith(`<@${bot.user.id}>`)){
    prefix = `<@${bot.user.id}>`;
  }

  if(message.content.trim().toLowerCase().startsWith(prefix)) return;


  //* The Random Way To Get Cats
  // common: 30 || uncommon: 70 || rare: 150 || special: 350
  // common: 20 || uncommon: 50 || rare: 130 || special: 270 - updated: 5/17/19
  // common: 25 || uncommon: 60 || rare: 145 || special: 290 || impossible: 550 - updated: 5/24/19
  // common: 25 || uncommon: 80 || rare: 145 || special: 370 || impossible: 740 - updated: 6/7/19
  
  let commonCatAmt = Math.floor(Math.random() * 25) + 1;
  let commonBaseAmt = Math.floor(Math.random() * 25) + 1;

  let uncommonCatAmt = Math.floor(Math.random() * 80) + 1;
  let uncommonBaseAmt = Math.floor(Math.random() * 80) + 1;

  let rareCatAmt = Math.floor(Math.random() * 145) + 1;
  let rareBaseAmt = Math.floor(Math.random() * 145) + 1;

  let specialCatAmt = Math.floor(Math.random() * 370) + 1;
  let specialBaseAmt = Math.floor(Math.random() * 370) + 1;

  let impossibleCatsAmt = Math.floor(Math.random() * 740) + 1;
  let impossibleBaseAmt = Math.floor(Math.random() * 740) + 1;

  bot.db.Userdata.findOne({
    userID: message.author.id
  }, async (err, userdata) => {
    if(err) bot.log("databaseError", err);
    if(userdata){
        
      bot.db.Totals.findOne({}, async (err, totalList) => {
        if(err) bot.log("databaseError", err);
        if(!totalList){
          let catobjname = bot.catdata.fullcat('object');
          const total = new bot.db.Totals({
            catobjname
          });
          total.save().catch(err => console.log(err));
        }
        if(totalList){

          bot.db.Guildsettings.findOne({
            guildID: message.guild.id
          }, async (err, guildSettings) => {
            if(err) bot.log("databaseError", err);
            if(!guildSettings){bot.log('database', 'guildSettings error')}
            if(guildSettings){

              const showCatEmbed = async (catName) => {
                let embed = new Discord.RichEmbed()
                .setAuthor(message.author.username, message.author.avatarURL)
                .setColor(bot.config.color.cats)
                .setDescription(`You got a ${catName} cat! uwu`);
                if(guildSettings.CatGottenPopupMessage === 'show'){
                  message.channel.send(embed);
                } else if(guildSettings.CatGottenPopupMessage === 'disappear' || guildSettings.CatGottenPopupMessage === true){
                  await message.channel.send(embed).then(msg => msg.delete(6000));
                }
              }

              if(commonCatAmt === commonBaseAmt){
                //* Set Vars For Common Cats
                let animals = bot.catdata.cats('common', 'array');
                let result = Math.floor((Math.random()*animals.length));
        
                //* Add Cat To Their Collection

                userdata.cats[animals[result]] += 1;
                totalList.cats[animals[result]] += 1;
                catName = animals[result];
        
                showCatEmbed(catName);
          
              }
              if(uncommonCatAmt === uncommonBaseAmt){
          
                //* If User Has No Common Cats Don't Give Them Uncommon
                uSiamese = userdata.cats.siamese; uBurmese = userdata.cats.burmese;uRagdoll = userdata.cats.ragdoll;uPersian = userdata.cats.persian;uMaineCoon = userdata.cats.mainecoon;uRussianBlue = userdata.cats.russianblue;
                if(uSiamese === 0 && uBurmese === 0 && uRagdoll === 0 && uPersian === 0 && uMaineCoon === 0 && uRussianBlue === 0){commonCats = false;} else {commonCats = true;}
                if(commonCats === false){return;}
        
                let animals = bot.catdata.cats('uncommon', 'array');
                let result = Math.floor((Math.random() * animals.length));

                userdata.cats[animals[result]] += 1;
                totalList.cats[animals[result]] += 1;
                catName = animals[result];

                showCatEmbed(catName);
              }
              if(rareCatAmt === rareBaseAmt){
                //* If User Has No Uncommon Cats Don't Give Them Rare
                uAbyssinian = userdata.cats.abyssinian;uManx = userdata.cats.manx;uSphynx = userdata.cats.sphynx;uCyprus = userdata.cats.cyprus;uFoldex = userdata.cats.foldex;uTurkishAngora = userdata.cats.turkishangora;
                if(uAbyssinian === 0 && uManx === 0 && uSphynx === 0 && uCyprus === 0 && uFoldex === 0 && uTurkishAngora === 0){uncommonCats = false;} else {uncommonCats = true;}
                if(uncommonCats === false){return;}
        
                let animals = bot.catdata.cats('rare', 'array');
                let result = Math.floor((Math.random() * animals.length));

                userdata.cats[animals[result]] += 1;
                totalList.cats[animals[result]] += 1;
                catName = animals[result];

                showCatEmbed(catName);
              }
              if(specialCatAmt === specialBaseAmt){
          
                //* No Need To Check If They Have Lower Rank || You Can Get Special No Matter What Cats You Have

                let animals = bot.catdata.cats('special', 'array');
                let result = Math.floor((Math.random() * animals.length));
        
                userdata.cats[animals[result]] += 1;
                totalList.cats[animals[result]] += 1;
                catName = animals[result];

                showCatEmbed(catName);
              }
              if(impossibleCatsAmt === impossibleBaseAmt){
                //* Set Vars For Impossible Cats
                let animals = bot.catdata.cats('impossible', 'array');
                let result = Math.floor((Math.random()*animals.length));
        
                userdata.cats[animals[result]] += 1;
                totalList.cats[animals[result]] += 1;
                catName = animals[result];

                showCatEmbed(catName);
              }
            }
            totalList.save().catch(err => console.log(err));
            userdata.save().catch(err => console.log(err));
          });
        }
      });
    }
  });
}