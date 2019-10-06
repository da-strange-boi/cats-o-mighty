exports.run = async (bot, message, args) => {
  if (args[0]) {
    const bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!bUser) return message.channel.send("That person doesn't exist")

    bot.db.Userdata.findOne({ userID: bUser.id }, (err, userdata) => {
      if (err) bot.log('error', err)
      if (userdata) {
        userdata.cats.siamese = 0; userdata.cats.burmese = 0; userdata.cats.ragdoll = 0; userdata.cats.persian = 0; userdata.cats.mainecoon = 0; userdata.cats.russianblue = 0; userdata.cats.calico = 0; userdata.cats.tabby = 0; userdata.cats.abyssinian = 0; userdata.cats.manx = 0; userdata.cats.sphynx = 0; userdata.cats.cyprus = 0; userdata.cats.foldex = 0; userdata.cats.turkishangora = 0; userdata.cats.norwegianforest = 0; userdata.cats.korat = 0; userdata.cats.singapura = 0; userdata.cats.tonkinese = 0; userdata.cats.peterbald = 0; userdata.cats.chartreux = 0; userdata.cats.munchkin = 0; userdata.cats.britishshorthair = 0; userdata.cats.bandit = 0; userdata.cats.bug = 0; userdata.cats.linda = 0; userdata.cats.mittens = 0; userdata.cats.cash = 0; userdata.cats.jackson = 0; userdata.cats.cottonball = 0; userdata.cats.sonny = 0; userdata.cats.smokey = 0; userdata.cats.lailah = 0; userdata.cats.cher = 0; userdata.cats.marvin = 0; userdata.cats.loki = 0; userdata.cats.loverboy = 0; userdata.cats.killerclaws = 0; userdata.cats.squirtlett = 0; userdata.cats.cursedcat = 0; userdata.cats.uwu = 0; userdata.cats.tom = 0; userdata.cats.demoncat = 0
        userdata.save().catch(err => console.log(err))
        message.channel.send('Yep')
      }
      if (!userdata) {
        return message.channel.send("That person doesn't exist")
      }
    })
  } else {
    // Clears Cats Of The Message Author
    bot.db.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)
      if (userdata) {
        userdata.cats.siamese = 0; userdata.cats.burmese = 0; userdata.cats.ragdoll = 0; userdata.cats.persian = 0; userdata.cats.mainecoon = 0; userdata.cats.russianblue = 0; userdata.cats.calico = 0; userdata.cats.tabby = 0; userdata.cats.abyssinian = 0; userdata.cats.manx = 0; userdata.cats.sphynx = 0; userdata.cats.cyprus = 0; userdata.cats.foldex = 0; userdata.cats.turkishangora = 0; userdata.cats.norwegianforest = 0; userdata.cats.korat = 0; userdata.cats.singapura = 0; userdata.cats.tonkinese = 0; userdata.cats.peterbald = 0; userdata.cats.chartreux = 0; userdata.cats.munchkin = 0; userdata.cats.britishshorthair = 0; userdata.cats.bandit = 0; userdata.cats.bug = 0; userdata.cats.linda = 0; userdata.cats.mittens = 0; userdata.cats.cash = 0; userdata.cats.jackson = 0; userdata.cats.cottonball = 0; userdata.cats.sonny = 0; userdata.cats.smokey = 0; userdata.cats.lailah = 0; userdata.cats.cher = 0; userdata.cats.marvin = 0; userdata.cats.loki = 0; userdata.cats.loverboy = 0; userdata.cats.killerclaws = 0; userdata.cats.squirtlett = 0; userdata.cats.cursedcat = 0; userdata.cats.uwu = 0; userdata.cats.tom = 0; userdata.cats.demoncat = 0
        userdata.save().catch(err => console.log(err))
        message.channel.send('Yep')
      }
    })
  }
}

exports.help = {
  name: 'clearcats',
  aliases: ['cc'],
  type: 'admin'
}
