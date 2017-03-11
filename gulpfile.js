'use strict'

// Config file
const conf = require('./gulp.json')

// Global dependencies
const gulp = require('gulp')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const count = require('gulp-count')

// Typescript
require('./gulp_task/ts_task.js')

// Sass
require('./gulp_task/sass_task.js')

// Pug
require('./gulp_task/pug_task.js')

gulp.task('default', () => {
    gulp.watch('dev/ts/**/*.*', ['js'])
    gulp.watch('dev/js/**/*.*', ['js'])
    gulp.watch('dev/sass/**/*.scss', ['sass'])
    gulp.watch('dev/pug/**/*.*', ['pug'])
})

gulp.task('build', () => {
    let runSequence = require('run-sequence')
    let del = require('del')

    del.sync('dist');

    runSequence('sass', 'js', 'pug', () => {
        console.log('Project is compilate!')
    })
})

/* &Server test */
gulp.task('serve', function () {
    const browserSync = require('browser-sync').create()
    browserSync.init({
        server: './dist'
    })
    gulp.watch('./dist/**/*.*').on('change', browserSync.reload)
})
