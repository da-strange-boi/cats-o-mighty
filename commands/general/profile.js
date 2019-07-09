const Discord = require("discord.js");
const Canvas = require("canvas");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cats-o-mighty", {
    useNewUrlParser: true
});
const Money = require("../../moduls/money.js");


//* A Simple Function To Format Text Properly
const applyText = (canvas, size, text) => { 
	const ctx = canvas.getContext('2d');
	let fontSize = size;
	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
	} while (ctx.measureText(text).width > canvas.width - 300);
	return ctx.font;
};

module.exports.run = async (bot, message, args) => {

  //USAGE cat profile

  //* Setup Some Vars For Canvas
  const canvas = Canvas.createCanvas(800, 500);
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('./cat_Images/profileBackground.png');

  // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
  function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
  
      const negativeSign = amount < 0 ? "-" : "";
  
      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;
  
      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
  };
  // end of code i copied

  Money.findOne({
    userID: message.author.id
  }, (err, userMoney) => {
    if(err) console.log(err);
    if(userMoney){

      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

      //* Username & tag text on image
      ctx.font = applyText(canvas, 1000, message.author.tag);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(message.author.tag, 50, 70);

      //* Money Display On Image
      let uMoney = userMoney.money;
      ctx.font = applyText(canvas, 60, `Money\n\n$${formatMoney(uMoney)}`);
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`Money\n\n$${formatMoney(uMoney)}`, 30, 260);

      //* work in progress text
      ctx.font = applyText(canvas, 30, 'This is still a work in progress');
      ctx.fillStyle = '#5E5E5E';
      ctx.fillText('This is still a work in progress', 500, 450)

      //* Make a curile cutout for avater image
      ctx.beginPath();
      ctx.arc(407.7, 200, 100, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

    }
  });

  if(message.author.avatarURL !== null){
    avatar = await Canvas.loadImage(message.author.avatarURL);
  } else {
    avatar = await Canvas.loadImage("https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png")
  }
  
  ctx.drawImage(avatar, canvas.width / 2.6, 100, 200, 200);

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'profile.png');

  message.channel.send(attachment);
}

module.exports.help = {
  name: "profile",
  aliases: []
}