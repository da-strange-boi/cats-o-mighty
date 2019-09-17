exports.start = async (message, date) => {
  return {
    userID: message.author.id,
    userTag: message.author.tag,
    cats: {siamese: 0,burmese: 0,ragdoll: 0,persian: 0,mainecoon: 0,russianblue: 0,calico: 0,tabby: 0,abyssinian: 0,manx: 0,sphynx: 0,cyprus: 0,foldex: 0,turkishangora: 0,norwegianforest: 0,korat: 0,singapura: 0,tonkinese: 0,peterbald: 0,chartreux: 0,munchkin: 0,britishshorthair: 0,bandit: 0,bug: 0,linda: 0,mittens: 0,cash: 0,jackson: 0,cottonball: 0,sonny: 0,smokey: 0,lailah: 0,cher: 0,marvin: 0,loki: 0,loverboy: 0,killerclaws: 0,squirtlett: 0,cursedcat: 0,uwu: 0,tom: 0,demoncat: 0},
    money: {catmoney: 0},
    times: {dailyTime: 0,voteTime: 0,usedBotLast: date},
    stats: {catsSold: 0,saidCat: 1,dailyStreak: 0}
  }
}