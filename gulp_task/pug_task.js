'use strict'

const gulp = require('gulp')
const conf = require('../gulp.json')
const count = require('gulp-count')
const header = require('gulp-header')
const concat = require('gulp-concat')
const pug = require('gulp-pug')

gulp.task('pug', () => {

    return gulp.src(conf.pug.watch)
        .pipe(pug({}))
        .pipe(gulp.dest(conf.pug.dist))
		.pipe(count('## pug compile'))
})
