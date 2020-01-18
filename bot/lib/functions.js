// Convert millaseconds to time
const msToTime = (ms) => {
  const days = Math.floor((ms / 86400000)) // 1 Day = 86400000 Milliseconds
  const hours = Math.floor((ms % 86400000) / 3600000) // 1 Hour = 3600000 Milliseconds
  const minutes = Math.floor((ms % 3600000) / 60000) // 1 Minutes = 60000 Milliseconds
  const seconds = Math.floor(((ms % 360000) % 60000) / 1000) // 1 Second = 1000 Milliseconds
  return {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds
  }
}

// Function To Make The First Letter Of A Word Capitalized
const cap = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Checks to see if user has a tag at the end of username
const hasTag = (t) => {
  const regex = /#[0-9]{4}$/g
  return regex.test(t)
}

// https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
const formatMoney = (amount, decimalCount = 0, decimal = '.', thousands = ',') => { 
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = amount < 0 ? '-' : ''

    const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.log(e)
  }
}

const parseRarityForDB = (rarity) => {
  switch(rarity){
    case('common'):     return 'a_' + rarity
    case('uncommon'):   return 'b_' + rarity
    case('rare'):       return 'c_' + rarity
    case('special'):    return 'd_' + rarity
    case('impossible'): return 'e_' + rarity
    case('seasonal'):   return 'f_' + rarity
    default:            return rarity
  }
}

module.exports = {
  msToTime: msToTime,
  cap: cap,
  formatMoney: formatMoney,
  hasTag: hasTag,
  parseRarityForDB: parseRarityForDB
}