let catsomighty = bot.guilds.find(search => search.id === '586062467080257537');
let logChannel = catsomighty.channels.find(search => search.name === 'status');
if(!logChannel) return console.log("Can't find incidents channel.");

let ping;

const checkPing = () => {
  if(ping === bot.ping){ return false; }
  ping = Math.round(bot.ping);
  if(ping > 40){ // if ping is 1 sec
    return true;
  } else { return false; }
}

const hook = async (channel, message) => {
  channel.fetchWebhooks()
    .then(webhook => {
      let foundHook = webhook.find(webhook => webhook.name === 'Status');
      if(!foundHook){
        channel.createWebhook('Status', 'https://i.ytimg.com/vi/29AcbY5ahGo/hqdefault.jpg')
        .then(webhook => {
          webhook.send(message);
        })
        .catch(err => console.log(err));
      } else {
        foundHook.send(message);
      }
    });

}

setInterval(() => {
  if(checkPing()){
    hook(logChannel, `[ :gear: **Bot Running Slow ]**\nping is currently: ${ping}ms`)
  }
}, 10000);