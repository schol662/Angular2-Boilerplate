var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';
var appDeploy = 'deploy';

var tsProject = typescript.createProject('tsconfig.json');

/* Clean the build (app) directory */
gulp.task('clean', function(callback) {
   return del([appProd], callback); 
});

/* Maak de deploy directory leeg */
gulp.task('clean-deploy', function(callback) {
    return del([appDeploy], callback);
});

/* Build task */
gulp.task('deploy', function() {
    console.log("Start met deployen van de applicatie.");
    
    runSequence('clean-deploy', ['build-ts', 'deploy-html']);
});

/* Build Typescript task */
gulp.task('build-ts', function() {
   return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(appProd));
});

/* Deploy HTML */
gulp.task('deploy-html', function() {
   return gulp.src('./*.html')
        .pipe(gulp.dest(appDeploy)); 
});

/* Watch */
gulp.task('watch', function() {
   gulp.watch(appDev + '**/*.ts', ['build-ts']); 
});

/* Default Gulp task */
gulp.task('default', ['watch', 'build-ts']);