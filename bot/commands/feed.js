// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js')
const ms = require('parse-ms')
const cooldown = {}
const chalk = require('chalk')

exports.run = async (bot, message, args) => {
  /* User suggestion (from chad lol)
    Maybe do [cat feed] then insert a cat breed then there will be a chance
    you'll get the cat. 
    -The chance varies depending on how high the cat is
    from looking in [cat collection] / 2
  */

  if (!args[0]) return message.channel.send('Check `cat help feed` for more info')

  // Set A Cooldown
  if (cooldown[message.author.id] && (Date.now() - cooldown[message.author.id]) > 0) {
    const time = ms(Date.now() - cooldown[message.author.id])
    await message.channel.send(`hmm **${message.author.username}**, you gotta wait **${3.5 - time.seconds}s**`).then(msg => msg.delete(1000 * (3.5 - time.seconds)))
    return
  }
  cooldown[message.author.id] = Date.now()

  bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
    if (err) bot.log('error', err)
    if (userdata) {
      /**
       * 
       * @param {String} catToFeed - the name of the cat that is to be fed.
       * @param {Object} userCats - the `userdata.cats` for the user.
       * @param {Number} chance - a number between 0 and 1 that determines the chance of getting a cat.
       */
      // eslint-disable-next-line no-inner-declarations
      function feedCat(catToFeed, userCats, chance){

        for(let rarity in bot.catData){
          
          if(catToFeed in bot.catData[rarity]){

            if(bot.catData[rarity][catToFeed].chance === 0){
              if(bot.catData[rarity][catToFeed].discontinued === true){
                message.channel.send('that cat can\'t be found anymore :(')
                return
              }
              message.channel.send('that cat doesn\'t want to be fed... maybe try chatting to see if you can find one!')
              return
            }

            if(userCats[rarity][catToFeed].discovered){
              if(chance <= bot.catData[rarity][catToFeed].chance*2){
                bot.database.Userdata.findOneAndUpdate({ userID: message.author.id },
                  { 
                    $inc: {
                      [`cats.${rarity}.${catToFeed}.amount`]: 1
                    }
                  }
                ).then(res => {
                  if(res){
                    message.channel.send(`obtained a ${catToFeed} cat, you now have ${res.value.cats[rarity][catToFeed].amount + 1}`)
                  }else{
                    message.channel.send('there was an issue with the database :( please try again!')
                  }
                }).catch(err => {
                  bot.log('error', err)
                })
              }else{
                message.channel.send(`the ${catToFeed} ran away :(`)
                return
              }
            }else{
              message.channel.send('you haven\'t discovered that cat yet!')
              return
            }
            return
          }
        }
        message.channel.send('*that\'s not a cat*')
        return
      }

      feedCat(args[0], userdata.cats, Math.random())
    }
  })

  //* Delete The Cooldown // Resetting It
  setTimeout(() => {
    delete cooldown[message.author.id]
  }, 3500)
}

exports.help = {
  name: 'feed',
  aliases: ['f'],
  type: 'normal'
}
