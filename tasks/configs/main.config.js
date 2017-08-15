module.exports = {
  tasks: './tasks',
  paths: {
    sass: './sass/**/*.scss',
    scsslint: './scsslint.yml',
    entry: './js/index.js',
    js: './js/**/*.js',
    html: './*.html',
    dist: './public'
  },
  output: {
    js: 'js',
    css: 'css',
    images: 'images'
  }
};
