const Discord = require("discord.js");
let config = require("../../config.json");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Money = require("../../moduls/money.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "295255543596187650"){ return; }
    if(message.author.id === "295255543596187650"){
        if(!args[0]){
            message.channel.send("nuu that's not how you use that command");
            return;
        }
        if(args[1]){
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!bUser) return message.channel.send("Heyo that person doesn't exist in the database lol");
            let amtMoney = Number(args[1]);

            Money.findOne({
                userID: bUser.id
            }, (err, userMoney) => {
                if(err) console.log(err);
                if(userMoney){
                    userMoney.money = userMoney.money + amtMoney;
                    userMoney.save().catch(err => console.log(err));
                    message.channel.send(`It's been done master!\n$${amtMoney} has been added to ${bUser}'s account`);
                }
                if(!userMoney){
                    return message.channel.send("Heyo that person doesn't exist lol");
                }
                return;
            });

        } else {
            let amtMoney = Number(args[0]);
            Money.findOne({
                userID: message.author.id
            }, (err, userMoney) => {
                if(err) console.log(err);
                if(userMoney){
                    userMoney.money = userMoney.money + amtMoney;
                    userMoney.save().catch(err => console.log(err));
                    message.channel.send(`It's been done master!\n$${amtMoney} has been added to your account`);
                }
                return;
            });
        }
    }
}

module.exports.help = {
    name: "addmoney",
    aliases: ['am']
}