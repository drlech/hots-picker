let gulp = require('gulp');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let webpack = require('webpack');

let source = 'src';
let web = 'web';

let webpackSettings = {
    entry: './src/assets/js/script.js',
    output: {
        path: `${__dirname}/web/assets/js`,
        filename: 'bundle.js'
    },

    devtool: 'source-map'
};

gulp.task('sass', () => {
    return gulp.src(`${source}/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`./${web}`));
});

gulp.task('webpack', cb => {
    webpack(webpackSettings, (err, stats) => {
        if (err) throw new gutil.PluginError("webpack", err);
        cb();
    });
});

gulp.task('watch', () => {
    gulp.watch(`${source}/**/*.scss`, ['sass']);

    webpackSettings.watch = true;
    webpack(webpackSettings, (err, stats) => {
        if (err) throw new gutil.PluginError("webpack", err);
    });
});

gulp.task('default', [
    'sass'
]);