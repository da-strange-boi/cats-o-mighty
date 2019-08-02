//* Discord.js / Json Vars
const Discord = require("discord.js");
let config = require("../config.json");

const Userdata = require("../moduls/userdata.js");
const Guildsettings = require("../moduls/guildsettings.js");
const Totals = require("../moduls/totals.js");

bot.on("message", async message => {

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

    Userdata.findOne({
        userID: message.author.id
    }, (err, userdata) => {
        if(err) console.log(err);
        if(userdata){
            

            Totals.findOne({}, (err, totalList) => {
                if(err) console.log(err);
                if(!totalList){
                    const total = new Totals({
                        cats: {siamese: 0,burmese: 0,ragdoll: 0,persian: 0,mainecoon: 0,russianblue: 0,abyssinian: 0,manx: 0,sphynx: 0,cyprus: 0,foldex: 0,turkishangora: 0,korat: 0,singapura: 0,tonkinese: 0,peterbald: 0,chartreux: 0,munchkin: 0,bandit: 0,bug: 0,linda: 0,mittens: 0,cash: 0,jackson: 0,cottonball: 0,sonny: 0,smokey: 0,lailah: 0,cher: 0,marvin: 0,loki: 0,loverboy: 0,squirtlett: 0,cursedcat: 0,uwu: 0}
                    });
                    total.save().catch(err => console.log(err));
                }
                if(totalList){

                    Guildsettings.findOne({
                        guildID: message.guild.id
                    }, (err, guildSettings) => {
                        if(err) console.log(err);
                        if(!guildSettings){console.log('guildSettings error')}
                        if(guildSettings){

                            if(commonCatAmt === commonBaseAmt){
                                //* Set Vars For Common Cats
                                let animales = ['siamese', 'burmese', 'ragdoll', 'cyprus', 'mainecoon', 'russianblue'];
                                let result = Math.floor((Math.random()*animales.length));
                        
                                //* Check To See What Cat It Is Then Add It To Their Cats
                        
                                if(result === 0){userdata.cats.siamese += 1;totalList.cats.siamese += 1; catName = "siamese";}
                                if(result === 1){userdata.cats.burmese += 1;totalList.cats.burmese += 1; catName = "burmese";}
                                if(result === 2){userdata.cats.ragdoll += 1;totalList.cats.ragdoll += 1; catName = "ragdoll";}
                                if(result === 3){userdata.cats.persian += 1;totalList.cats.persian += 1; catName = "persian";}
                                if(result === 4){userdata.cats.mainecoon += 1;totalList.cats.mainecoon += 1; catName = "maine coon";}
                                if(result === 5){userdata.cats.russianblue += 1;totalList.cats.russianblue += 1; catName = "russian blue";}
                        
                                //* Start Embed To Show That They Got A Common Cat
                                if(guildSettings.CatGottenPopupMessage === true){
                                    let commonCatEmbed = new Discord.RichEmbed()
                                    .setAuthor(message.author.username, message.author.avatarURL)
                                    .setColor(config.color.cats)
                                    .setDescription("You got an " + catName + " cat! uwu");
                                    message.channel.send(commonCatEmbed).then(msg => msg.delete(6000));
                                }
                        
                            }
                            if(uncommonCatAmt === uncommonBaseAmt){
                        
                                //* If User Has No Common Cats Don't Give Them Uncommon
                                uSiamese = userdata.cats.siamese; uBurmese = userdata.cats.burmese;uRagdoll = userdata.cats.ragdoll;uPersian = userdata.cats.persian;uMaineCoon = userdata.cats.mainecoon;uRussianBlue = userdata.cats.russianblue;
                                if(uSiamese === 0 && uBurmese === 0 && uRagdoll === 0 && uPersian === 0 && uMaineCoon === 0 && uRussianBlue === 0){commonCats = false;} else {commonCats = true;}
                                if(commonCats === false){return;}
                        
                                //* Set Vars For Uncommon Cats
                                let animales = ['abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishAngora'];
                                let result = Math.floor((Math.random() * animales.length));
                        
                                //* Check To See What Cat It Is Then Add It To Their Cats
                                if(result === 0){userdata.cats.abyssinian += 1;totalList.cats.abyssinian += 1; catName = "abyssinian";}
                                if(result === 1){userdata.cats.manx += 1;totalList.cats.manx += 1; catName = "manx";}
                                if(result === 2){userdata.cats.sphynx += 1;totalList.cats.sphynx += 1; catName = "sphynx";}
                                if(result === 3){userdata.cats.cyprus += 1;totalList.cats.cyprus += 1; catName = "cyprus";}
                                if(result === 4){userdata.cats.foldex += 1;totalList.cats.foldex += 1; catName = "foldex";}
                                if(result === 5){userdata.cats.turkishangora += 1;totalList.cats.turkishangora += 1; catName = "turkish angora";}
        
                                //* Start Embed To Show That They Got A Uncommon Cat
                                if(guildSettings.CatGottenPopupMessage === true){
                                    let uncommonCatEmbed = new Discord.RichEmbed()
                                    .setAuthor(message.author.username, message.author.avatarURL)
                                    .setColor(config.color.cats)
                                    .setDescription("You got an " + catName + " cat! uwu");
                                    message.channel.send(uncommonCatEmbed).then(msg => msg.delete(6000));
                                }
                            }
                            if(rareCatAmt === rareBaseAmt){
                                //* If User Has No Uncommon Cats Don't Give Them Rare
                                uAbyssinian = userdata.cats.abyssinian;uManx = userdata.cats.manx;uSphynx = userdata.cats.sphynx;uCyprus = userdata.cats.cyprus;uFoldex = userdata.cats.foldex;uTurkishAngora = userdata.cats.turkishangora;
                                if(uAbyssinian === 0 && uManx === 0 && uSphynx === 0 && uCyprus === 0 && uFoldex === 0 && uTurkishAngora === 0){uncommonCats = false;} else {uncommonCats = true;}
                                if(uncommonCats === false){return;}
                        
                                //* Set Vars For Rare Cats
                                let animales = ['korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin'];
                                let result = Math.floor((Math.random() * animales.length));
                        
                                //* Check To See What Cat It Is Then Add It To Their Cats
                                if(result === 0){userdata.cats.korat += 1;totalList.cats.korat += 1; catName = "korat";}
                                if(result === 1){userdata.cats.singapura += 1;totalList.cats.singapura += 1; catName = "singapura";}
                                if(result === 2){userdata.cats.tonkinese += 1;totalList.cats.tonkinese += 1; catName = "tonkinese";}
                                if(result === 3){userdata.cats.peterbald += 1;totalList.cats.peterbald += 1; catName = "peterbald";}
                                if(result === 4){userdata.cats.chartreux += 1;totalList.cats.chartreux += 1; catName = "chartreux";}
                                if(result === 5){userdata.cats.munchkin += 1;totalList.cats.munchkin += 1; catName = "munchkin";}
        
                                //* Start Embed To Show That They Got A Rare Cat
                                if(guildSettings.CatGottenPopupMessage === true){
                                    let rareCatEmbed = new Discord.RichEmbed()
                                    .setAuthor(message.author.username, message.author.avatarURL)
                                    .setColor(config.color.cats)
                                    .setDescription("You got an " + catName + " cat! uwu");
                                    message.channel.send(rareCatEmbed).then(msg => msg.delete(6000));
                                }
                            }
                            if(specialCatAmt === specialBaseAmt){
                        
                                //* No Need To Check If They Have Lower Rank || You Can Get Special No Matter What Cats You Have
        
                                //* Set Vars For Special Cats
                                let animales = ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy'];
                                let result = Math.floor((Math.random() * animales.length));
                        
                                //* Check To See What Cat It Is Then Add It To Their Cats
                                if(result === 0){userdata.cats.bandit += 1;totalList.cats.bandit += 1; catName = "bandit";}
                                if(result === 1){userdata.cats.bug += 1;totalList.cats.bug += 1; catName = "bug";}
                                if(result === 2){userdata.cats.linda += 1;totalList.cats.linda += 1; catName = "linda";}
                                if(result === 3){userdata.cats.mittens += 1;totalList.cats.mittens += 1; catName = "mittens";}
                                if(result === 4){userdata.cats.cash += 1;totalList.cats.cash += 1; catName = "cash";}
                                if(result === 5){userdata.cats.jackson += 1;totalList.cats.jackson += 1; catName = "jackson";}
                                if(result === 6){userdata.cats.cottonball += 1;totalList.cats.cottonball += 1; catName = "cottonball";}
                                if(result === 7){userdata.cats.sonny += 1;totalList.cats.sonny += 1; catName = "sonny";}
                                if(result === 8){userdata.cats.smokey += 1;totalList.cats.smokey += 1; catName = "smokey";}
                                if(result === 9){userdata.cats.lailah += 1;totalList.cats.lailah += 1; catName = "lailah";}
                                if(result === 10){userdata.cats.cher += 1;totalList.cats.cher += 1; catName = "cher";}
                                if(result === 11){userdata.cats.marvin += 1;totalList.cats.marvin += 1; catName = "marvin";}
                                if(result === 12){userdata.cats.loki += 1;totalList.cats.loki += 1; catName = "loki";}
                                if(result === 13){userdata.cats.loverboy += 1;totalList.cats.loverboy += 1; catName = "loverboy";}
        
                                //* Start Embed To Show That They Got A Special Cat
                                if(guildSettings.CatGottenPopupMessage === true){
                                    let specialCatEmbed = new Discord.RichEmbed()
                                    .setAuthor(message.author.username, message.author.avatarURL)
                                    .setColor(config.color.cats)
                                    .setDescription("You got an " + catName + "! uwu");
                                    message.channel.send(specialCatEmbed).then(msg => msg.delete(6000));
                                }
                            }
                            if(impossibleCatsAmt === impossibleBaseAmt){
                                //* Set Vars For Impossible Cats
                                let animales = ['squirtlett', 'cursedcat', 'uwu'];
                                let result = Math.floor((Math.random()*animales.length));
                        
                                //* Check To See What Cat It Is Then Add It To Their Cats
                        
                                if(result === 0){userdata.cats.squirtlett += 1;totalList.cats.squirtlett += 1; catName = "squirtlett";}
                                if(result === 1){userdata.cats.cursedcat += 1;totalList.cats.cursedcat += 1; catName = "cursed cat";}
                                if(result === 2){userdata.cats.uwu += 1;totalList.cats.uwu += 1; catName = "UWU";}
        
                                //* Start Embed To Show That They Got A Common Cat
                                if(guildSettings.CatGottenPopupMessage === true){
                                    let impossibleCatEmbed = new Discord.RichEmbed()
                                    .setAuthor(message.author.username, message.author.avatarURL)
                                    .setColor(config.color.cats)
                                    .setDescription("You got an " + catName + " cat! uwu");
                                    message.channel.send(impossibleCatEmbed).then(msg => msg.delete(6000));
                                }
                        
                            }

                        }
                        totalList.save().catch(err => console.log(err));
                        userdata.save().catch(err => console.log(err));
                    });

                }
            });
        }
    });
});