/////////////
// Imports //
/////////////
const autoprefixer = require('autoprefixer'),
      browserSync  = require("browser-sync").create(),
      cssnano      = require('cssnano'),
      gulp         = require('gulp'),
      htmlmin      = require('gulp-htmlmin'),
      imagemin     = require('gulp-imagemin'),
      pipeline     = require('readable-stream').pipeline,
      postcss      = require('gulp-postcss'),
      sass         = require('gulp-sass'),
      sourcemaps   = require('gulp-sourcemaps'),
      uglify       = require('gulp-uglify');

///////////
// Paths //
///////////
const paths = {
    browserSync: {
        baseDir: './app'
    },
    css: {
        src: './app/**/*.css',
        dest: './app/**/*.css'
    },
    html: {
        src: './src/**/*.html',
        dest: './app'
    },
    images: {
        src: './src/images/**/*',
        dest: './app/images'
    },
    js: {
        src: './src/js/**/*.js',
        dest: './app'
    },
    styles: {
        src: './src/sass/**/*.scss',
        dest: './app'
    }
};

//////////
// HTML //
//////////
// Options
const htmlNanoOptions = {
    collapseWhitespace: true,
    removeComments: true,
}

function html() {
    return gulp
        .src(paths.html.src)
        .pipe(htmlmin(htmlNanoOptions))
        .pipe(gulp.dest(paths.html.dest));
}
exports.html = html;

////////////
// Images //
////////////
function images() {
    return gulp
        .src(paths.images.src)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}
exports.images = images;

////////
// JS //
////////
function js() {
    return pipeline(
          gulp.src(paths.js.src),
          uglify(),
          gulp.dest(paths.js.dest)
    );
}
exports.js = js;

//////////
// Sass //
//////////
function style() {
    return (
        gulp
            .src(paths.styles.src)
            .pipe(sourcemaps.init())
            .pipe(sass())
            .on('error', sass.logError)
            .pipe(postcss([autoprefixer(), cssnano()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.styles.dest))
            .pipe(browserSync.stream())
    );
}
exports.style = style;

///////////////
// Stylelint //
///////////////
gulp.task('lint-css', function lintCssTask() {
    const gulpStylelint = require('gulp-stylelint');

    return gulp
        .src(paths.styles.src)
        .pipe(gulpStylelint({
            reporters: [
                {formatter: 'string', console: true}
            ]
        }));
});

/////////////////
// BrowserSync //
/////////////////
function reload() {
    browserSync.reload();
}

/////////////
// Default //
/////////////
gulp.task('default', gulp.parallel(style, html, images, js));

///////////
// Watch //
///////////
function watch(){
    browserSync.init({
        server: {
            baseDir: paths.browserSync.baseDir
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.js.src, js);
    gulp.watch(paths.html.src, reload);
}
exports.watch = watch
