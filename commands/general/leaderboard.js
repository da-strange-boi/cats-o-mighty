// discord / json vars
const Discord = require("discord.js");
let config = require("../../config.json");

//mongoose vars
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Money = require("../../moduls/money.js");

module.exports.run = async (bot, message, args) => {

  //* Select User Data From Database
  Money.find({
    placeholder: "global"
  }).sort([
    ['money', 'descending']
  ]).exec((err, res) => {
    if(err) console.log(err);

      // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
      function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {try {decimalCount = Math.abs(decimalCount);decimalCount = isNaN(decimalCount) ? 2 : decimalCount;const negativeSign = amount < 0 ? "-" : "";let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();let j = (i.length > 3) ? i.length % 3 : 0;return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");} catch (e) {console.log(e)}};
      // end of code i copied
      
      let embed = new Discord.RichEmbed()
      .setTitle("**Leaderboard**")

      //* If There Are No Results
      if(res.length === 0){
        embed.setColor(config.color.error);
        embed.addField("No data found", "Sell some cats to be on the leaderboard")
          
      } else if (res.length < 10){
        //* If Less Then 10 Results
        embed.setColor(config.color.cats);
        for(i = 0; i < res.length; i++) {
          let member = res[i].userUsername;
          if(i === 0){embed.addField(`${i + 1}. <:gold:579860509264969739> ${member} <:gold:579860509264969739>`, `Money: **$${formatMoney(res[i].money)}**`);}
          else if(i === 1){embed.addField(`${i + 1}. <:silver:579860480500301844> ${member} <:silver:579860480500301844>`, `Money: **$${formatMoney(res[i].money)}**`);}
          else if(i === 2){embed.addField(`${i + 1}. <:bronze:579860359196704770> ${member} <:bronze:579860359196704770>`, `Money: **$${formatMoney(res[i].money)}**`);}
          else if(i > 2){embed.addField(`${i + 1}. ${member}`, `Money: **$${formatMoney(res[i].money)}**`);}
        }   
      } else {
        //* If More Then 10 Results
        embed.setColor(config.color.cats);
        for(i = 0; i < 10; i++) {
          let member = res[i].userUsername;
          if(member === "da strange boi"){ i++; }
          if(i === 0){embed.addField(`${i + 1}. <:gold:579860509264969739> ${member} <:gold:579860509264969739>`, `Money: **$${formatMoney(res[i].money)}**`);}
          else if(i === 1){embed.addField(`${i + 1}. <:silver:579860480500301844> ${member} <:silver:579860480500301844>`, `Money: **$${formatMoney(res[i].money)}**`);}
          else if(i === 2){embed.addField(`${i + 1}. <:bronze:579860359196704770> ${member} <:bronze:579860359196704770>`, `Money: **$${formatMoney(res[i].money)}**`);}
          else if(i > 2){embed.addField(`${i + 1}. ${member}`, `Money: **$${formatMoney(res[i].money)}**`);}
        }
      }
    message.channel.send(embed);
  });
}

module.exports.help = {
  name: "leaderboard",
  aliases: ['leaderboards', 'lb']
}