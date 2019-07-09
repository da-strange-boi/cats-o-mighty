const Discord = require("discord.js");

//mongoose vars
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Cat = require("../../moduls/cats.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "295255543596187650"){ return; }
    if(message.author.id === "295255543596187650"){
        if(args[0]){
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!bUser) return message.channel.send("Heyo that person doesn't exist lol");

            Cat.findOne({
                userID: bUser.id
            }, (err, catList) => {
                if(err) console.log(err);
                if(catList){
                    catList.siamese=0;catList.burmese=0;catList.ragdoll=0;catList.persian=0;catList.maineCoon=0;catList.abyssinian=0;catList.manx=0;catList.sphynx=0;catList.cyprus=0;catList.foldex=0;catList.korat=0;catList.singapura=0;catList.tonkinese=0;catList.peterbald=0;catList.chartreux=0;catList.bandit=0;catList.bug=0;catList.linda=0;catList.mittens=0;catList.cash=0;catList.jackson=0;catList.cottonball=0;catList.sonny=0;catList.smokey=0;catList.lailah=0;catList.cher=0;catList.marvin=0;
                    catList.save().catch(err => console.log(err));
                    message.channel.send(`It's been done master!\n${bUser}'s cats have been deleted`);
                }
                if(!catList){
                    return message.channel.send("Heyo that person doesn't exist lol");
                }
                return;
            });
        } else {
            //* Clears Cats Of The Bot Owner (me uwu :)
            Cat.findOne({
                userID: message.author.id
            }, (err, catList) => {
                if(err) console.log(err);
                if(catList){
                    catList.siamese=0;catList.burmese=0;catList.ragdoll=0;catList.persian=0;catList.maineCoon=0;catList.abyssinian=0;catList.manx=0;catList.sphynx=0;catList.cyprus=0;catList.foldex=0;catList.korat=0;catList.singapura=0;catList.tonkinese=0;catList.peterbald=0;catList.chartreux=0;catList.bandit=0;catList.bug=0;catList.linda=0;catList.mittens=0;catList.cash=0;catList.jackson=0;catList.cottonball=0;catList.sonny=0;catList.smokey=0;catList.lailah=0;catList.cher=0;catList.marvin=0;
                    catList.save().catch(err => console.log(err));
                    message.channel.send(`It's been done master!\nYour cats have been deleted uwu`);
                }
            });
            
        }
    }
}

module.exports.help = {
    name: "clearcats",
    aliases: ['cc']
}