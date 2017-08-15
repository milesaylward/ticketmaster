'use strict';

const BrowserSync = require('browser-sync');

module.exports = (gulp, plugins, config) => () => {
  BrowserSync.init({ server: './public' })
  BrowserSync.watch('./public/**/*.*').on('change', BrowserSync.reload);
};
