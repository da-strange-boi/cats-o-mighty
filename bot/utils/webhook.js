let loop;
exports.ping = async (bot) => {
  let catsomighty = bot.guilds.find(search => search.id === '586062467080257537');
  let logChannel = catsomighty.channels.find(search => search.name === 'status');
  if(!logChannel) return console.log("Can't find incidents channel.");

  let ping;

  const checkPing = () => {
    newPing = Math.round(bot.ping);
    if(ping === newPing){ return false; }
    ping = newPing;
    if(ping > 1000){ // if ping is 1 sec
      return true;
    } else { return false; }
  }

  const hook = async (channel, message) => {
    channel.fetchWebhooks()
      .then(webhook => {
        let foundHook = webhook.find(webhook => webhook.name === 'cats o mighty mentel health advisor');
        if(!foundHook){
          channel.createWebhook('cats o mighty mentel health advisor', 'https://i.ytimg.com/vi/29AcbY5ahGo/hqdefault.jpg')
          .then(webhook => {
            webhook.send(message);
          })
          .catch(err => console.log(err));
        } else {
          foundHook.send(message);
        }
      });

  }

  loop = setInterval(() => {
    if(checkPing()){
      hook(logChannel, `[ :gear: **Bot Running Slow ]**\nping is currently: ${ping}ms`);
    }
  }, 10000);
}

exports.clearping = () => {
  clearInterval(loop);
}