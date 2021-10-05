const gulp = require('gulp');
const ts = require('@cloudhub-js/gulp-typescript');
const glob = require('glob');
const path = require('path');

function runLint(dir, options = {}) {
  const configFile =
    options.configFile || path.join(__dirname, './tsconfig.json');

  const tsProject = ts.createProject(configFile, {
    // noImplicitAny: false,
    allowJs: true,
    checkJs: true,
    noEmitOnError: true,
    noEmit: true,
  });
  gulp
    .src(`${dir}/**/*.js`) // or tsProject.src()
    .pipe(tsProject());
}

function processingQueue(dirs, options) {
  dirs.forEach((dir) => {
    if (glob.hasMagic(dir)) {
      glob.sync(dir).forEach((file) => {
        runLint(file, options);
      });
    } else {
      runLint(dir, options);
    }
  });
}

module.exports = function (dirs, options) {
  processingQueue(dirs, options);
};
