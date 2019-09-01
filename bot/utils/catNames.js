exports.fullcat = async (option) => {
  if(option === 'object'){
    return {siamese: 0,burmese: 0,ragdoll: 0,persian: 0,mainecoon: 0,russianblue: 0,calico: 0,tabby: 0,abyssinian: 0,manx: 0,sphynx: 0,cyprus: 0,foldex: 0,turkishangora: 0,norwegianforest: 0,korat: 0,singapura: 0,tonkinese: 0,peterbald: 0,chartreux: 0,munchkin: 0,britishshorthair: 0,bandit: 0,bug: 0,linda: 0,mittens: 0,cash: 0,jackson: 0,cottonball: 0,sonny: 0,smokey: 0,lailah: 0,cher: 0,marvin: 0,loki: 0,loverboy: 0,killerclaws: 0,squirtlett: 0,cursedcat: 0,uwu: 0,tom: 0,demoncat: 0}
  }
  if(option === 'array'){
    return animalList = ['siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'calico', 'tabby', 'abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishangora', 'norwegianforest', 'korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin', 'britishshorthair', 'bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws', 'squirtlett', 'cursedcat', 'uwu', 'tom', 'demoncat'];
  }
}

exports.cats = async (cattype, option) => {
  if(cattype === 'common'){
    if(option === 'array'){
      return ['siamese', 'burmese', 'ragdoll', 'persian', 'mainecoon', 'russianblue', 'calico', 'tabby'];
    }
  }
  if(cattype === 'uncommon'){
    if(option === 'array'){
      return ['abyssinian', 'manx', 'sphynx', 'cyprus', 'foldex', 'turkishangora', 'norwegianforest'];
    }
  }
  if(cattype === 'rare'){
    if(option === 'array'){
      return ['korat', 'singapura', 'tonkinese', 'peterbald', 'chartreux', 'munchkin', 'britishshorthair'];
    }
  }
  if(cattype === 'special'){
    if(option == 'array'){
      return ['bandit', 'bug', 'linda', 'mittens', 'cash', 'jackson', 'cottonball', 'sonny', 'smokey', 'lailah', 'cher', 'marvin', 'loki', 'loverboy', 'killerclaws'];
    }
  }
  if(cattype === 'impossible'){
    if(option === 'array'){
      return ['squirtlett', 'cursedcat', 'uwu', 'tom', 'demoncat'];
    }
  }
}

exports.getCat = async () => {

}