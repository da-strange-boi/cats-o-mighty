const chalk = require("chalk");
const dateformatter = require('@dastrangeboi/date-formatter');
const config = require("../config.json");

const date = function getNowDateTimeStr(){
  let date = new Date();
  return `${dateformatter(date, 'number')}`;
}

const logging = async function Log(type, message){
  switch(type){
    case "system": console.log(chalk.inverse('[LOG][SYSTEM]') + chalk.hex(config.color.white)(` ${message} `) + chalk.blue(date()))
      break;
    case "error": console.log(chalk.inverse('[LOG][ERROR]') + chalk.hex(config.color.red)(` ${message} `) + chalk.blue(date()))
      break;
    default: console.log(chalk.inverse(`[LOG][DEFAULT]`) + chalk.hex(config.color.white)(` ${message} `) + chalk.blue(date()))
      break
  }
}
module.exports = logging;