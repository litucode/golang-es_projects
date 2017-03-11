'use strict'

const gulp = require('gulp')
const conf = require('../gulp.json')
const count = require('gulp-count')
const header = require('gulp-header')
const concat = require('gulp-concat-css')
const sourcemaps = require('gulp-sourcemaps')

const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const mqpacker = require("css-mqpacker")
const discardEmpty = require('postcss-discard-empty')
const discardDup = require('postcss-discard-duplicates')
const colormin = require('postcss-colormin')
const reduceIdents = require('postcss-reduce-idents')
const minSelectors = require('postcss-minify-selectors')
const fontValues = require('postcss-minify-font-values')

const processors = [
        autoprefixer({
            browsers: ['last 2 versions', '> 2%']
        }),
        mqpacker(),
        discardEmpty(),
        // discardDup(),
        // // docs  https://github.com/ben-eb/postcss-reduce-idents
        // reduceIdents(),
        // fontValues(),
        cssnano()
    ]

gulp.task('sass', () => {

    gulp.src(conf.sass.watch)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(conf.sass.temp))
        .pipe(count('## sass selected'))

    gulp.src(conf.vendors.css)
        .pipe(concat(conf.sass.dist_name, {rebaseUrls: false}))
        .pipe(count('## css selected'))
        .pipe(postcss(processors))
        .pipe(count('## PostCSS selected'))
        .pipe(gulp.dest(conf.sass.dist))
})
