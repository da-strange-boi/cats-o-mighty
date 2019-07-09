const Discord = require("discord.js");
let config = require("../../config.json");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Money = require("../../moduls/money.js");

module.exports.run = async (bot, message, args) => {

    //USAGE cat money|cash

    Money.findOne({
        userID: message.author.id
    }, (err, userMoney) => {
        if(err) console.log(err);
        if(userMoney){

            userMoney.userUsername = message.author.username;

            //* Remove me from the leaderboard
            if(message.author.id != "295255543596187650"){
                userMoney.placeholder = "global";
            }
            
            // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
            function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
                try {
                  decimalCount = Math.abs(decimalCount);
                  decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
              
                  const negativeSign = amount < 0 ? "-" : "";
              
                  let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                  let j = (i.length > 3) ? i.length % 3 : 0;
              
                  return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
                } catch (e) {
                  console.log(e)
                }
              };
            // end of code i copied

            let uMoney = userMoney.money;
            let moneyEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setColor(config.color.cats)
            .setDescription(`You have **$${formatMoney(uMoney)}**`);
            message.channel.send(moneyEmbed)

            userMoney.save().catch(err => console.log(err));
        }
    });
}

module.exports.help = {
    name: "money",
    aliases: ['cash']
}