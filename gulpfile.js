// Lista de tareas Automatizadas - Front-End.
/*
    componente (plugin) [browser-sync] - Crea un servidor y recarga el navegador
    componente (plugin) [gulp-babel] - Convierte la sintaxis de ES6 a ES5
    componente (plugin) [gulp-sass] - Convierte la sintaxis de SCSS a CSS
    componente (plugin) [gulp-autoprefixer] - Prefijos caracteristicas CSS 

    -- Minificadores --
    componente (plugin) [gulp-htmlmin] - Minifica los archivos HTML 
    componente (plugin) [gulp-cssnano] - Minifica los archivos CSS
    componente (plugin) [gulp-uglify] - Minifica los archivos JS
    componente (plugin) [gulp-imagemin] - Minifica los archivos PNG, JPEG, GIF, SVG 
    */
'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

// Build server browser
gulp.task('serve', ['html', 'css', 'javascript'], () => {
    browserSync.init({
        server: "./app"
    });  
});

// MODIFICAR LUEGO task Pug converte- 
gulp.task('html', () => {
    return gulp.src('./pug/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./app'));
  });


// Compile SCSS to CSS
gulp.task('css', () => {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/css'))
        .pipe(browserSync.stream());
});

// Compile JavaScript ES6 to ES5
gulp.task('javascript', () => {
    gulp.src('./es6/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./app/js'))
});



/* ----------Tareas manuales------------- */

// Optimizador imagenes JPEG, PNG, GIF, SVG
gulp.task('optimizedImages', () => {
    gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/img'))
});


gulp.task('default', ['serve'], () => {
    gulp.watch("./pug/**/*.pug", ['html']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("./scss/**/*.scss", ['css']).on('change', browserSync.reload);
    gulp.watch("./es6/*.js", ['javascript']).on('change', browserSync.reload);
});
