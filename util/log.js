const chalk = require('chalk');
const pkg = require('../package.json');

module.exports = {
  util: {
    split: function () {
      console.log(chalk.white('-------------------------------------------------------------'));
    }
  },

  info: function (msg) {
    console.log(chalk.green('(info): ') + msg);
  },

  warn: function (msg) {
    console.log(chalk.red('(warning): ') + msg);
  },

  debug: function (msg) {
    console.log(chalk.white('debug: ') + msg);
  },

  item: function (msg) {
    console.log(chalk.yellow('| ') + chalk.blue(msg));
  }
}
