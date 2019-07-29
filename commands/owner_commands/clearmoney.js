const Discord = require("discord.js");
let config = require("../../config.json");

const Userdata = require("../../moduls/userdata.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "295255543596187650"){ return; }
    if(message.author.id === "295255543596187650"){
        if(args[0]){
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!bUser) return message.channel.send("Heyo that person doesn't exist lol");

            Userdata.findOne({
                userID: bUser.id
            }, (err, userdata) => {
                if(err) console.log(err);
                if(userdata){
                    userdata.money.catmoney = 0;
                    userdata.save().catch(err => console.log(err));
                    message.channel.send(`It's been done master!\nmoney has been cleared from ${bUser}'s account`);
                }
                if(!userdata){
                    return message.channel.send("Heyo that person doesn't exist in the database lol");
                }
                return;
            });

        } else if(!args[0]) {
            Userdata.findOne({
                userID: message.author.id
            }, (err, userdata) => {
                if(err) console.log(err);
                if(userdata){
                    userdata.money.catmoney = 0;
                    userdata.save().catch(err => console.log(err));
                    message.channel.send(`It's been done master!\nmoney has been cleard from your account`);
                }
                return;
            });
        }
    }
}

module.exports.help = {
    name: "clearmoney",
    aliases: ['cm']
}