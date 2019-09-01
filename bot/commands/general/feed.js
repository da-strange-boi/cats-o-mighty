const Discord = require("discord.js");
const ms = require('parse-ms');
let cooldown = {};
exports.run = async (bot, message, args) => {

  /* User suggestion
    Maybe do [cat feed] then insert a cat breed then there will be a chance
    you'll get the cat. The chance varies depending on how high the cat is
    from looking in [cat collection]
  */

  if(!args[0]){
    message.channel.send('Check `cat help feed` for more info');
    return;
  }

  //* Set A Cooldown
  if(cooldown[message.author.id] && cooldown[message.author.id] > 0){
    let time = ms(Date.now() - cooldown[message.author.id]);
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)));
    return;
  }
  cooldown[message.author.id] = Date.now();

  bot.db.Userdata.findOne({
    userID: message.author.id
  }, (err, userdata) => {
    if(err) console.log(err);
    if(userdata){

      let catBreed = args[0].toLowerCase().trim();
      let animalList = ['siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'calico', 'tabby', 'abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishangora', 'norwegianforest', 'korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin', 'britishshorthair', 'bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws', 'squirtlett', 'cursedcat', 'uwu', 'tom', 'demoncat'];
      for(let i=0;i<animalList.length;i++){
        if(catBreed === animalList[i]){
          if(i <= 7){catType = 'common'} // common
          if(i >= 8 && i <= 14){catType = 'uncommon'} // uncommon
          if(i >= 15 && i <= 21){catType = 'rare'} // rare
          if(i >= 22 && i <= 36){catType = 'special'} // special
          if(i >= 37){catType = 'impossible'} // impossible

          if(catType === 'common'){
            let commonCatAmt = Math.floor(Math.random() * 13) + 1;
            let commonCatBase = Math.floor(Math.random() * 13) + 1;
            if(commonCatAmt === commonCatBase){
              userdata.cats[animalList[i]] += 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
          if(catType === 'uncommon'){
            let uncommonCatAmt = Math.floor(Math.random() * 40) + 1;
            let uncommonCatBase = Math.floor(Math.random() * 40) + 1;
            if(uncommonCatAmt === uncommonCatBase){
              userdata.cats[animalList[i]] += 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
          if(catType === 'rare'){
            let rareCatAmt = Math.floor(Math.random() * 73) + 1;
            let rareCatBase = Math.floor(Math.random() * 73) + 1;
            if(rareCatAmt === rareCatBase){
              userdata.cats[animalList[i]] += 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
          if(catType === 'special'){
            let specialCatAmt = Math.floor(Math.random() * 185) + 1;
            let specialCatBase = Math.floor(Math.random() * 185) + 1;
            if(specialCatAmt === specialCatBase){
              userdata.cats[animalList[i]] += 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
          if(catType === 'impossible'){
            let impossibleCatAmt = Math.floor(Math.random() * 370) + 1;
            let impossibleCatBase = Math.floor(Math.random() * 370) + 1;
            if(impossibleCatAmt === impossibleCatBase){
              userdata.cats[animalList[i]] += 1;
              let feedSucc = new Discord.RichEmbed()
              .setTitle('ooo look at that!')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} decied to like that you fed it and hopped into your arms`);
              message.channel.send(feedSucc);
            } else {
              let feedFail = new Discord.RichEmbed()
              .setTitle('hmm nothing')
              .setColor(bot.config.color.cats)
              .setDescription(`a ${animalList[i]} liked that you fed it but it ran away`);
              message.channel.send(feedFail);
            }
          }
        }
      }
    }
    userdata.save().catch(err => console.log(err));
  });
  //* Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id];
  }, 3500);
}

exports.help = {
  name: "feed",
  aliases: []
}