const Discord = require("discord.js");
const ms = require('parse-ms');
let config = require("../../config.json");
const Userdata = require("../../moduls/userdata.js");
let cooldown = {};

const hasTag = (t) => {
  let regex = /#[0-9]{4}$/g;
  return regex.test(t);
}

module.exports.run = async (bot, message, args) => {

  //* Set A Cooldown
  if(cooldown[message.author.id] && cooldown[message.author.id > 0]){
    let time = ms(Date.now() - cooldown[message.author.id]);
    message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)));
    return;
  }
  cooldown[message.author.id] = Date.now();

  //* Select User Data From Database
  Userdata.find({}).sort([
    ['money.catmoney', 'descending']
  ]).exec((err, userdata) => {
    if(err) console.log(err);
    let member;

    // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
    function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {try {decimalCount = Math.abs(decimalCount);decimalCount = isNaN(decimalCount) ? 2 : decimalCount;const negativeSign = amount < 0 ? "-" : "";let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();let j = (i.length > 3) ? i.length % 3 : 0;return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");} catch (e) {console.log(e)}};
    // end of code i copied
    
    let embed = new Discord.RichEmbed()
    .setTitle("**Leaderboard**")

    //* If There Are No Results
    if(userdata.length === 0){
      embed.setColor(config.color.error);
      embed.addField("No data found", "Sell some cats to be on the leaderboard")
        
    } else if (userdata.length < 10){
      //* If Less Then 10 Results
      embed.setColor(config.color.cats);
      for(i = 0; i < userdata.length; i++) {
        //* Will use later
        // if(message.author.id === "295255543596187650"){member = userdata[i].userTag
        // }else{member = userdata[i].userTag.slice(0, -5)}
        member = userdata[i].userTag
        if(userdata[i].userTag != "da strange boi" && userdata[i].userTag != "da strange boi#7087"){
          if(i === 0){embed.addField(`${i + 1}. <:gold:579860509264969739> ${member} <:gold:579860509264969739>`, `Cat Money: **$${formatMoney(userdata[i].money.catmoney)}**`);}
          else if(i === 1){embed.addField(`${i + 1}. <:silver:579860480500301844> ${member} <:silver:579860480500301844>`, `Cat Money: **$${formatMoney(userdata[i].money.catmoney)}**`);}
          else if(i === 2){embed.addField(`${i + 1}. <:bronze:579860359196704770> ${member} <:bronze:579860359196704770>`, `Cat Money: **$${formatMoney(userdata[i].money.catmoney)}**`);}
          else if(i > 2){embed.addField(`${i + 1}. ${member}`, `Cat Money: **$${formatMoney(userdata[i].money.catmoney)}**`);}
        }
      }   
    } else {
      //* If More Then 10 Results
      embed.setColor(config.color.cats);
      for(i = 0; i < 10; i++) {
        //* Will use later
        if(message.author.id === "295255543596187650"){member = userdata[i].userTag
        }else{
          if(hasTag(userdata[i].userTag) === true){
            member = userdata[i].userTag.slice(0, -5)
          } else {
            member = userdata[i].userTag
          }
        }
        if(i === 0){embed.addField(`${i + 1}. <:gold:579860509264969739> \`${member}\` <:gold:579860509264969739>`, `Cat Money: **$${formatMoney(userdata[i].money.catmoney)}**`);}
        else if(i === 1){embed.addField(`${i + 1}. <:silver:579860480500301844> \`${member}\` <:silver:579860480500301844>`, `Cat Money: **$${formatMoney(userdata[i].money.catmoney)}**`);}
        else if(i === 2){embed.addField(`${i + 1}. <:bronze:579860359196704770> \`${member}\` <:bronze:579860359196704770>`, `Cat Money: **$${formatMoney(userdata[i].money.catmoney)}**`);}
        else if(i > 2){embed.addField(`${i + 1}. \`${member}\``, `Cat Money: **$${formatMoney(userdata[i].money.catmoney)}**`);}
      }
    }
    message.channel.send(embed);
  });
  //* Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id];
  }, 3500);
}

module.exports.help = {
  name: "leaderboard",
  aliases: ['leaderboards', 'lb']
}