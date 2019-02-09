const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
var pug = require('gulp-pug');

const distDirectory = 'dist';
const pugBlob = 'src/*.pug';
const imagesBlob = 'src/images/**';
const stylesBlob = 'src/**/*.scss';
const stylesRoot = 'src/scss/*.scss';
const CssBlob = 'src/scss/*.css';


gulp.task('default', function () {
    return runSequence('build', 'serve');
});

gulp.task('copy-libs', function () {
    return gulp.src('src/lib/**')
        .pipe(gulp.dest('dist/lib/'));
});
gulp.task('copy-js', function () {
    return gulp.src('src/js/**')
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('build', function () {
    return runSequence(
        'cleanDist',
        ['processStyles', 'processHtml', 'processImages', 'copy-libs','copy-js', 'processCss']
    );
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: distDirectory
        }
    });

    gulp.watch(pugBlob, function () {
        return runSequence('processHtml', 'reloadBrowser');
    });

    gulp.watch(imagesBlob, function () {
        return runSequence('processImages', 'reloadBrowser');
    });

    gulp.watch(stylesBlob, function () {
        return runSequence('processStyles', 'reloadBrowser');
    });

    gulp.watch('src/**/*.pug', function () {
        return runSequence('processPugFiles', 'processHtml', 'reloadBrowser');
    });

    gulp.watch(CssBlob, function () {
        return runSequence('processCss', 'reloadBrowser');
    });

});

gulp.task('cleanDist', function () {
    return gulp.src(distDirectory, {read: false, allowEmpty: true}).pipe(clean());
});

gulp.task('processPugFiles', function () {
    return gulp.src('src/**/*.pug');
});

gulp.task('processHtml', function () {
    return gulp.src(pugBlob)
        .pipe(pug({pretty:true}))
        .pipe(gulp.dest(distDirectory));
});

gulp.task('processImages', function () {
    return gulp.src(imagesBlob)
        .pipe(gulp.dest('dist/images/'));
});

 gulp.task('processCss', function () {
     return gulp.src(CssBlob)
         .pipe(gulp.dest('dist/css/'));
 });

gulp.task('processStyles', function () {
    return gulp.src(stylesRoot)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('reloadBrowser', function (done) {
    browserSync.reload();
    done();
});