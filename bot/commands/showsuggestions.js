const Discord = require("discord.js");
exports.run = async (bot, message, args) => {

  //* Select User Data From Database
  bot.db.Suggestion.find({}, (err, res) => {
    if(err) console.log(err);
    if(!res){
      let noSuggestionsEmbed = new Discord.RichEmbed()
      .setColor(bot.config.color.error)
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
        embed.setColor(bot.config.color.error);
        embed.addField("No data found", "No one has suggesed anything");
          
      } else {
        embed.setColor(bot.config.color.owner);
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

exports.help = {
  name: "showsuggestions",
  aliases: [],
  type: 'admin'
}