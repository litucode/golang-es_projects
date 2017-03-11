'use strict'

const gulp = require('gulp')
const conf = require('../gulp.json')
const auth = require('../auth.json')
const count = require('gulp-count')
const header = require('gulp-header')
const concat = require('gulp-concat')

const tmp = './dev/tmp/js'
let prod = 'dist/assets/js'
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const replace = require('gulp-string-replace');

let jsFiles = [
    /// TMP 
    'temp/conf.js',
    /// Main
    'dev/js/main.js'
]

// Typescript
gulp.task('js', function () {
    gulp.src(["dev/js/conf.js"]) // Any file globs are supported 
        .pipe(replace(new RegExp('@key@', 'g'), '"' + auth.key + '"'))
        .pipe(replace(new RegExp('@token@', 'g'),  '"' + auth.token  + '"' ))
        .pipe(replace(new RegExp('@boards@', 'g'),  '"' + auth.boards + '"'))
        .pipe(gulp.dest('./temp/'))
    /////////////////////////////////////
    gulp.src('dev/ts/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(ts({
            module: "System",
            noImplicitAny: false,
            sourceMap: true,
        }))
        .pipe(count('## ts-files selected'))
        .pipe(gulp.dest(prod))
    /////////////////////////////////////
    gulp.src(jsFiles)
        .pipe(header('\n/* **********************************************\n' +
            '     Begin <%= file.relative %>\n' +
            '********************************************** */\n\n'))
        .pipe(count('## js-files selected'))
        .pipe(concat('all.web.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(count('## js-files selected'))
})