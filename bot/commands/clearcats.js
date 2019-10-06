exports.run = async (bot, message, args) => {
  if (args[0]) {
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!mentionedUser) return message.channel.send("That person doesn't exist")

    bot.database.Userdata.findOne({ userID: mentionedUser.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      if (userdata) {
        const userCats = userdata.cats
        userCats.siamese = 0; userCats.burmese = 0; userCats.ragdoll = 0; userCats.persian = 0; userCats.mainecoon = 0; userCats.russianblue = 0; userCats.calico = 0; userCats.tabby = 0; userCats.abyssinian = 0; userCats.manx = 0; userCats.sphynx = 0; userCats.cyprus = 0; userCats.foldex = 0; userCats.turkishangora = 0; userCats.norwegianforest = 0; userCats.korat = 0; userCats.singapura = 0; userCats.tonkinese = 0; userCats.peterbald = 0; userCats.chartreux = 0; userCats.munchkin = 0; userCats.britishshorthair = 0; userCats.bandit = 0; userCats.bug = 0; userCats.linda = 0; userCats.mittens = 0; userCats.cash = 0; userCats.jackson = 0; userCats.cottonball = 0; userCats.sonny = 0; userCats.smokey = 0; userCats.lailah = 0; userCats.cher = 0; userCats.marvin = 0; userCats.loki = 0; userCats.loverboy = 0; userCats.killerclaws = 0; userCats.squirtlett = 0; userCats.cursedcat = 0; userCats.uwu = 0; userCats.tom = 0; userCats.demoncat = 0
        userdata.save().catch(err => bot.log('error', err))
        message.channel.send('Yep')
      }
      if (!userdata) return message.channel.send("That person doesn't exist")
    })
  } else {
    // Clears Cats Of The Message Author
    bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      if (userdata) {
        const userCats = userdata.cats
        userCats.siamese = 0; userCats.burmese = 0; userCats.ragdoll = 0; userCats.persian = 0; userCats.mainecoon = 0; userCats.russianblue = 0; userCats.calico = 0; userCats.tabby = 0; userCats.abyssinian = 0; userCats.manx = 0; userCats.sphynx = 0; userCats.cyprus = 0; userCats.foldex = 0; userCats.turkishangora = 0; userCats.norwegianforest = 0; userCats.korat = 0; userCats.singapura = 0; userCats.tonkinese = 0; userCats.peterbald = 0; userCats.chartreux = 0; userCats.munchkin = 0; userCats.britishshorthair = 0; userCats.bandit = 0; userCats.bug = 0; userCats.linda = 0; userCats.mittens = 0; userCats.cash = 0; userCats.jackson = 0; userCats.cottonball = 0; userCats.sonny = 0; userCats.smokey = 0; userCats.lailah = 0; userCats.cher = 0; userCats.marvin = 0; userCats.loki = 0; userCats.loverboy = 0; userCats.killerclaws = 0; userCats.squirtlett = 0; userCats.cursedcat = 0; userCats.uwu = 0; userCats.tom = 0; userCats.demoncat = 0
        userdata.save().catch(err => bot.log('error', err))
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
