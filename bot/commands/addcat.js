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

    bot.database.Userdata.findOne({ userID: mentionedUser.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      const userCats = userdata.cats
      if (args[1] === 'siamese') { userCats.siamese += amtCat } if (args[1] === 'burmese') { userCats.burmese += amtCat } if (args[1] === 'ragdoll') { userCats.ragdoll += amtCat } if (args[1] === 'persian') { userCats.persian += amtCat } if (args[1] === 'maine coon' || args[1] === 'mainecoon') { userCats.mainecoon += amtCat } if (args[1] === 'russianblue') { userCats.russianblue += amtCat } if (args[1] === 'calico') { userCats.calico += amtCat } if (args[1] === 'tabby') { userCats.tabby += amtCat }
      if (args[1] === 'abyssinian') { userCats.abyssinian += amtCat } if (args[1] === 'manx') { userCats.manx += amtCat } if (args[1] === 'sphynx') { userCats.sphynx += amtCat } if (args[1] === 'cyprus') { userCats.cyprus += amtCat } if (args[1] === 'foldex') { userCats.foldex += amtCat } if (args[1] === 'turkishangora') { userCats.turkishangora += amtCat } if (args[1] === 'norwegianforest') { userCats.norwegianforest += amtCat }
      if (args[1] === 'korat') { userCats.korat += amtCat } if (args[1] === 'singapura') { userCats.singapura += amtCat } if (args[1] === 'tonkinese') { userCats.tonkinese += amtCat } if (args[1] === 'peterbald') { userCats.peterbald += amtCat } if (args[1] === 'chartreux') { userCats.chartreux += amtCat } if (args[1] === 'munchkin') { userCats.munchkin += amtCat } if (args[1] === 'britishshorthair') { userCats.britishshorthair += amtCat }
      if (args[1] === 'bandit') { userCats.bandit += amtCat } if (args[1] === 'bug') { userCats.bug += amtCat } if (args[1] === 'linda') { userCats.linda += amtCat } if (args[1] === 'mittens') { userCats.mittens += amtCat } if (args[1] === 'cash') { userCats.cash += amtCat } if (args[1] === 'jackson') { userCats.jackson += amtCat } if (args[1] === 'cottonball') { userCats.cottonball += amtCat } if (args[1] === 'sonny') { userCats.sonny += amtCat } if (args[1] === 'smokey') { userCats.smokey += amtCat } if (args[1] === 'lailah') { userCats.lailah += amtCat } if (args[1] === 'cher') { userCats.cher += amtCat } if (args[1] === 'marvin') { userCats.marvin += amtCat } if (args[1] === 'loki') { userCats.loki += amtCat } if (args[1] === 'loverboy') { userCats.loverboy += amtCat } if (args[1] === 'killerclaws') { userCats.killerclaws += amtCat }
      if (args[1] === 'squirtlett') { userCats.squirtlett += amtCat } if (args[1] === 'cursedcat') { userCats.cursedcat += amtCat } if (args[1] === 'uwu') { userCats.uwu += amtCat } if (args[1] === 'tom') { userCats.tom += amtCat } if (args[1] === 'demoncat') { userCats.demoncat += amtCat }

      userdata.save().catch(err => console.log(err))

      return message.channel.send(`${args[2]} ${args[1]}'s has been added to ${mentionedUser} account`)
    })
    return
  }

  // {USAGE} cat addcat {cat name} {amount}
  if (args[1]) {
    // Clears Cats Of The Message Author
    bot.database.Userdata.findOne({ userID: message.author.id }, (err, userdata) => {
      if (err) bot.log('error', err)

      const amtCat = Number(args[1])
      const userCats = userdata.cats

      if (args[0] === 'siamese') { userCats.siamese += amtCat } if (args[0] === 'burmese') { userCats.burmese += amtCat } if (args[0] === 'ragdoll') { userCats.ragdoll += amtCat } if (args[0] === 'persian') { userCats.persian += amtCat } if (args[0] === 'maine coon' || args[0] === 'mainecoon') { userCats.mainecoon += amtCat } if (args[0] === 'russianblue') { userCats.russianblue += amtCat } if (args[0] === 'calico') { userCats.calico += amtCat } if (args[0] === 'tabby') { userCats.tabby += amtCat }
      if (args[0] === 'abyssinian') { userCats.abyssinian += amtCat } if (args[0] === 'manx') { userCats.manx += amtCat } if (args[0] === 'sphynx') { userCats.sphynx += amtCat } if (args[0] === 'cyprus') { userCats.cyprus += amtCat } if (args[0] === 'foldex') { userCats.foldex += amtCat } if (args[0] === 'turkishangora') { userCats.turkishangora += amtCat } if (args[0] === 'norwegianforest') { userCats.norwegianforest += amtCat }
      if (args[0] === 'korat') { userCats.korat += amtCat } if (args[0] === 'singapura') { userCats.singapura += amtCat } if (args[0] === 'tonkinese') { userCats.tonkinese += amtCat } if (args[0] === 'peterbald') { userCats.peterbald += amtCat } if (args[0] === 'chartreux') { userCats.chartreux += amtCat } if (args[0] === 'munchkin') { userCats.munchkin += amtCat } if (args[0] === 'britishshorthair') { userCats.britishshorthair += amtCat }
      if (args[0] === 'bandit') { userCats.bandit += amtCat } if (args[0] === 'bug') { userCats.bug += amtCat } if (args[0] === 'linda') { userCats.linda += amtCat } if (args[0] === 'mittens') { userCats.mittens += amtCat } if (args[0] === 'cash') { userCats.cash += amtCat } if (args[0] === 'jackson') { userCats.jackson += amtCat } if (args[0] === 'cottonball') { userCats.cottonball += amtCat } if (args[0] === 'sonny') { userCats.sonny += amtCat } if (args[0] === 'smokey') { userCats.smokey += amtCat } if (args[0] === 'lailah') { userCats.lailah += amtCat } if (args[0] === 'cher') { userCats.cher += amtCat } if (args[0] === 'marvin') { userCats.marvin += amtCat } if (args[0] === 'loki') { userCats.loki += amtCat } if (args[0] === 'loverboy') { userCats.loverboy += amtCat } if (args[0] === 'killerclaws') { userCats.killerclaws += amtCat }
      if (args[0] === 'squirtlett') { userCats.squirtlett += amtCat } if (args[0] === 'cursedcat') { userCats.cursedcat += amtCat } if (args[0] === 'uwu') { userCats.uwu += amtCat } if (args[0] === 'tom') { userCats.tom += amtCat } if (args[0] === 'demoncat') { userCats.demoncat += amtCat }

      userdata.save().catch(err => console.log(err))

      message.channel.send(`${args[1]} ${args[0]}'s has been added to your account`)
    })
  }
}

exports.help = {
  name: 'addcat',
  aliases: ['ac'],
  type: 'admin'
}
