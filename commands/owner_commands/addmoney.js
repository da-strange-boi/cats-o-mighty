const Discord = require("discord.js");
let config = require("../../config.json");
const Userdata = require("../../moduls/userdata.js");

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

            Userdata.findOne({
                userID: bUser.id
            }, (err, userdata) => {
                if(err) console.log(err);
                if(userdata){
                    userdata.money.catmoney += amtMoney;
                    userdata.save().catch(err => console.log(err));
                    message.channel.send(`Yes`);
                }
                if(!userdata){
                    return message.channel.send("Heyo that person doesn't exist lol");
                }
                return;
            });

        } else {
            let amtMoney = Number(args[0]);
            Userdata.findOne({
                userID: message.author.id
            }, (err, userdata) => {
                if(err) console.log(err);
                if(userdata){
                    userdata.money.catmoney += amtMoney;
                    userdata.save().catch(err => console.log(err));
                    message.channel.send(`Yes`);
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