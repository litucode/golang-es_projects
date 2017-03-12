'use strict'

const gulp = require('gulp')
const conf = require('../gulp.json')
const count = require('gulp-count')
const header = require('gulp-header')
const concat = require('gulp-concat')
const cache = require('gulp-cache')

const imagemin = require('gulp-imagemin')

gulp.task('images', () => {
    return gulp.src(conf.images.watch)
        .pipe(cache(imagemin()))
        .pipe(count('## images compress'))
        .pipe(gulp.dest(conf.images.dist))
})
