var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var del = require('del');
var browserSync = require('browser-sync').create();

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';

var tsProject = typescript.createProject('tsconfig.json');

/* Clean the build (app) directory */
gulp.task('clean', function(callback) {
   return del([appProd], callback); 
});

/* Build Typescript task */
gulp.task('build-ts', function() {
   return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appProd));
});

/* Build HTML */
gulp.task('build-html', function() {
   return gulp.src('./*.html')
        .pipe(gulp.dest(appProd)); 
});

/* Watch */
gulp.task('watch', function() {
   gulp.watch(appDev + '**/*.ts', ['build-ts']); 
});

/* Default Gulp task */
gulp.task('default', ['watch', 'build-ts']);