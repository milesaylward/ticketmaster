'use strict';

module.exports = (gulp, plugins, config) => (tasks) => {
  //ensure that gulp, plugins, and the config files are passed into each task before they execute.
  for (let task in tasks) {
    gulp.task(task, require(`../${tasks[task]}`)(gulp, plugins, config));
  }
};
