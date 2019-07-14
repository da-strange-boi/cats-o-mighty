const Discord = require("discord.js");
let config = require("../../config.json");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Cat = require("../../moduls/cats.js");

module.exports.run = async (bot, message, args) => {
    if(message.author.id != "295255543596187650"){ return; }
    if(message.author.id === "295255543596187650"){
        //USAGE cat addcat {cat name} {amount} || addcat {@user} {cat name} {amount}
        //TODO The Whole Command

        //* If Command Isn't Use Properly
        if(!args[0] || !args[1]){
            message.channel.send("check `cat help addcat` you fucking dumbass")
        }

        //USAGE addcat {@user} {cat name} {amount}
        if(args[2]){
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!bUser) return message.channel.send("Heyo that person doesn't exist in the database lol");
            let amtCat = Number(args[2]);

            Cat.findOne({
                userID: bUser.id
            }, (err, catList) => {
                if(err) console.log(err);

                if(args[1] === "siamese"){catList.siamese = catList.siamese + amtCat;}if(args[1] === "burmese"){catList.burmese = catList.burmese + amtCat;}if(args[1] === "ragdoll"){catList.ragdoll = catList.ragdoll + amtCat;}if(args[1] === "persian"){catList.persian = catList.persian + amtCat;}if(args[1] === "maine coon" || args[1] === "mainecoon"){catList.maineCoon = catList.maineCoon + amtCat;}if(args[1] === "russianblue"){catList.russianBlue = catList.russianBlue + amtCat;}
                if(args[1] === "abyssinian"){catList.abyssinian = catList.abyssinian + amtCat;}if(args[1] === "manx"){catList.manx = catList.manx + amtCat;}if(args[1] === "sphynx"){catList.sphynx = catList.sphynx + amtCat;}if(args[1] === "cyprus"){catList.cyprus = catList.cyprus + amtCat;}if(args[1] === "foldex"){catList.foldex = catList.foldex + amtCat;}
                if(args[1] === "korat"){catList.korat = catList.korat + amtCat;}if(args[1] === "singapura"){catList.singapura = catList.singapura + amtCat;}if(args[1] === "tonkinese"){catList.tonkinese = catList.tonkinese + amtCat;}if(args[1] === "peterbald"){catList.peterbald = catList.peterbald + amtCat;}if(args[1] === "chartreux"){catList.chartreux = catList.chartreux + amtCat;}if(args[1] === "munchkin"){catList.munchkin = catList.munchkin + amtCat;}
                if(args[1] === "bandit"){catList.bandit = catList.bandit + amtCat;}if(args[1] === "bug"){catList.bug = catList.bug + amtCat;}if(args[1] === "linda"){catList.linda = catList.linda + amtCat;}if(args[1] === "mittens"){catList.mittens = catList.mittens + amtCat;}if(args[1] === "cash"){catList.cash = catList.cash + amtCat;}if(args[1] === "jackson"){catList.jackson = catList.jackson + amtCat;}if(args[1] === "cottonball"){catList.cottonball = catList.cottonball + amtCat;}if(args[1] === "sonny"){catList.sonny = catList.sonny + amtCat;}if(args[1] === "smokey"){catList.smokey = catList.smokey + amtCat;}if(args[1] === "lailah"){catList.lailah = catList.lailah + amtCat;}if(args[1] === "cher"){catList.cher = catList.cher + amtCat;}if(args[1] === "marvin"){catList.marvin = catList.marvin + amtCat;}if(args[1] === "loki"){catList.loki = catList.loki + amtCat;}if(args[1] === "pancake"){catList.pancake = catList.pancake + amtCat;}
                if(args[1] === "squirtlett"){catList.squirtlett = catList.squirtlett + amtCat;}if(args[1] === "cursedcat"){catList.cursedcat = catList.cursedcat + amtCat};

                catList.save().catch(err => console.log(err));

                message.channel.send(`The catto been addo!\n${args[2]} ${args[1]}'s has been added to ${bUser} account`);
            });
            return;
        }

        //USAGE cat addcat {cat name} {amount}
        if(args[1]){
            //* Select My Data From The Database
            Cat.findOne({
                userID: message.author.id
            }, (err, catList) => {
                if(err) console.log(err);

                let amtCat = Number(args[1]);

                if(args[0] === "siamese"){catList.siamese = catList.siamese + amtCat;}if(args[0] === "burmese"){catList.burmese = catList.burmese + amtCat;}if(args[0] === "ragdoll"){catList.ragdoll = catList.ragdoll + amtCat;}if(args[0] === "persian"){catList.persian = catList.persian + amtCat;}if(args[0] === "maine coon" || args[0] === "mainecoon"){catList.maineCoon = catList.maineCoon + amtCat;}if(args[0] === "russianblue"){catList.russianBlue = catList.russianBlue + amtCat;}
                if(args[0] === "abyssinian"){catList.abyssinian = catList.abyssinian + amtCat;}if(args[0] === "manx"){catList.manx = catList.manx + amtCat;}if(args[0] === "sphynx"){catList.sphynx = catList.sphynx + amtCat;}if(args[0] === "cyprus"){catList.cyprus = catList.cyprus + amtCat;}if(args[0] === "foldex"){catList.foldex = catList.foldex + amtCat;}if(args[0] === "turkishangora"){catList.turkishAngora = catList.turkishAngora + amtCat;}
                if(args[0] === "korat"){catList.korat = catList.korat + amtCat;}if(args[0] === "singapura"){catList.singapura = catList.singapura + amtCat;}if(args[0] === "tonkinese"){catList.tonkinese = catList.tonkinese + amtCat;}if(args[0] === "peterbald"){catList.peterbald = catList.peterbald + amtCat;}if(args[0] === "chartreux"){catList.chartreux = catList.chartreux + amtCat;}if(args[0] === "munchkin"){catList.munchkin = catList.munchkin + amtCat;}
                if(args[0] === "bandit"){catList.bandit = catList.bandit + amtCat;}if(args[0] === "bug"){catList.bug = catList.bug + amtCat;}if(args[0] === "linda"){catList.linda = catList.linda + amtCat;}if(args[0] === "mittens"){catList.mittens = catList.mittens + amtCat;}if(args[0] === "cash"){catList.cash = catList.cash + amtCat;}if(args[0] === "jackson"){catList.jackson = catList.jackson + amtCat;}if(args[0] === "cottonball"){catList.cottonball = catList.cottonball + amtCat;}if(args[0] === "sonny"){catList.sonny = catList.sonny + amtCat;}if(args[0] === "smokey"){catList.smokey = catList.smokey + amtCat;}if(args[0] === "lailah"){catList.lailah = catList.lailah + amtCat;}if(args[0] === "cher"){catList.cher = catList.cher + amtCat;}if(args[0] === "marvin"){catList.marvin = catList.marvin + amtCat;}if(args[0] === "loki"){catList.loki = catList.loki + amtCat;}if(args[0] === "pancake"){catList.pancake = catList.pancake + amtCat;}
                if(args[0] === "squirtlett"){catList.squirtlett = catList.squirtlett + amtCat;}if(args[0] === "cursedcat"){catList.cursedcat = catList.cursedcat + amtCat};

                catList.save().catch(err => console.log(err));

                message.channel.send(`The catto been addo!\n${args[1]} ${args[0]}'s has been added to your account`);
            });
        }
    }
}

module.exports.help = {
    name: "addcat",
    aliases: ['ac']
}