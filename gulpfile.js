/* These are the required packages needed to carry out the Gulp Task Below. */
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

// This is the imaging task.
gulp.task('image', () => {
    return gulp.src('./src/public/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('lib/public/img/'));
});

// This task transforms SASS into CSS.
gulp.task('sass', () => {
    return gulp.src('./src/public/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./lib/public/css'));
});

// This task runs unit testing from Mocha.
gulp.task('mocha', () => {
    gulp.src('tests/mocha.js', { read: false })
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha({ reporter: 'nyan' }))
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        });
});

gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.

    return gulp.src([
        '**/*.js*', '!**/*.json', '!node_modules/**', '!lib/**', '!src/public/js/authed.bundle.js',
    ])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});


// THIS IS MY DEFAULT TASK - Needs to watch both folder ([Folders / Files to Watch], [Gulp Task])
gulp.task('watch', () => {
    gulp.watch(['./src/public/img/*'], ['image']);
    gulp.watch(['./src/public/scss/*.scss'], ['sass']);
});

// Make my default task to watch both folders
gulp.task('default', ['watch']);