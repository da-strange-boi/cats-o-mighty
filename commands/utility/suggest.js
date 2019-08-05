//* Discord / Json Vars
const Discord = require("discord.js");
const config = require("../../config.json");

//* Mongoose Database Vars
const Suggestion = require("../../moduls/suggestions.js");

//* Cooldown Vars
let cooldowncats = new Set();
let cdseconds = 300;

module.exports.run = async (bot, message, args) => {

    //USAGE cat suggestion <suggestion>

    //* Select User Data From Database
    Suggestion.findOne({}, async (err, userSuggestion) => {
        if(err) throw err;

        //* Check To See If User Entered A Suggestion
        if(!args[0]){
            await message.channel.send(`<@${message.author.id}> you need to enter a suggestion\n` + "```cat help suggest``` check the help for more info");
            return;
        }

        //* If User Already Has A Cooldown Tell Them To Wait
        if(cooldowncats.has(message.author.id)){
            let cooldownEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`You gotta wait 5 minutes before adding another suggestion to avoid spam\nif you abuse this command you will be banned from the bot for a day`)
            .setColor(config.color.error);
            await message.channel.send(cooldownEmbed).then(msg => msg.delete(300000));
            return;
        }
        cooldowncats.add(message.author.id);

        //* Get The Suggestion And Add It To The Database
        let suggestion = args.join(" ");
        let numRand = Math.floor(Math.random() * 100000);
        const newSuggestion = new Suggestion({
            userID: message.author.id,userTag: message.author.tag,suggestionNumber: numRand,suggestion: suggestion
        })
        newSuggestion.save().catch(err => console.log(err));

        let suggestionEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Thanks so much for the suggestion!!\nI'll take it into consideration and possibly add it to the bot`)
        .setColor(config.color.cats);
        await message.channel.send(suggestionEmbed);

        //* Delete The Cooldown When Time Is Up // Resetting It
        setTimeout(() => {
            cooldowncats.delete(message.author.id)
        }, cdseconds * 1000)
    });
}

module.exports.help = {
    name: "suggest",
    aliases: []
}