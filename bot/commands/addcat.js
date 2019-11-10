exports.run = async (bot, message, args) => {
  // {USAGE} cat addcat {cat name} {amount} || addcat {@user} {cat name} {amount}

  // If Command Isn't Use Properly
  if (!args[0] || !args[1]) {
    return message.channel.send('check `cat help addcat` you fucking dumbass')
  }

  // {USAGE} addcat {@user} {cat name} {amount}
  if (args[2]) {
    const mentionedUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
    if (!mentionedUser) return message.channel.send("That person doesn't exist")
    const amtCat = Number(args[2])

    const userCol = bot.database.Userdata
    userCol.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      const userCats = userdata.cats

      switch (args[1]) {
        case 'siamese': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.siamese.amount': userCats.siamese.amount + amtCat}})
          break
        case 'burmese': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.burmese.amount': userCats.burmese.amount + amtCat}})
          break
        case 'ragdoll': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.ragdoll.amount': userCats.ragdoll.amount + amtCat}})
          break
        case 'persian': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.persian.amount': userCats.persian.amount + amtCat}})
          break
        case 'mainecoon': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.mainecoon.amount': userCats.mainecoon.amount + amtCat}})
          break
        case 'russianblue': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.burmese.amount': userCats.russianblue.amount + amtCat}})
          break
        case 'calico': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.calico.amount': userCats.calico.amount + amtCat}})
          break
        case 'tabby': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.tabby.amount': userCats.tabby.amount + amtCat}})
          break
        case 'abyssinian': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.abyssinian.amount': userCats.abyssinian.amount + amtCat}})
          break
        case 'manx': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.manx.amount': userCats.manx.amount + amtCat}})
          break
        case 'sphynx': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.sphynx.amount': userCats.sphynx.amount + amtCat}})
          break
        case 'cyprus': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.cyprus.amount': userCats.cyprus.amount + amtCat}})
          break
        case 'foldex': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.foldex.amount': userCats.foldex.amount + amtCat}})
          break
        case 'turkishangora': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.turkishangora.amount': userCats.turkishangora.amount + amtCat}})
          break
        case 'norwegianforest': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.tanorwegianforestbby.amount': userCats.norwegianforest.amount + amtCat}})
          break
        case 'korat': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.korat.amount': userCats.korat.amount + amtCat}})
          break
        case 'singapura': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.singapura.amount': userCats.singapura.amount + amtCat}})
          break
        case 'tonkinese': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.tonkinese.amount': userCats.tonkinese.amount + amtCat}})
          break
        case 'peterbald': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.peterbald.amount': userCats.peterbald.amount + amtCat}})
          break
        case 'chartreux': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.chartreux.amount': userCats.chartreux.amount + amtCat}})
          break
        case 'munchkin': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.munchkin.amount': userCats.munchkin.amount + amtCat}})
          break
        case 'britishshorthair': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.britishshorthair.amount': userCats.britishshorthair.amount + amtCat}})
          break
        case 'ojosazules': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.ojosazules.amount': userCats.ojosazules.amount + amtCat}})
          break
        case 'smokey': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.smokey.amount': userCats.smokey.amount + amtCat}})
          break
        case 'bandit': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.bandit.amount': userCats.bandit.amount + amtCat}})
          break
        case 'bug': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.bug.amount': userCats.bug.amount + amtCat}})
          break
        case 'linda': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.linda.amount': userCats.linda.amount + amtCat}})
          break
        case 'mittens': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.mittens.amount': userCats.mittens.amount + amtCat}})
          break
        case 'cash': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.cash.amount': userCats.cash.amount + amtCat}})
          break
        case 'jackson': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.jackson.amount': userCats.jackson.amount + amtCat}})
          break
        case 'cottonball': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.cottonball.amount': userCats.cottonball.amount + amtCat}})
          break
        case 'sonny': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.sonny.amount': userCats.sonny.amount + amtCat}})
          break
        case 'lailah': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.lailah.amount': userCats.lailah.amount + amtCat}})
          break
        case 'cher': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.cher.amount': userCats.cher.amount + amtCat}})
          break
        case 'marvin': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.marvin.amount': userCats.marvin.amount + amtCat}})
          break
        case 'loki': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.loki.amount': userCats.loki.amount + amtCat}})
          break
        case 'loverboy': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.loverboy.amount': userCats.loverboy.amount + amtCat}})
          break
        case 'killerclaws': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.killerclaws.amount': userCats.killerclaws.amount + amtCat}})
          break
        case 'squirtlett': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.squirtlett.amount': userCats.squirtlett.amount + amtCat}})
          break
        case 'cursedcat': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.cursedcat.amount': userCats.cursedcat.amount + amtCat}})
          break
        case 'uwu': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.uwu.amount': userCats.uwu.amount + amtCat}})
          break
        case 'tom': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.tom.amount': userCats.tom.amount + amtCat}})
          break
        case 'demoncat': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.demoncat.amount': userCats.demoncat.amount + amtCat}})
          break
        case 'bongocat': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.bongocat.amount': userCats.bongocat.amount + amtCat}})
          break
        case 'grumpycat': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.grumpycat.amount': userCats.grumpycat.amount + amtCat}})
          break
        case 'ghostcat': userCol.findOneAndUpdate({ userID: mentionedUser.id }, {$set: {'cats.ghostcat.amount': userCats.ghostcat.amount + amtCat}})
          break
        default: return message.channel.send('Please use a correct cat type')
      }

      return message.channel.send(`${args[2]} ${args[1]}'s has been added to ${mentionedUser} account`)
    })
    return
  }

  // {USAGE} cat addcat {cat name} {amount}
  if (args[1] && !args[2]) {
    // Adds Cats Of The Message Author
    const userCol = bot.database.Userdata
    userCol.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      const amtCat = Number(args[1])
      const userCats = userdata.cats

      switch (args[0]) {
        case 'siamese': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.siamese.amount': userCats.siamese.amount + amtCat}})
          break
        case 'burmese': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.burmese.amount': userCats.burmese.amount + amtCat}})
          break
        case 'ragdoll': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.ragdoll.amount': userCats.ragdoll.amount + amtCat}})
          break
        case 'persian': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.persian.amount': userCats.persian.amount + amtCat}})
          break
        case 'mainecoon': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.mainecoon.amount': userCats.mainecoon.amount + amtCat}})
          break
        case 'russianblue': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.burmese.amount': userCats.russianblue.amount + amtCat}})
          break
        case 'calico': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.calico.amount': userCats.calico.amount + amtCat}})
          break
        case 'tabby': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.tabby.amount': userCats.tabby.amount + amtCat}})
          break
        case 'abyssinian': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.abyssinian.amount': userCats.abyssinian.amount + amtCat}})
          break
        case 'manx': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.manx.amount': userCats.manx.amount + amtCat}})
          break
        case 'sphynx': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.sphynx.amount': userCats.sphynx.amount + amtCat}})
          break
        case 'cyprus': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.cyprus.amount': userCats.cyprus.amount + amtCat}})
          break
        case 'foldex': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.foldex.amount': userCats.foldex.amount + amtCat}})
          break
        case 'turkishangora': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.turkishangora.amount': userCats.turkishangora.amount + amtCat}})
          break
        case 'norwegianforest': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.tanorwegianforestbby.amount': userCats.norwegianforest.amount + amtCat}})
          break
        case 'korat': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.korat.amount': userCats.korat.amount + amtCat}})
          break
        case 'singapura': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.singapura.amount': userCats.singapura.amount + amtCat}})
          break
        case 'tonkinese': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.tonkinese.amount': userCats.tonkinese.amount + amtCat}})
          break
        case 'peterbald': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.peterbald.amount': userCats.peterbald.amount + amtCat}})
          break
        case 'chartreux': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.chartreux.amount': userCats.chartreux.amount + amtCat}})
          break
        case 'munchkin': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.munchkin.amount': userCats.munchkin.amount + amtCat}})
          break
        case 'britishshorthair': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.britishshorthair.amount': userCats.britishshorthair.amount + amtCat}})
          break
        case 'ojosazules': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.ojosazules.amount': userCats.ojosazules.amount + amtCat}})
          break
        case 'smokey': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.smokey.amount': userCats.smokey.amount + amtCat}})
          break
        case 'bandit': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.bandit.amount': userCats.bandit.amount + amtCat}})
          break
        case 'bug': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.bug.amount': userCats.bug.amount + amtCat}})
          break
        case 'linda': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.linda.amount': userCats.linda.amount + amtCat}})
          break
        case 'mittens': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.mittens.amount': userCats.mittens.amount + amtCat}})
          break
        case 'cash': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.cash.amount': userCats.cash.amount + amtCat}})
          break
        case 'jackson': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.jackson.amount': userCats.jackson.amount + amtCat}})
          break
        case 'cottonball': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.cottonball.amount': userCats.cottonball.amount + amtCat}})
          break
        case 'sonny': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.sonny.amount': userCats.sonny.amount + amtCat}})
          break
        case 'lailah': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.lailah.amount': userCats.lailah.amount + amtCat}})
          break
        case 'cher': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.cher.amount': userCats.cher.amount + amtCat}})
          break
        case 'marvin': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.marvin.amount': userCats.marvin.amount + amtCat}})
          break
        case 'loki': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.loki.amount': userCats.loki.amount + amtCat}})
          break
        case 'loverboy': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.loverboy.amount': userCats.loverboy.amount + amtCat}})
          break
        case 'killerclaws': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.killerclaws.amount': userCats.killerclaws.amount + amtCat}})
          break
        case 'squirtlett': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.squirtlett.amount': userCats.squirtlett.amount + amtCat}})
          break
        case 'cursedcat': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.cursedcat.amount': userCats.cursedcat.amount + amtCat}})
          break
        case 'uwu': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.uwu.amount': userCats.uwu.amount + amtCat}})
          break
        case 'tom': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.tom.amount': userCats.tom.amount + amtCat}})
          break
        case 'demoncat': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.demoncat.amount': userCats.demoncat.amount + amtCat}})
          break
        case 'bongocat': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.bongocat.amount': userCats.bongocat.amount + amtCat}})
          break
        case 'grumpycat': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.grumpycat.amount': userCats.grumpycat.amount + amtCat}})
          break
        case 'ghostcat': userCol.findOneAndUpdate({ userID: message.author.id }, {$set: {'cats.ghostcat.amount': userCats.ghostcat.amount + amtCat}})
          break
        default: return message.channel.send('Please use a correct cat type')
      }

      message.channel.send(`${args[1]} ${args[0]}'s has been added to your account`)
    })
  }
}

exports.help = {
  name: 'addcat',
  aliases: ['ac'],
  type: 'admin'
}
