const Discord = require("discord.js");

//mongoose vars
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
                    userdata.cats.siamese=0;userdata.cats.burmese=0;userdata.cats.ragdoll=0;userdata.cats.persian=0;userdata.cats.mainecoon=0;userdata.cats.russianblue=0;userdata.cats.abyssinian=0;userdata.cats.manx=0;userdata.cats.sphynx=0;userdata.cats.cyprus=0;userdata.cats.foldex=0;userdata.cats.turkishangora=0;userdata.cats.korat=0;userdata.cats.singapura=0;userdata.cats.tonkinese=0;userdata.cats.peterbald=0;userdata.cats.chartreux=0;userdata.cats.munchkin=0;userdata.cats.bandit=0;userdata.cats.bug=0;userdata.cats.linda=0;userdata.cats.mittens=0;userdata.cats.cash=0;userdata.cats.jackson=0;userdata.cats.cottonball=0;userdata.cats.sonny=0;userdata.cats.smokey=0;userdata.cats.lailah=0;userdata.cats.cher=0;userdata.cats.marvin=0;userdata.cats.loki=0;userdata.cats.loverboy=0;userdata.cats.squirtlett=0;userdata.cats.cursedcat=0;userdata.cats.uwu=0;
                    userdata.save().catch(err => console.log(err));
                    message.channel.send(`Yep`);
                }
                if(!userdata){
                    return message.channel.send("Heyo that person doesn't exist lol");
                }
                return;
            });
        } else {
            //* Clears Cats Of The Bot Owner (me uwu :)
            Userdata.findOne({
                userID: message.author.id
            }, (err, userdata) => {
                if(err) console.log(err);
                if(userdata){
                    userdata.cats.siamese=0;userdata.cats.burmese=0;userdata.cats.ragdoll=0;userdata.cats.persian=0;userdata.cats.mainecoon=0;userdata.cats.russianblue=0;userdata.cats.abyssinian=0;userdata.cats.manx=0;userdata.cats.sphynx=0;userdata.cats.cyprus=0;userdata.cats.foldex=0;userdata.cats.turkishangora=0;userdata.cats.korat=0;userdata.cats.singapura=0;userdata.cats.tonkinese=0;userdata.cats.peterbald=0;userdata.cats.chartreux=0;userdata.cats.munchkin=0;userdata.cats.bandit=0;userdata.cats.bug=0;userdata.cats.linda=0;userdata.cats.mittens=0;userdata.cats.cash=0;userdata.cats.jackson=0;userdata.cats.cottonball=0;userdata.cats.sonny=0;userdata.cats.smokey=0;userdata.cats.lailah=0;userdata.cats.cher=0;userdata.cats.marvin=0;userdata.cats.loki=0;userdata.cats.loverboy=0;userdata.cats.squirtlett=0;userdata.cats.cursedcat=0;userdata.cats.uwu=0;
                    userdata.save().catch(err => console.log(err));
                    message.channel.send(`Yep`);
                }
            });
        }
    }
}

module.exports.help = {
    name: "clearcats",
    aliases: ['cc']
}