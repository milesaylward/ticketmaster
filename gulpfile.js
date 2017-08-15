'use strict';

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();
const config = require('./tasks/configs/main.config');
const register = require(`./tasks/utils/register`);

//Gulp tasks have been split into smaller files that deal with their particular task. See tasks.
//gulp-load-plugins handles bringing any packages that start with the word gulp into our project
//as if they were individually required. They are access with plugins.PACKAGE_NAME
register(gulp, plugins, config)({
  'lint:scss': 'lint-scss',
  'build:scss': 'build-scss',
  'build:js': 'build-js',
  'copy': 'copy',
  'watch': 'watch',
  'serve': 'serve'
});

gulp.task('build', gulp.parallel('build:js', 'build:scss', 'copy'));
gulp.task('default', gulp.series('build', gulp.parallel('watch', 'serve')));
