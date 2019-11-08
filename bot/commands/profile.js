const Discord = require('discord.js')
const ms = require('parse-ms')
const Canvas = require('canvas')
const cooldown = {}

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

// A Simple Function To Format Text Properly
const applyText = (canvas, size, text) => {
  const ctx = canvas.getContext('2d')
  let fontSize = size
  do {
    ctx.font = `${fontSize -= 10}px sans-serif`
  } while (ctx.measureText(text).width > canvas.width - 300)
  return ctx.font
}

exports.run = async (bot, message, args) => {
  // {USAGE} cat profile

  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${10 - time.seconds}s**`).then(msg => msg.delete(1000 * (10 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  //* Setup Some Vars For Canvas
  const canvas = Canvas.createCanvas(800, 500)
  const ctx = canvas.getContext('2d')
  const background = await Canvas.loadImage('./bot/images/profileBackground.png')

  // https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
  function formatMoney (amount, decimalCount = 0, decimal = '.', thousands = ',') {
    try {
      decimalCount = Math.abs(decimalCount)
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount

      const negativeSign = amount < 0 ? '-' : ''

      const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
      const j = (i.length > 3) ? i.length % 3 : 0

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
    } catch (e) {
      console.log(e)
    }
  }
  // end of code i copied

  // bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    const userCol = client.db('cats-o-mighty').collection('userdatas')
    userCol.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)
      if (userdata) {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

        // Username & tag text on image
        ctx.font = applyText(canvas, 1000, message.author.tag)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(message.author.tag, 50, 70)

        // Money Display On Image
        const uMoney = userdata.money.catmoney
        ctx.font = applyText(canvas, 60, `Cat Money\n\n$${formatMoney(uMoney)}`)
        ctx.fillStyle = '#ffffff'
        ctx.fillText(`Cat Money\n\n$${formatMoney(uMoney)}`, 30, 260)

        // work in progress text
        ctx.font = applyText(canvas, 30, 'This is still a work in progress')
        ctx.fillStyle = '#5E5E5E'
        ctx.fillText('This is still a work in progress', 500, 450)

        // Make a curile cutout for avater image
        ctx.beginPath()
        ctx.arc(407.7, 200, 100, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.clip()
      }
    })
  })

  let avatar
  if (message.author.avatarURL !== null) {
    avatar = await Canvas.loadImage(message.author.avatarURL)
  } else {
    avatar = await Canvas.loadImage('https://discordapp.com/assets/dd4dbc0016779df1378e7812eabaa04d.png')
  }

  ctx.drawImage(avatar, canvas.width / 2.6, 100, 200, 200)

  const attachment = new Discord.Attachment(canvas.toBuffer(), 'profile.png')

  await message.channel.send('**This command is very broken!**', attachment)

  // Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 10000)
}

exports.help = {
  name: 'profile',
  aliases: [],
  type: 'normal'
}
