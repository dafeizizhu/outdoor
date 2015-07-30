var gulp = require('gulp')
var rimraf = require('rimraf')
var through = require('through2')
var path = require('path')
var uglify = require('gulp-uglify')
var jade = require('gulp-jade')
var data = require('gulp-data')
var uglifycss = require('gulp-uglifycss')
var runSequence = require('run-sequence')
var zip = require('gulp-zip')
var moment = require('moment')

var DIST = './dist'

var version = moment().format('YYYYMMDDHHmmSS')

gulp.task('default', function () {
  console.log('This is my first gulp file')
})

var replaceUrl = function (option) {
  return through.obj(function (file, enc, cb) {
    //file.contents = new Buffer(String(file.contents).replace(/src="\//g, 'src="'))
    if (file.contents) {
      file.contents = new Buffer(String(file.contents).replace(option.regExp, option.target))
    }
    cb(null, file)
  })
}

gulp.task('build-js', function (cb) {
  gulp.src(['./js/**/*.js', './common/**/*.js'], {base: './'})
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
})

gulp.task('build-html', function (cb) {
  gulp.src('*.jade')
    .pipe(data(function (file) {
      return require('./server/data/' + path.basename(file.path, '.jade'))
    }))
    .pipe(jade({
      pretty: true
    }))
    .pipe(replaceUrl({regExp: /src="\//g, target: 'src="'}))
    .pipe(replaceUrl({regExp: /href="\//g, target: 'href="'}))
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
})

gulp.task('build-css', function (cb) {
  gulp.src(['./css/**/*.css', './common/**/*.css'], {base: './'})
    .pipe(replaceUrl({regExp: /url\(\//g, target: 'url(\.\.\/'}))
    .pipe(uglifycss())
    .pipe(gulp.dest('./dist'))
    .on('end', cb)
})

gulp.task('build-images', function (cb) {
  gulp.src('./images/**/*.png')
    .pipe(gulp.dest('./dist/images'))
    .on('end', cb)
})

gulp.task('build-zip', ['build'], function (cb) {
  gulp.src('./dist/**/*')
    .pipe(zip('archive_' + version + '.zip'))
    .pipe(gulp.dest('./build'))
    .on('end', cb)
})

gulp.task('clean', function (cb) {
  rimraf(DIST, cb)
})

gulp.task('build', function (cb) {
  runSequence('clean', 'build-html', 'build-css', 'build-js', 'build-images', cb)
})
