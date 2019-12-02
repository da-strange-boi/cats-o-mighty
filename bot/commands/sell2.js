const Discord = require('discord.js')
const ms = require('parse-ms')
const catData = require('../data/catData.json')
const chalk = require('chalk')
let cooldown = {}

// console.log(catData)

// // rebuild catData
// let catData = {}
// for(let rarity in catDataTemp){
//   console.log(rarity)
//   catData[rarity.slice(2)] = catDataTemp[rarity]
// }
// console.log(catData)

module.exports.run = async (bot, message, args) => {

  bot.database.Userdata.findOne({ userID: message.author.id }, async (err, userdata) => {

    if(err) bot.log('error', err)

    console.log('args[0]', args[0])
    console.log('args[1]', args[1])

    if(!userdata) message.channel.send('Account Error')

    if(userdata){

      console.log(userdata)

      // sale type (cat, rarity, all)
      let saleType
      // variable that contains all the data necessary for the sale
      let saleData

      // if the user doesnt specify a cat (i.e. just sends `cat sell`)
      if(!args[0]) return message.channel.send(`**${message.author.username}**, you have to specify a cat! Check \`cat help sell\` for more information **[PUT AN EMOJI HERE]**`)
      
      // get object requested to be sold
      const sellRequest = args[0].trim().toLowerCase()

      // check if selling all
      if(sellRequest === 'all'){
        saleType = 'all'
      // check if the object requested to be sold is a valid cat OR rarity:
      }else{

        // loop rarities
        let rCount = 0
        for(let rarity in catData){

          // if sale has been defined, break
          if(saleType){ break }

          // debug
          rCount++
          console.log(`${(rCount < Object.keys(catData).length)? `${( rarity === sellRequest ) || ( sellRequest in catData[rarity] )? '└': '├'}`: '└'}───${rarity === sellRequest? chalk.green.bold(rarity): rarity}`)

          // check if the sale requested is a rarity; if it is, set `sale` to 'rarity' and then break
          if(rarity === sellRequest){
            saleType = 'rarity'
            saleData = rarity
            break
          }

          // loop cats
          let cCount = 0
          for(let cat in catData[rarity]){

            // if sale has been defined, break
            if(saleType){ break }

            // debug
            cCount++
            console.log(`${(cCount < Object.keys(catData[rarity]).length)? `${sellRequest in catData[rarity]? ' ': '│'}   ${sellRequest === cat? '└': '├'}`: `${( rCount < Object.keys(catData).length )? '│': ' '}   └`}───${cat === sellRequest? chalk.green.bold(cat): cat}`)

            // check if the sale requested is a cat; if it is, set `sale` to 'cat' and then break
            if(cat === sellRequest){
              saleType = 'cat'
              // `saleData` is set to an object containing the cat and it's rarity
              saleData = { cat: cat, rarity: rarity}
              break
            }
          }
        }
      }

      console.log(chalk.keyword('lime').inverse('saleType', saleType))

      // do stuff based on what the sale is
      switch(saleType){

        // selling all
        case('all'): {
          console.log(chalk.yellow.inverse(`${saleType}: ${saleData}`))
          break
        }

        // selling a rarity
        case('rarity'): {

          const parse = bot.functions.parseRarityForDB

          console.log(chalk.yellow.inverse(`${saleType}: ${parse(saleData)}`))

          let catValue = 0
          let catAmount = 0

          // loop through all the cats in the specified rarity
          for(let cat in catData[saleData]){

            // increment the total value and total amount variables by the amount sold
            catValue += userdata.cats[parse(saleData)][cat].amount
            catAmount += (userdata.cats[parse(saleData)][cat].amount*catData[saleData][cat].value)

            // set the amount of cats in the user's collection for aformentioned cat to zero
            bot.database.Userdata.findOneAndUpdate({ userID: message.author.id },
              {
                $set: { [`cats.${parse(saleData)}.${cat}.amount`]: 0 }
              }).then(res => {
              console.log(chalk.blue(cat) + ' : ' + res.value.cats[parse(saleData)][cat].amount + ' sold')
            })
          }

          // increment the user's money by the total value of cats sold, if any were sold:
          bot.database.Userdata.findOneAndUpdate({ userID: message.author.id },
            {
              $inc: { 'money.catmoney': catValue}
            }).then(res => console.log(res.value.money.catmoney))
          
          // tell the user how many cats they sold and for how many
          message.channel.send(`${catAmount} ${saleData} cats sold for ${catValue}.`)
          break
        }

        // selling a specific cat
        case('cat'): {

          console.log(chalk.yellow.inverse(`${saleType}: ${JSON.stringify(saleData)}`))
          
          // if the user does specifiy what to sell

          let amountToSell = args[1]? Number(args[1]): 'all'

          if(!amountToSell){ return message.channel.send('Invalid amount') }
        
          // check if the amount to sell is valid (i.e. positive whole number above zero)
          if((amountToSell > 0 && Number.isInteger(amountToSell)) || amountToSell === 'all'){
            if(Number.isInteger(amountToSell)){
              // sell that amount of cats, if possible
            }
            if(amountToSell === 'all'){
              // sell all of the specified amount of cats
            }
          }
          break
        }
        case(undefined): message.channel.send('???????')
      }
    }
  })
}

exports.help = {
  name: 'sell2',
  aliases: ['kill2', 's2'],
  type: 'normal'
}
  