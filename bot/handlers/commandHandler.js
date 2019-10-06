module.exports = (bot) => {
  bot.loadCommand = (commandName) => {
    try {
      bot.log('system', `Loading Command: ${commandName}`)
      const props = require(`../commands/${commandName}`)
      if (props.init) {
        props.init(bot)
      }
      bot.commands.set(props.help.name, props)
      props.help.aliases.forEach(alias => {
        bot.aliases.set(alias, props.help.name)
      })
      return false
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`
    }
  }

  // bot.unloadCommand = async (commandName) => {
  //   let command
  //   if (bot.commands.has(commandName)) {
  //     command = bot.commands.get(commandName)
  //   } else if (bot.aliases.has(commandName)) {
  //     command = bot.commands.get(bot.aliases.get(commandName))
  //   }
  //   if (!command) return `The command \`${commandName}\` doesn't seem to exist, nor is it an alias. Try again!`

  //   if (command.shutdown) {
  //     await command.shutdown(bot)
  //   }
  //   const mod = require.cache[require.resolve(`../commands/${commandName}.js`)]
  //   bot.commands.delete(commandName)
  //   for (let i = 0; i < mod.parent.children.length; i++) {
  //     if (mod.parent.children[i] === mod) {
  //       mod.parent.children.splice(i, 1)
  //       break
  //     }
  //   }
  //   return false
  // }
}
