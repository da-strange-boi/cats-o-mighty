const Discord = require('discord.js')
const ms = require('parse-ms')
const chalk = require('chalk')
let cooldown = {}

const DEBUG = false

module.exports.run = async (bot, message, args) => {

  // userCol
  const userCol = bot.database.Userdata

  userCol.findOne({ userID: message.author.id }, async (err, userdata) => {

    if(err) bot.log('error', err)

    if(!userdata) message.channel.send('Account Error')

    if(userdata){

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
        for(let rarity in bot.catData){

          // if sale has been defined, break
          if(saleType){ break }

          // debug
          rCount++
          if(DEBUG){ console.log(`${(rCount < Object.keys(bot.catData).length)? `${( rarity === sellRequest ) || ( sellRequest in bot.catData[rarity] )? '└': '├'}`: '└'}───${rarity === sellRequest? chalk.green.bold(rarity): rarity}`) }

          // check if the sale requested is a rarity; if it is, set `sale` to 'rarity' and then break
          if(rarity === sellRequest){
            saleType = 'rarity'
            saleData = rarity
            break
          }

          // loop cats
          let cCount = 0
          for(let cat in bot.catData[rarity]){

            // if sale has been defined, break
            if(saleType){ break }

            // debug
            cCount++
            if(DEBUG){ console.log(`${(cCount < Object.keys(bot.catData[rarity]).length)? `${sellRequest in bot.catData[rarity]? ' ': '│'}   ${sellRequest === cat? '└': '├'}`: `${( rCount < Object.keys(bot.catData).length )? '│': ' '}   └`}───${cat === sellRequest? chalk.green.bold(cat): cat}`) }

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

      if(DEBUG){ console.log(chalk.keyword('lime').inverse('saleType:', saleType)) }

      // do stuff based on what the sale is
      switch(saleType){

        // selling all
        case('all'): {
          if(DEBUG){ console.log(chalk.yellow.inverse(`${saleType}: ${saleData}`)) }

          let catValue = 0
          let catAmount = 0

          // loop through all the rarities / cats
          for(let rarity in userdata.cats){
            if(DEBUG){ console.log(chalk.keyword('purple')('\n' + rarity + ': ' + rarity.slice(2))) }
            for(let cat in userdata.cats[rarity]){

              if(bot.catData[rarity.slice(2)][cat].value){
                // increment the total value and total amount variables by the amount sold, if the cat can be sold
                catAmount += userdata.cats[rarity][cat].amount
                catValue += (userdata.cats[rarity][cat].amount * bot.catData[rarity.slice(2)][cat].value)
              }

              // set the amount of cats in the user's collection for the aformentioned cat to zero
              await userCol.findOneAndUpdate({ userID: message.author.id },
                {
                  $set: { [`cats.${rarity}.${cat}.amount`]: 0 }
                }).then(res => {
                if(DEBUG){ process.stdout.write(chalk.blue(cat) + ': ' + (res.value.cats[rarity][cat].amount? chalk.green(res.value.cats[rarity][cat].amount): chalk.red(res.value.cats[rarity][cat].amount)) + ' sold | ') }
              })
            }
          }

          // increment the user's money by the total value of cats sold, if any were sold
          if(catAmount !== 0){
            await userCol.findOneAndUpdate({ userID: message.author.id },
              {
                $inc: { 'money.catmoney': catValue}
              }).then(res => {
              if(DEBUG){ console.log(res.value.money.catmoney) }
              // tell the user how many cats they sold and for how much
              return message.channel.send(`${catAmount} cats sold for ${catValue}.`)
            })
          }else{
            return message.channel.send(`${message.author.id}, you don't have any cats!`)
          }
          break
        }

        // selling a rarity
        case('rarity'): {

          const parse = bot.functions.parseRarityForDB

          console.log(chalk.yellow.inverse(`${saleType}: ${parse(saleData)}`))

          let catValue = 0
          let catAmount = 0

          // loop through all the cats in the specified rarity
          for(let cat in bot.catData[saleData]){

            // increment the total value and total amount variables by the amount sold
            catValue += (userdata.cats[parse(saleData)][cat].amount*bot.catData[saleData][cat].value)
            catAmount += userdata.cats[parse(saleData)][cat].amount

            // set the amount of cats in the user's collection for the aformentioned cat to zero
            await userCol.findOneAndUpdate({ userID: message.author.id },
              {
                $set: { [`cats.${parse(saleData)}.${cat}.amount`]: 0 }
              }).then(res => {
              console.log(chalk.blue(cat) + ' : ' + res.value.cats[parse(saleData)][cat].amount + ' sold')
            })
          }

          // increment the user's money by the total value of cats sold, if any were sold
          if(catAmount !== 0){
            await userCol.findOneAndUpdate({ userID: message.author.id },
              {
                $inc: { 'money.catmoney': catValue}
              }).then(res => {
              console.log(res.value.money.catmoney)
              // tell the user how many cats they sold and for how much
              return message.channel.send(`${catAmount} ${saleData} cats sold for ${catValue}.`)
            })
          }else{
            return message.channel.send(`${message.author.id}, you don't have any ${saleData} cats!`)
          }
          break
        }

        // selling a specific cat
        case('cat'): {

          const parse = bot.functions.parseRarityForDB

          console.log(chalk.yellow.inverse(`${saleType}: ${JSON.stringify(saleData)}`))
          
          // if the user does specifiy what to sell

          let amountToSell = (args[1]? Number(args[1]): 'all')

          if(!amountToSell){ return message.channel.send('Invalid amount') }
        
          // check if the amount to sell is valid (i.e. positive whole number above zero, or all)
          if(( amountToSell > 0 && Number.isInteger(amountToSell) ) || ( amountToSell === 'all' )){
            if(Number.isInteger(amountToSell)){
              // sell that amount of cats, if possible
              // check how many of that cat the user has
              console.log(chalk.cyan('userdata.cats[parse(saleData.rarity)][saleData.cat].amount'), userdata.cats[parse(saleData.rarity)][saleData.cat].amount, chalk.cyan('amountToSell'), amountToSell)
              if(amountToSell > userdata.cats[parse(saleData.rarity)][saleData.cat].amount){
                return message.channel.send(`You don't have that many ${saleData.cat} cats, ${message.author.username}!`)
              }else{
                if(userdata.cats[parse(saleData.rarity)][saleData.cat].amount !== 0){

                  // temp variables
                  let catValue = (amountToSell*bot.catData[saleData.rarity][saleData.cat].value)

                  // update the database
                  await userCol.findOneAndUpdate({ userID: message.author.id },
                    {
                      $inc : {
                        [`cats.${parse(saleData.rarity)}.${saleData.cat}.amount`]:  (- amountToSell),
                        'money.catmoney': catValue
                      }
                    }).then(res => {
                    console.log(res.value.money.catmoney)
                    // tell the user how many cats they sold and for how much
                    return message.channel.send(`${amountToSell} ${saleData.cat} cats sold for ${catValue}.`)
                  })
                }else{
                  return message.channel.send(`${message.author.id}, you don't have any ${saleData} cats!`)
                }
              }
            }
            if(amountToSell === 'all'){
              // sell all of the specified amount of cats
            }
          }
          break
        }
        case(undefined): message.channel.send('What The Fuck')
      }
    }
  })
}

exports.help = {
  name: 'sell2',
  aliases: ['kill2', 's2'],
  type: 'normal'
}
  