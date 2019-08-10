var chalk = require('chalk')
var date = function getNowDateTimeStr() {
    var now = new Date();
    var hour = now.getHours() - (now.getHours() >= 12 ? 12 : 0);
    return [[AddZero(now.getDate()), AddZero(now.getMonth() + 1), now.getFullYear()].join("/"), [AddZero(hour), AddZero(now.getMinutes())].join(":"), now.getHours() >= 12 ? "PM" : "AM"].join(" ");
}
function AddZero(num) {
    return (num >= 0 && num < 10) ? "0" + num : num + "";
}
const basics = async function Log(type, message) {
  switch (type) {
    case "normal": console.log(chalk.inverse(`[Log][Normal]`) + chalk.white(` ${message}. `) + chalk.blue(date()))
      break;
    case "warning": console.log(chalk.inverse(`[Log][Warning]`) + chalk.yellow(` ${message}. `) + chalk.blue(date()))
      break;
    case "priority": console.log(chalk.inverse(`[Log][Priority]`) + chalk.red(` ${message}. `) + chalk.blue(date()))
      break;
    case "offline": console.log(chalk.inverse(`[Log][Bot Stop]`) + chalk.red(` ${message}. `) + chalk.blue(date()))
      break;
    case "system": console.log(chalk.inverse(`[Log][System]`) + chalk.green(` ${message}. `) + chalk.blue(date()))
      break;
    case "database": console.log(chalk.inverse(`[Log][Database]`) + chalk.cyan(` ${message}. `) + chalk.blue(date()))
      break;
    case "databaseError": console.log(chalk.inverse(`[Log][Database Error]`) + chalk.magenta(` ${message}. `) + chalk.blue(date()))
      break;
    default: console.log(chalk.inverse(`[Log][Default]`) + chalk.white(` ${message}. `) + chalk.blue(date()))
  }
}
module.exports = basics;