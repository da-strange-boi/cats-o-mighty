// discord / json vars
const Discord = require("discord.js");
let config = require("../../config.json");

//mongoose vars
const Suggestion = require("../../moduls/suggestions.js");

module.exports.run = async (bot, message, args) => {

  if(message.author.id != "295255543596187650"){ 
      return; 
  }else if (message.author.id === "295255543596187650") {
    //* Select User Data From Database
    Suggestion.find({}, (err, res) => {
      if(err) console.log(err);
      if(!res){
        let noSuggestionsEmbed = new Discord.RichEmbed()
        .setColor(config.color.error)
        .setDescription("There are no suggestions :(");
        message.channel.send(noSuggestionsEmbed);
        return;
      }
      if(res){
        let embed = new Discord.RichEmbed()
        .setTitle("**Suggestions List**")
        
        u = 0;
        //* If There Are No Results
        if(res.length === 0){
          embed.setColor(config.color.error);
          embed.addField("No data found", "No one has suggesed anything");
            
        } else {
          embed.setColor(config.color.owner);
          if(res.length > 25){
            for(i = 0; i < 25; i++){
              embed.addField(`${res[i].userTag} (${res[i].userID}) || #${res[i].suggestionNumber}`, `${res[i].suggestion}`);
            }
            embed.setFooter(`only 25 out of ${res.length} displayed`);
          } else {
             for(i = 0; i < res.length; i++) {
              embed.addField(`${res[i].userTag} (${res[i].userID}) || #${res[i].suggestionNumber}`, `${res[i].suggestion}`);
            }
          }
        }
        message.channel.send(embed);
      }
    });
  }
}

module.exports.help = {
    name: "showsuggestions",
    aliases: []
}