const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (bot, message, args) => {
  let newCommandEmbed = new Discord.RichEmbed()
  .setTitle('mmmm thanks so much for the food')
  .setColor(config.color.cats)
  .setDescription('this command doesn\'t do anything currently\nif you have an idea for this command use `cat suggest` to let me know');
  message.channel.send(newCommandEmbed);

  /* User suggestion
    Maybe do [cat feed] then insert a cat breed then there will be a chance
    you'll get the cat. The chance varies depending on how high the cat is
    from looking in [cat collection]
  */

}

module.exports.help = {
  name: "feed",
  aliases: []
}