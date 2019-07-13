//* Discord.js / Json Vars
const Discord = require("discord.js");
let config = require("../config.json");

//* Mongoose Vars (database)
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Cat = require("../moduls/cats.js");
const totalCat = require("../moduls/totalCat.js");

bot.on("message", async message => {

    //* Block Ethan from getting cats
    //He realized he wasn't getting cats :(
    //if(message.author.id === "481318379907579916") return;

    //* Checks To See If Another Bot Sent A Message Or If A User Trys To DM The Bot && Make Sure It Doesn't Respond
    if (message.author.bot || message.channel.type === "dm"){
        return;
    };

    //* The Random Way To Get Cats
    // common: 30 || uncommon: 70 || rare: 150 || special: 350
    // common: 20 || uncommon: 50 || rare: 130 || special: 270 - updated: 5/17/19
    // common: 25 || uncommon: 60 || rare: 145 || special: 290 || impossible: 550 - updated: 5/24/19
    // common: 25 || uncommon: 80 || rare: 145 || special: 370 || impossible: 740 - updated: 6/7/19
    
    let commonCatAmt = Math.floor(Math.random() * 25) + 1;
    let commonBaseAmt = Math.floor(Math.random() * 25) + 1;

    let uncommonCatAmt = Math.floor(Math.random() * 80) + 1;
    let uncommonBaseAmt = Math.floor(Math.random() * 80) + 1;

    let rareCatAmt = Math.floor(Math.random() * 145) + 1;
    let rareBaseAmt = Math.floor(Math.random() * 145) + 1;

    let specialCatAmt = Math.floor(Math.random() * 370) + 1;
    let specialBaseAmt = Math.floor(Math.random() * 370) + 1;

    let impossibleCatsAmt = Math.floor(Math.random() * 740) + 1;
    let impossibleBaseAmt = Math.floor(Math.random() * 740) + 1;

    Cat.findOne({
        userID: message.author.id
    }, (err, catList) => {
        if(err) console.log(err);
        if(catList){

            totalCat.findOne({
                totalcat: "placeholder"
            }, (err, catTotalList) => {
                if(err) console.log(err);
                if(catTotalList){
                    
                    if(commonCatAmt === commonBaseAmt){
                        //* Set Vars For Common Cats
                        let animales = ['siamese', 'burmese', 'ragdoll', 'cyprus', 'maineCoon', 'russianBlue'];
                        let result = Math.floor((Math.random()*animales.length));
                
                        //* Check To See What Cat It Is Then Add It To Their Cats
                
                        if(result === 0){catList.siamese = catList.siamese + 1;catTotalList.siamese = catTotalList.siamese + 1; catName = "siamese";}
                        if(result === 1){catList.burmese = catList.burmese + 1;catTotalList.burmese = catTotalList.burmese + 1; catName = "burmese";}
                        if(result === 2){catList.ragdoll = catList.ragdoll + 1;catTotalList.ragdoll = catTotalList.ragdoll + 1; catName = "ragdoll";}
                        if(result === 3){catList.persian = catList.persian + 1;catTotalList.persian = catTotalList.persian + 1; catName = "persian";}
                        if(result === 4){catList.maineCoon = catList.maineCoon + 1;catTotalList.maineCoon = catTotalList.maineCoon + 1; catName = "maine coon";}
                        if(result === 5){catList.russianBlue = catList.russianBlue + 1;catTotalList.russianBlue = catTotalList.russianBlue + 1; catName = "russian blue";}
                
                        //* Start Embed To Show That They Got A Common Cat
                        let commonCatEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setColor(config.color.cats)
                        .setDescription("You got an " + catName + " cat! uwu");
                        message.channel.send(commonCatEmbed).then(msg => msg.delete(6000));
                
                    }
                    if(uncommonCatAmt === uncommonBaseAmt){
                
                        //* If User Has No Common Cats Don't Give Them Uncommon
                        uSiamese = catList.siamese; uBurmese = catList.burmese;uRagdoll = catList.ragdoll;uPersian = catList.persian;uMaineCoon = catList.maineCoon;uRussianBlue = catList.russianBlue;
                        if(uSiamese === 0 && uBurmese === 0 && uRagdoll === 0 && uPersian === 0 && uMaineCoon === 0 && uRussianBlue === 0){commonCats = false;} else {commonCats = true;}
                        if(commonCats === false){return;}
                
                        //* Set Vars For Uncommon Cats
                        let animales = ['abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishAngora'];
                        let result = Math.floor((Math.random() * animales.length));
                
                        //* Check To See What Cat It Is Then Add It To Their Cats
                        if(result === 0){catList.abyssinian = catList.abyssinian + 1;catTotalList.abyssinian = catTotalList.abyssinian + 1; catName = "abyssinian";}
                        if(result === 1){catList.manx = catList.manx + 1;catTotalList.manx = catTotalList.manx + 1; catName = "manx";}
                        if(result === 2){catList.sphynx = catList.sphynx + 1;catTotalList.sphynx = catTotalList.sphynx + 1; catName = "sphynx";}
                        if(result === 3){catList.cyprus = catList.cyprus + 1;catTotalList.cyprus = catTotalList.cyprus + 1; catName = "cyprus";}
                        if(result === 4){catList.foldex = catList.foldex + 1;catTotalList.foldex = catTotalList.foldex + 1; catName = "foldex";}
                        if(result === 5){catList.turkishAngora = catList.turkishAngora + 1;catTotalList.turkishAngora = catTotalList.turkishAngora + 1; catName = "turkish angora";}

                        //* Start Embed To Show That They Got A Uncommon Cat
                        let uncommonCatEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setColor(config.color.cats)
                        .setDescription("You got an " + catName + " cat! uwu");
                        message.channel.send(uncommonCatEmbed).then(msg => msg.delete(6000));
                    }
                    if(rareCatAmt === rareBaseAmt){
                        //* If User Has No Uncommon Cats Don't Give Them Rare
                        uAbyssinian = catList.abyssinian;uManx = catList.manx;uSphynx = catList.sphynx;uCyprus = catList.cyprus;uFoldex = catList.foldex;uTurkishAngora = catList.turkishAngora;
                        if(uAbyssinian === 0 && uManx === 0 && uSphynx === 0 && uCyprus === 0 && uFoldex === 0 && uTurkishAngora === 0){uncommonCats = false;} else {uncommonCats = true;}
                        if(uncommonCats === false){return;}
                
                        //* Set Vars For Rare Cats
                        let animales = ['korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin'];
                        let result = Math.floor((Math.random() * animales.length));
                
                        //* Check To See What Cat It Is Then Add It To Their Cats
                        if(result === 0){catList.korat = catList.korat + 1;catTotalList.korat = catTotalList.korat + 1; catName = "korat";}
                        if(result === 1){catList.singapura = catList.singapura + 1;catTotalList.singapura = catTotalList.singapura + 1; catName = "singapura";}
                        if(result === 2){catList.tonkinese = catList.tonkinese + 1;catTotalList.tonkinese = catTotalList.tonkinese + 1; catName = "tonkinese";}
                        if(result === 3){catList.peterbald = catList.peterbald + 1;catTotalList.peterbald = catTotalList.peterbald + 1; catName = "peterbald";}
                        if(result === 4){catList.chartreux = catList.chartreux + 1;catTotalList.chartreux = catTotalList.chartreux + 1; catName = "chartreux";}
                        if(result === 5){catList.munchkin = catList.munchkin + 1;catTotalList.munchkin = catTotalList.munchkin + 1; catName = "munchkin";}

                        //* Start Embed To Show That They Got A Rare Cat
                        let rareCatEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setColor(config.color.cats)
                        .setDescription("You got an " + catName + " cat! uwu");
                        message.channel.send(rareCatEmbed).then(msg => msg.delete(6000));
                    }
                    if(specialCatAmt === specialBaseAmt){
                
                        //* No Need To Check If They Have Lower Rank || You Can Get Special No Matter What Cats You Have
                        
                        //* Set Vars For Special Cats
                        let animales = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin'];
                        let result = Math.floor((Math.random() * animales.length));
                
                        //* Check To See What Cat It Is Then Add It To Their Cats
                        if(result === 0){catList.bandit = catList.bandit + 1;catTotalList.bandit = catTotalList.bandit + 1; catName = "bandit";}
                        if(result === 1){catList.bug = catList.bug + 1;catTotalList.bug = catTotalList.bug + 1; catName = "bug";}
                        if(result === 2){catList.linda = catList.linda + 1;catTotalList.linda = catTotalList.linda + 1; catName = "linda";}
                        if(result === 3){catList.mittens = catList.mittens + 1;catTotalList.mittens = catTotalList.mittens + 1; catName = "mittens";}
                        if(result === 4){catList.cash = catList.cash + 1;catTotalList.cash = catTotalList.cash + 1; catName = "cash";}
                        if(result === 5){catList.jackson = catList.jackson + 1;catTotalList.jackson = catTotalList.jackson + 1; catName = "jackson";}
                        if(result === 6){catList.cottonball = catList.cottonball + 1;catTotalList.cottonball = catTotalList.cottonball + 1; catName = "cottonball";}
                        if(result === 7){catList.sonny = catList.sonny + 1;catTotalList.sonny = catTotalList.sonny + 1; catName = "sonny";}
                        if(result === 8){catList.smokey = catList.smokey + 1;catTotalList.smokey = catTotalList.smokey + 1; catName = "smokey";}
                        if(result === 9){catList.lailah = catList.lailah + 1;catTotalList.lailah = catTotalList.lailah + 1; catName = "lailah";}
                        if(result === 10){catList.cher = catList.cher + 1;catTotalList.cher = catTotalList.cher + 1; catName = "cher";}
                        if(result === 11){catList.marvin = catList.marvin + 1;catTotalList.marvin = catTotalList.marvin + 1; catName = "marvin";}
                
                        //* Start Embed To Show That They Got A Special Cat
                        let specialCatEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setColor(config.color.cats)
                        .setDescription("You got an " + catName + "! uwu");
                        message.channel.send(specialCatEmbed).then(msg => msg.delete(6000));
                    }
                    if(impossibleCatsAmt === impossibleBaseAmt){
                        //* Set Vars For Impossible Cats
                        let animales = ['squirtlett', 'cursedcat'];
                        let result = Math.floor((Math.random()*animales.length));
                
                        //* Check To See What Cat It Is Then Add It To Their Cats
                
                        if(result === 0){catList.squirtlett = catList.squirtlett + 1;catTotalList.squirtlett = catTotalList.squirtlett + 1; catName = "squirtlett";}
                        if(result === 1){catList.cursedcat = catList.cursedcat + 1;catTotalList.cursedcat = catTotalList.cursedcat + 1; catName = "cursed cat";}

                        //* Start Embed To Show That They Got A Common Cat
                        let impossibleCatEmbed = new Discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setColor(config.color.cats)
                        .setDescription("You got an " + catName + " cat! uwu");
                        message.channel.send(impossibleCatEmbed).then(msg => msg.delete(6000));
                
                    }

                }
                if(!catTotalList){
                    const newTotal = new totalCat({
                        totalcat: "placeholder",siamese: 0,burmese: 0,ragdoll: 0,persian: 0,maineCoon: 0,russianBlue: 0,abyssinian: 0,manx: 0,sphynx: 0,cyprus: 0,foldex: 0,turkishAngora: 0,korat: 0,singapura: 0,tonkinese: 0,peterbald: 0,chartreux: 0,munchkin: 0,bandit: 0,bug: 0,linda: 0,mittens: 0,cash: 0,jackson: 0,cottonball: 0,sonny: 0,smokey: 0,lailah: 0,cher: 0,marvin: 0,squirtlett: 0,cursecat: 0
                    })
                    newTotal.save().catch(err => console.log(err));
                    return;
                }
                catTotalList.save().catch(err => console.log(err));
                catList.save().catch(err => console.log(err));
            });
        }
    });
});