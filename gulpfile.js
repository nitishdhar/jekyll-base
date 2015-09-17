var gulp = require('gulp');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// Task for building blog when something changed:
//gulp.task('build', shell.task(['bundle exec jekyll build --watch']));
// Or if you don't use bundle:
gulp.task('build', shell.task(['jekyll build --watch']));

// Handle JS file generation until jekyll comes with js support
gulp.task('js', function() {
  return gulp.src(['_js/jquery.js', '_js/bootstrap.js', '_js/base.js'])
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});
// Watch for JS changes and generate the JS file again
gulp.task('watchJS', function () {
    gulp.watch('_js/**/*.js', ['js']);
});

// Task for serving website with Browsersync
gulp.task('serve', function () {
    browserSync.init({server: {baseDir: '_site/'}});
    // Reloads page when some of the already built files changed:
    gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['js', 'build', 'serve', 'watchJS']);
