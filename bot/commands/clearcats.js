exports.run = async (bot, message, args) => {
  const userCol = bot.database.Userdata

  if (args[0]) {
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!mentionedUser) return message.channel.send("That person doesn't exist")

    userCol.findOne({ userID: mentionedUser.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      if (userdata) {
        userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {
          'cats.siamese.amount': 0, 'cats.burmese.amount': 0, 'cats.ragdoll.amount': 0, 'cats.persian.amount' : 0, 'cats.mainecoon.amount' : 0, 'cats.russianblue.amount' : 0, 'cats.calico.amount' : 0, 'cats.tabby.amount' : 0, 'cats.abyssinian.amount' : 0, 'cats.manx.amount' : 0, 'cats.sphynx.amount' : 0, 'cats.cyprus.amount' : 0, 'cats.foldex.amount' : 0, 'cats.turkishangora.amount' : 0, 'cats.norwegianforest.amount' : 0, 'cats.devonrex.amount' : 0, 'cats.korat.amount' : 0, 'cats.singapura.amount' : 0, 'cats.tonkinese.amount' : 0, 'cats.peterbald.amount' : 0, 'cats.chartreux.amount' : 0, 'cats.munchkin.amount' : 0, 'cats.britishshorthair.amount' : 0, 'cats.ojosazules.amount' : 0, 'cats.bandit.amount' : 0, 'cats.bug.amount' : 0, 'cats.linda.amount' : 0, 'cats.mittens.amount' : 0, 'cats.cash.amount' : 0, 'cats.jackson.amount' : 0, 'cats.cottonball.amount' : 0, 'cats.sonny.amount' : 0, 'cats.smokey.amount' : 0, 'cats.lailah.amount' : 0, 'cats.cher.amount' : 0, 'cats.marvin.amount' : 0, 'cats.loki.amount' : 0, 'cats.loverboy.amount' : 0, 'cats.killerclaws.amount' : 0, 'cats.squirtlett.amount' : 0, 'cats.cursedcat.amount' : 0, 'cats.uwu.amount' : 0, 'cats.tom.amount' : 0, 'cats.demoncat.amount' : 0, 'cats.bongocat.amount' : 0, 'cats.grumpycat.amount' : 0, 'cats.ghostcat.amount' : 0
        }})
        message.channel.send('Yep')
      }
      if (!userdata) return message.channel.send("That person doesn't exist")
    })

  } else if (!args[0]) {
    // Clears Cats Of The Message Author
    userCol.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      if (userdata) {
        userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {
          'cats.siamese.amount': 0, 'cats.burmese.amount': 0, 'cats.ragdoll.amount': 0, 'cats.persian.amount' : 0, 'cats.mainecoon.amount' : 0, 'cats.russianblue.amount' : 0, 'cats.calico.amount' : 0, 'cats.tabby.amount' : 0, 'cats.abyssinian.amount' : 0, 'cats.manx.amount' : 0, 'cats.sphynx.amount' : 0, 'cats.cyprus.amount' : 0, 'cats.foldex.amount' : 0, 'cats.turkishangora.amount' : 0, 'cats.norwegianforest.amount' : 0, 'cats.devonrex.amount' : 0, 'cats.korat.amount' : 0, 'cats.singapura.amount' : 0, 'cats.tonkinese.amount' : 0, 'cats.peterbald.amount' : 0, 'cats.chartreux.amount' : 0, 'cats.munchkin.amount' : 0, 'cats.britishshorthair.amount' : 0, 'cats.ojosazules.amount' : 0, 'cats.bandit.amount' : 0, 'cats.bug.amount' : 0, 'cats.linda.amount' : 0, 'cats.mittens.amount' : 0, 'cats.cash.amount' : 0, 'cats.jackson.amount' : 0, 'cats.cottonball.amount' : 0, 'cats.sonny.amount' : 0, 'cats.smokey.amount' : 0, 'cats.lailah.amount' : 0, 'cats.cher.amount' : 0, 'cats.marvin.amount' : 0, 'cats.loki.amount' : 0, 'cats.loverboy.amount' : 0, 'cats.killerclaws.amount' : 0, 'cats.squirtlett.amount' : 0, 'cats.cursedcat.amount' : 0, 'cats.uwu.amount' : 0, 'cats.tom.amount' : 0, 'cats.demoncat.amount' : 0, 'cats.bongocat.amount' : 0, 'cats.grumpycat.amount' : 0, 'cats.ghostcat.amount' : 0
        }})
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
