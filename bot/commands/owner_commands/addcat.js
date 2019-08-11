exports.run = async (bot, message, args) => {
    if(message.author.id != "295255543596187650"){ return; }
    if(message.author.id === "295255543596187650"){
        //USAGE cat addcat {cat name} {amount} || addcat {@user} {cat name} {amount}

        //* If Command Isn't Use Properly
        if(!args[0] || !args[1]){
            message.channel.send("check `cat help addcat` you fucking dumbass");
            return;
        }

        //USAGE addcat {@user} {cat name} {amount}
        if(args[2]){
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if (!bUser) return message.channel.send("Heyo that person doesn't exist in the database lol");
            let amtCat = Number(args[2]);

            bot.db.Userdata.findOne({
                userID: bUser.id
            }, (err, userdata) => {
                if(err) console.log(err);

                if(args[1] === "siamese"){userdata.cats.siamese += amtCat;}if(args[1] === "burmese"){userdata.cats.burmese += amtCat;}if(args[1] === "ragdoll"){userdata.cats.ragdoll += amtCat;}if(args[1] === "persian"){userdata.cats.persian += amtCat;}if(args[1] === "maine coon" || args[1] === "mainecoon"){userdata.cats.mainecoon += amtCat;}if(args[1] === "russianblue"){userdata.cats.russianblue += amtCat;}
                if(args[1] === "abyssinian"){userdata.cats.abyssinian += amtCat;}if(args[1] === "manx"){userdata.cats.manx += amtCat;}if(args[1] === "sphynx"){userdata.cats.sphynx += amtCat;}if(args[1] === "cyprus"){userdata.cats.cyprus += amtCat;}if(args[1] === "foldex"){userdata.cats.foldex += amtCat;}if(args[1] === "turkishangora"){userdata.cats.turkishangora += amtCat;}
                if(args[1] === "korat"){userdata.cats.korat += amtCat;}if(args[1] === "singapura"){userdata.cats.singapura += amtCat;}if(args[1] === "tonkinese"){userdata.cats.tonkinese += amtCat;}if(args[1] === "peterbald"){userdata.cats.peterbald += amtCat;}if(args[1] === "chartreux"){userdata.cats.chartreux += amtCat;}if(args[1] === "munchkin"){userdata.cats.munchkin += amtCat;}
                if(args[1] === "bandit"){userdata.cats.bandit += amtCat;}if(args[1] === "bug"){userdata.cats.bug += amtCat;}if(args[1] === "linda"){userdata.cats.linda += amtCat;}if(args[1] === "mittens"){userdata.cats.mittens += amtCat;}if(args[1] === "cash"){userdata.cats.cash += amtCat;}if(args[1] === "jackson"){userdata.cats.jackson += amtCat;}if(args[1] === "cottonball"){userdata.cats.cottonball += amtCat;}if(args[1] === "sonny"){userdata.cats.sonny += amtCat;}if(args[1] === "smokey"){userdata.cats.smokey += amtCat;}if(args[1] === "lailah"){userdata.cats.lailah += amtCat;}if(args[1] === "cher"){userdata.cats.cher += amtCat;}if(args[1] === "marvin"){userdata.cats.marvin += amtCat;}if(args[1] === "loki"){userdata.cats.loki += amtCat;}if(args[1] === "loverboy"){userdata.cats.loverboy += amtCat;}
                if(args[1] === "squirtlett"){userdata.cats.squirtlett += amtCat;}if(args[1] === "cursedcat"){userdata.cats.cursedcat += amtCat;}if(args[1] === "uwu"){userdata.cats.uwu += amtCat;}

                userdata.save().catch(err => console.log(err));

                message.channel.send(`${args[2]} ${args[1]}'s has been added to ${bUser} account`);
            });
            return;
        }

        //USAGE cat addcat {cat name} {amount}
        if(args[1]){
            //* Select My Data From The Database
            bot.db.Userdata.findOne({
                userID: message.author.id
            }, (err, userdata) => {
                if(err) console.log(err);

                let amtCat = Number(args[1]);

                if(args[0] === "siamese"){userdata.cats.siamese += amtCat;}if(args[0] === "burmese"){userdata.cats.burmese += amtCat;}if(args[0] === "ragdoll"){userdata.cats.ragdoll += amtCat;}if(args[0] === "persian"){userdata.cats.persian += amtCat;}if(args[0] === "maine coon" || args[0] === "mainecoon"){userdata.cats.mainecoon += amtCat;}if(args[0] === "russianblue"){userdata.cats.russianblue += amtCat;}
                if(args[0] === "abyssinian"){userdata.cats.abyssinian += amtCat;}if(args[0] === "manx"){userdata.cats.manx += amtCat;}if(args[0] === "sphynx"){userdata.cats.sphynx += amtCat;}if(args[0] === "cyprus"){userdata.cats.cyprus += amtCat;}if(args[0] === "foldex"){userdata.cats.foldex += amtCat;}if(args[0] === "turkishangora"){userdata.cats.turkishangora += amtCat;}
                if(args[0] === "korat"){userdata.cats.korat += amtCat;}if(args[0] === "singapura"){userdata.cats.singapura += amtCat;}if(args[0] === "tonkinese"){userdata.cats.tonkinese += amtCat;}if(args[0] === "peterbald"){userdata.cats.peterbald += amtCat;}if(args[0] === "chartreux"){userdata.cats.chartreux += amtCat;}if(args[0] === "munchkin"){userdata.cats.munchkin += amtCat;}
                if(args[0] === "bandit"){userdata.cats.bandit += amtCat;}if(args[0] === "bug"){userdata.cats.bug += amtCat;}if(args[0] === "linda"){userdata.cats.linda += amtCat;}if(args[0] === "mittens"){userdata.cats.mittens += amtCat;}if(args[0] === "cash"){userdata.cats.cash += amtCat;}if(args[0] === "jackson"){userdata.cats.jackson += amtCat;}if(args[0] === "cottonball"){userdata.cats.cottonball += amtCat;}if(args[0] === "sonny"){userdata.cats.sonny += amtCat;}if(args[0] === "smokey"){userdata.cats.smokey += amtCat;}if(args[0] === "lailah"){userdata.cats.lailah += amtCat;}if(args[0] === "cher"){userdata.cats.cher += amtCat;}if(args[0] === "marvin"){userdata.cats.marvin += amtCat;}if(args[0] === "loki"){userdata.cats.loki += amtCat;}if(args[0] === "loverboy"){userdata.cats.loverboy += amtCat;}
                if(args[0] === "squirtlett"){userdata.cats.squirtlett += amtCat;}if(args[0] === "cursedcat"){userdata.cats.cursedcat += amtCat;}if(args[0] === "uwu"){userdata.cats.uwu += amtCat;}

                userdata.save().catch(err => console.log(err));

                message.channel.send(`${args[1]} ${args[0]}'s has been added to your account`);
            });
        }
    }
}

exports.help = {
    name: "addcat",
    aliases: ['ac']
}