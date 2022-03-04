const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
// Initialize eslint cli engine

const CLI = require('eslint').CLIEngine;

const cli = new CLI({
  fix: false, // difference from last example
});

function runLint(dir, format) {
  const formatter = cli.getFormatter(format);
  const report = cli.executeOnFiles([dir]);

  if (report && report.errorCount > 0) {
    console.log(
      chalk.red('eslint[') +
        dir.replace(process.cwd(), '') +
        chalk.red(']: Code did not pass lint rules') +
        formatter(report.results),
    );
  } else if (report && report.warningCount > 0) {
    console.log(
      chalk.yellow('eslint[') +
        dir.replace(process.cwd(), '') +
        chalk.yellow(']: Code did not pass lint rules') +
        formatter(report.results),
    );
  } else {
    // console.log(
    //   chalk.green("eslint[") +
    //     dir.replace(process.cwd(), "") +
    //     chalk.green("]: All tests pass") +
    //     formatter(report.results)
    // );
  }
}

function processingQueue(dirs, format) {
  dirs.forEach((dir) => {
    if (glob.hasMagic(dir)) {
      glob.sync(dir).forEach((file) => {
        runLint(file, format);
      });
    } else {
      runLint(dir, format);
    }
  });
}

module.exports = function (dirs, { format = 'stylish' }) {
  processingQueue(dirs, format);
};
