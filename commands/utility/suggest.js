//* Discord / Json Vars
const Discord = require("discord.js");
const config = require("../../config.json");

//* Mongoose Database Vars
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Suggestion = require("../../moduls/suggestion.js");

//* Cooldown Vars
let cooldowncats = new Set();
let cdseconds = 300;

module.exports.run = async (bot, message, args) => {
    //cat suggestion <suggestion>

    //* Select User Data From Database
    Suggestion.findOne({
        userID: message.author.id
    }, (err, userSuggestion) => {
        if(err) console.log(err);

        //* Check To See If User Entered A Suggestion
        if(!args[0]){
            message.channel.send(`<@${message.author.id}> you need to enter a suggestion\n` + "```cat help suggest``` check the help for more info");
            return;
        }

        //* If User Already Has A Cooldown Tell Them To Wait
        if(cooldowncats.has(message.author.id)){
            let cooldownEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setDescription(`You gotta wait 5 minutes before adding another suggestion to avoid spam\nif you abuse this command you will be banned from the bot for a day`)
            .setColor(config.color.error);
            message.channel.send(cooldownEmbed).then(msg => msg.delete(300000));
            return;
        }
        cooldowncats.add(message.author.id);

        //* Get The Suggestion And Add It To The Database
        let suggestion = args.join(" ");
        const newSuggestion = new Suggestion({
            placeholder: "global",userID: message.author.id,userUsername: message.author.tag,suggestion: suggestion
        })
        newSuggestion.save().catch(err => console.log(err));

        let suggestionEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Thanks so much for the suggestion!!\nI'll take it into consideration and possibly add it to the bot`)
        .setColor(config.color.cats);
        message.channel.send(suggestionEmbed);

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