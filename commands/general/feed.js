const Discord = require("discord.js");
const config = require("../../config.json");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Cat = require("../../moduls/cats.js");

module.exports.run = async (bot, message, args) => {

  /* User suggestion
    Maybe do [cat feed] then insert a cat breed then there will be a chance
    you'll get the cat. The chance varies depending on how high the cat is
    from looking in [cat collection]
  */

  if(!args[0]){
    message.channel.send('Check `cat help feed` for more info');
    return;
  }

  Cat.findOne({
    userID: message.author.id
  }, (err, catList) => {
    if(err) console.log(err);
    if(catList){

      let catBreed = args[0].toLowerCase().trim();

      animalList = ['siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishangora', 'korat', 'singapura', 'tonkinese', 'perterbald', 'chartreux', 'munchkin', 'bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'laliah', 'cher', 'marvin', 'loki', 'pancake', 'squirtlett', 'cursedcat', 'UWU'];
      for(let i=0;i<animalList.length;i++){
        if(catBreed === animalList[i]){
          if(i <= 5){catType = 'common'}
          if(i >= 7 && i <= 11){catType = 'uncommon'}
          if(i >= 12 && i <= 17){catType = 'rare'}
          if(i >= 18 && i <= 31){catType = 'special'}
          if(i >= 32){catType = 'impossible'}

          if(catType === 'common'){
            let commonCatAmt = Math.floor(Math.random() * 25) + 1;
            let commonCatBase = Math.floor(Math.random() * 25) + 1;
            if(commonCatAmt === commonCatBase){
              catList[animalList[i]] = catList[animalList[i]] + 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
          if(catType === 'uncommon'){
            let uncommonCatAmt = Math.floor(Math.random() * 80) + 1;
            let uncommonCatBase = Math.floor(Math.random() * 80) + 1;
            if(uncommonCatAmt === uncommonCatBase){
              catList[animalList[i]] = catList[animalList[i]] + 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
          if(catType === 'rare'){
            let rareCatAmt = Math.floor(Math.random() * 145) + 1;
            let rareCatBase = Math.floor(Math.random() * 145) + 1;
            if(rareCatAmt === rareCatBase){
              catList[animalList[i]] = catList[animalList[i]] + 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
          if(catType === 'special'){
            let specialCatAmt = Math.floor(Math.random() * 370) + 1;
            let specialCatBase = Math.floor(Math.random() * 370) + 1;
            if(specialCatAmt === specialCatBase){
              catList[animalList[i]] = catList[animalList[i]] + 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
          if(catType === 'impossible'){
            let impossibleCatAmt = Math.floor(Math.random() * 740) + 1;
            let impossibleCatBase = Math.floor(Math.random() * 740) + 1;
            if(impossibleCatAmt === impossibleCatBase){
              catList[animalList[i]] = catList[animalList[i]] + 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
        }
      }
    }
    catList.save().catch(err => console.log(err));
  });
}

module.exports.help = {
  name: "feed",
  aliases: []
}