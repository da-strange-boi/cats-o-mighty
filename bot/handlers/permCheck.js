function perms (message, command, prefix) {
  if (!message.content.trim().toLowerCase().startsWith(prefix)) return

  if (command.help.type === 'moderator' && message.author.id !== '295255543596187650' && message.author.id !== '552316796439494658' && message.author.id !== '481318379907579916' && message.author.id !== '527729016849956874') {
    message.channel.send('**Insufficient Permissions**')
    return false
  } else if (command.help.type === 'admin' && message.author.id !== '295255543596187650' && message.author.id !== '527729016849956874') {
    message.channel.send('**Insufficient Permissions**')
    return false
  } else return true
}

module.exports = perms
