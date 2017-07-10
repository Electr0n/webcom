'use strict';

var gulp        = require('gulp'),
    stylus      = require('gulp-stylus'),
    sourcemaps  = require('gulp-sourcemaps'),
    debug       = require('gulp-debug'),
    del         = require('del'),
    newer       = require('gulp-newer'),
    imagemin    = require('gulp-imagemin'),
    concat      = require('gulp-concat'),
    pug         = require('gulp-pug'),
    plumber     = require('gulp-plumber'),
    prefix      = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

var useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify');

var paths = {
  devDir: 'dev/',
  appDir: 'public/',
  blocks: 'blocks/'
};

gulp.task('pug',function() {
  return gulp.src([paths.blocks + '**/*.pug', '!' + paths.blocks + 'template.pug'])
    .pipe(plumber())
    .pipe(pug({ 
      doctype: 'html',
      pretty: true
    }))
    .pipe(gulp.dest(paths.devDir))
    .pipe(browserSync.stream());
});

// var postcss = require('gulp-postcss');
// var autoprefixer = require('autoprefixer-core');

gulp.task('styles', function(){
  return gulp.src(paths.blocks + '**/*.styl')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(stylus())
    .pipe(prefix({
      browsers: ['last 10 versions', 'Firefox >= 20'],
      cascade:  true
    }))
    // .pipe(postcss([ autoprefixer({ browsers: ["> 0%"] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.devDir + 'css/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
  return gulp.src([
    paths.blocks + '**/*.js', '!' + '_assets/**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.devDir + 'js/'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function(){
  return del(paths.appDir);
});

gulp.task('serve', function(){
  browserSync.init({
    server: 'dev'
  });
  
  browserSync.watch(paths.devDir + '/**/*.*').on('change', browserSync.reload);
});

gulp.task('public', function(){
  browserSync.init({
    server: 'public'
  });
});

gulp.task('html:build', function () {
  return gulp.src(paths.devDir + '*.html')
    .pipe( useref() )
    .pipe( gulp.dest(paths.appDir) );
});

gulp.task('css:build', function(){
  return gulp.src(paths.devDir + '**/*.css')
    .pipe(sourcemaps.init())
    .pipe(prefix({
      browsers: ['last 10 versions'],
      cascade:  true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(cssmin())
    .pipe(concat('main.css.min'))
    .pipe(gulp.dest(paths.appDir + 'css/'));
});

gulp.task('js:build', function(){
  return gulp.src([
    paths.devDir + '**/*.js', '!' + '_assets/**/*.js'
    ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.appDir + 'js/'));
});

gulp.task('img:build', function() {
  return gulp.src(paths.devDir + 'img/**/*.*')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.appDir + 'img/'));
});

gulp.task('watch', function(){
  gulp.watch(paths.blocks + '**/*.pug', gulp.series('pug'));
  gulp.watch(paths.blocks + '**/*.styl', gulp.series('styles'));
  gulp.watch(paths.blocks + '**/*.js', gulp.series('js'));
});

gulp.task('dev', gulp.series('pug', 'styles', 'js', gulp.parallel('watch', 'serve')));
gulp.task('prod', gulp.series('html:build', 'css:build', 'js:build', 'img:build'));
gulp.task('default', gulp.series('public'));