const Discord = require("discord.js");
exports.run = async (bot, message, args) => {

  //USAGE cat help || cat help <command>

  //* If User Just Puts "cat help" Send The Help Message
  if(!args[0]){
    let helpEmbed = new Discord.RichEmbed()
    .setColor(bot.config.color.utility)
    .setTitle("List of commands")
    .setDescription("Here is all the commands!\nFor help on the commands, use `cat help {command}`")
    .addField(":cat2: General", "`collection`, `daily`, `dex`, `feed`, `leaderboard`, `money`, `profile`, `sell`")
    .addField(":gear: Utility", "`chance`, `help`, `invite`, `ping`, `settings`, `suggest`, `supportserver`, `updates`, `vote`");
    if(message.author.id === '481318379907579916' || message.author.id === '552316796439494658'){
      helpEmbed.addField(":beginner: Bot Admin Commands", "`userinfo`");
      return message.channel.send(helpEmbed);
    }
    if(message.author.id === "295255543596187650"){
      helpEmbed.addField(":gem: Bot Owner Commands", "`addcat`, `addmoney`, `botinfo`, `clearcats`, `clearmoney`, `clearstats`, `deltesuggestion`, `log`, `showsuggestion`, `stop`, `stopwh`");
      return message.channel.send(helpEmbed);
    } else {
      return message.channel.send(helpEmbed);
    }   
  }
  //* If The User Specifies A Command Then Send A Detailed Help Message
  if(args[0]){
    let helpCommand = args[0].toLowerCase().trim();

    // display help for  collection \\
    if(helpCommand === "collection"){
      message.channel.send("```< cat collection [rank of cat] >```");
      message.channel.send("```What it does:\nshows your collection of cats```");
      message.channel.send("```* Other explanes are:\n'cat collection common'```");
      message.channel.send("```Aliases: cattos, c```");
    }
    // display help for daily \\
    if(helpCommand === "daily"){
      message.channel.send("```< cat daily >```");
      message.channel.send("```What is does:\nallows you to collect your daily reward```")
    }
    // display help for dex \\
    if(helpCommand === "dex"){
      message.channel.send("```< cat dex {cat name} >```");
      message.channel.send("```What it does:\nshows info on the cat```");
      message.channel.send("```Aliases: catinfo```");
    }
    //display help for feed \\
    if(helpCommand === "feed"){
      message.channel.send("```< cat feed {cat breed} >```");
      message.channel.send("```What it does:\nallows you to possibly get the cat you fed```");
    }
    // display help for leaderboard \\
    if(helpCommand === "leaderboard"){
      message.channel.send("```< cat leaderboard >```");
      message.channel.send("```What it does:\ndisplay leaderboard of who has the most money```");
    }
    // display help for money \\
    if(helpCommand === "money"){
      message.channel.send("```< cat money >```");
      message.channel.send("```What it does:\ndisplay the money you currently have```");
      message.channel.send("```Aliases: cash```");
    }
    // display help for profile \\
    if(helpCommand === "profile"){
      message.channel.send("```< cat profile >```");
      message.channel.send("```What it does:\nshows you your dashboard stats```");
    }
    // display help for sell \\
    if(helpCommand === "sell"){
      message.channel.send("```< cat sell {cat name (NO SPACES) } {amount}>```");
      message.channel.send("```* What it does:\nsells the cat for a curtain amount of money```");
      message.channel.send("```* Other explanes are:\n'cat sell siamese 3' 'cat sell common' 'cat sell all'```");
    }
    // display help for botinfo \\
    if(helpCommand === "botinfo"){
      message.channel.send("``` < cat botinfo >```");
      message.channel.send("```What it does:\ngives info about the bot```");
    }
    // display help for chance \\
    if(helpCommand === "chance"){
      message.channel.send("``` < cat chance >```");
      message.channel.send("```What it does:\ngives info about the chances of getting cats and thier prices```");
    }
    // display help for help \\
    if(helpCommand === "help"){
      message.channel.send("```< cat help {command} >```");
      message.channel.send("```What it does:\ngives info about the selected command```");
    }
    // display help for invite \\
    if(helpCommand === "invite"){
      message.channel.send("```< cat invite >```");
      message.channel.send("```What it does:\ngives you a link to invite *Cats o Mighty* to your server!```");
    }
    // display help for ping \\
    if(helpCommand === "ping"){
      message.channel.send("```< cat ping >```");
      message.channel.send("```What it does:\ncheck the latency between discord and the bot```");
    }
    // display help for settings \\
    if(helpCommand === "settings"){
      message.channel.send("```< cat settings {module} {args} >```");
      message.channel.send("```What it does:\nsets the bot settings of the current server [Manage Server permission needed]\n- for more info on modules do 'cat help modules'```");
    }
    if(helpCommand === "modules"){
      message.channel.send("```CatGottenPopupMessage {show/hidden/disappear}\nshow - message won't delete\nhidden - messages won't show\ndisappar - messages will delete after 6 seconds```")
    }
    // display help for suggest \\
    if(helpCommand === "suggest"){
      message.channel.send("```< cat suggest {the suggestion} >```");
      message.channel.send("```What it does:\nallows you to suggest a change to be made to the bot```");
    }
    // display help for supportserver \\
    if(helpCommand === "supportserver"){
      message.channel.send("```< cat supportserver >```");
      message.channel.send("```What it does:\ngives you a link to join the *Cats o Mighty* support server!```");
    }
    // display help for updates \\
    if(helpCommand === "updates" || helpCommand === "update"){
      message.channel.send("```< cat updates [date] >```");
      message.channel.send("```What it does:\ntells you the recent update of the bot```");
      message.channel.send("```* 'cat updates' - will give you the lastest update\n* 'cat updates {date} - will give you the update for that date if it exist'\nto find the list of available dates do 'cat help datelist' ```");
    }
    // display all the dates for the 'cat updates' commands \\
    if(helpCommand === "datelist"){
      message.channel.send("```List of dates:\n'4/30' '5/1' '5/2' '5/5' '5/7' '5/17' '5/19' '5/21' '5/25' '6/1' '6/7' '6/25' '6/30'```");
    }
    // display help for vote \\
	  if(helpCommand === "vote"){
      message.channel.send("```< cat vote >```");
      message.channel.send("```What it does:\ngives you a link to vote for the bot\n(you will not get a DM about the rewards you get (yet) but you will still get them)```");
    }
    // display help for addcat \\
    if(helpCommand === "addcat"){
      message.channel.send("***Bot Owner Command***");
      message.channel.send("```< cat addcat {cat name} {amount} || addcat {@user} {cat name} {amount} >```");
      message.channel.send("```What it does:\nadds the cat to the selected persons account```");
      message.channel.send("```Aliases: ac```");
    }
    // display help for addmoney \\
    if(helpCommand === "addmoney"){
      message.channel.send("***Bot Owner Command***");
      message.channel.send("```< cat addmoney {amount} || addmoney {@user} {amount}>```");
      message.channel.send("```What it does:\nadds money to the selected persons account```");
      message.channel.send("```Aliases: am```");
    }
    // display help for clearcats \\
    if(helpCommand === "clearcats"){
      message.channel.send("***Bot Owner Command***");
      message.channel.send("```< cat clearcats || clearcats {@user} >```");
      message.channel.send("```What it does:\nclears the cats of the selected persons account```");
      message.channel.send("```Aliases: cc```");
    }
    // display help for clearmoney \\
    if(helpCommand === "clearmoney"){
      message.channel.send("***Bot Owner Command***");
      message.channel.send("```< cat clearmoney || clearmoney {@user} >```");
      message.channel.send("```What it does:\nclears the money of the selected persons account```");
      message.channel.send("```Aliases: cm```");
    }
    // display help for showsuggestions \\
    if(helpCommand === "showsuggestions"){
      message.channel.send("***Bot Owner Command***");
      message.channel.send("```< cat showsuggestions >```");
      message.channel.send("```What it does:\nshows the suggestions (if any)```");
    }
    // display help for stop \\
    if(helpCommand === "stop"){
      message.channel.send("***Bot Owner Command***");
      message.channel.send("```< cat stop >```");
      message.channel.send("```What it does:\ndisconnects the bot from discord turing it offline```");
    }
    // display help for userinfo \\
    if(helpCommand === "userinfo"){
      message.channel.send("***Admin Command***");
      message.channel.send("```< cat userinfo {user id} >```");
      message.channel.send("```What it does:\ndisplays a users progress with the bot```");
    }

  }
}
exports.help = {
    name: "help",
    aliases: []
}
