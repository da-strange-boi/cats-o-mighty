const chalk = require('chalk')
const dateformatter = require('@dastrangeboi/date-formatter')
const config = require('../config')

const getCurrentDate = () => {
  const date = new Date()
  return `${dateformatter(date, 'number')}`
}

const logging = async function Log (logType, logMessage) {
  switch (logType) {
    case 'system': console.log(chalk.inverse('[LOG][SYSTEM]') + chalk.hex(config.color.white)(` ${logMessage} `) + chalk.blue(getCurrentDate()))
      break
    case 'error': console.log(chalk.inverse('[LOG][ERROR]') + chalk.hex(config.color.red)(` ${logMessage} `) + chalk.blue(getCurrentDate()))
      break
    case 'statsPosted': console.log(chalk.inverse('[LOG][STATS POSTED]') + chalk.hex(config.color.lightblue)(` ${logMessage} `) + chalk.blue(getCurrentDate()))
      break
    default: console.log(chalk.inverse('[LOG][DEFAULT]') + chalk.hex(config.color.white)(` ${logMessage} `) + chalk.blue(getCurrentDate()))
      break
  }
}
module.exports = logging
