/* eslint-disable indent */
const chalk = require('chalk')
const getDate = require('./getDate')
const config = require('../config')
const version = require('../../package')

const getCurrentDate = () => {
  const date = new Date()
  return getDate.run(date)
}

/**
 * Logs a message to the console
 * @param {string} logType system, error, statsPosted
 * @param {string} logMessage whatever the log should say
 */
const logging = async function Log (logType, logMessage) {
  switch (logType) {
    case 'system': console.log(chalk.inverse('[LOG][SYSTEM]') + chalk.hex(config.color.white)(` ${logMessage} `) + chalk.blue(getCurrentDate()))
      break
    case 'error': console.log(chalk.inverse('[LOG][ERROR]') + chalk.hex(config.color.red)(` ${logMessage} `) + chalk.blue(getCurrentDate()))
      break
    case 'statsPosted': console.log(chalk.inverse('[LOG][STATS POSTED]') + chalk.hex(config.color.lightblue)(` ${logMessage} `) + chalk.blue(getCurrentDate()))
      break
    case 'botOnline': console.log(chalk.inverse('[LOG][ONLINE]') + chalk.hex(config.color.seagreeen)(` Version ${version.version} `) + chalk.blue(getCurrentDate()))
      break
    default: console.log(chalk.inverse('[LOG][DEFAULT]') + chalk.hex(config.color.white)(` ${logMessage} `) + chalk.blue(getCurrentDate()))
      break
  }
}
module.exports = logging
