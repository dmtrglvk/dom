var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    twig = require('gulp-twig'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore'),
    browserSync = require('browser-sync').create(),
    watch = require('gulp-watch'),
    copy = require('gulp-copy'),
    imagemin = require('gulp-imagemin'),
    cssmin = require('gulp-cssmin'),
    browserify = require('gulp-browserify'),
    scss2less = require('gulp-scss2less'),
    minify = require('gulp-minify'),
    webpack = require('webpack'),
    webpackStream = require('webpack-stream');

var reload = browserSync.reload;

var config = {
    twigSrc: './src/templates/pages/**/*.twig',
    sassSrc: './src/styles/main.scss',
    svgSrc: './src/images/svg/*.svg',
    fontsSrc: './src/fonts/**/*',
    jsSrc: './src/js/main.js'
};

gulp.task('templates', function () {
    return gulp.src(config.twigSrc)
        .pipe(twig({
            pretty: true
        }))
        .pipe(gulp.dest('./web'))
        .pipe(reload({stream:true}));
});

gulp.task('styles', function () {
    return gulp.src(config.sassSrc)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(autoprefixer ({
            browsers: ['last 5 versions']
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('./web/css/'))
        .pipe(reload({stream:true}));
});

gulp.task('svg', function() {
    function transformSvg($svg, done) {
        $svg.find('[fill]').removeAttr('fill');
        done(null, $svg)
    }
    return gulp.src(config.svgSrc)
        .pipe(svgmin())
        .pipe(svgstore({
            fileName: 'icons.svg',
            prefix: 'icon-',
            transformSvg: transformSvg
        }))
        .pipe(gulp.dest('./web/images/svg/'))
});

gulp.task('copy', function () {
    gulp.src(config.fontsSrc)
        .pipe(gulp.dest('./web/fonts/'));
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/main.js')
        .pipe(webpackStream({
            entry: {
                app: './src/js/app.js'
            },
            output: {
                filename: '[name].js',
                chunkFilename: '[name].js',
            },
            devtool: 'source-map',
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.(js)$/,
                        exclude: /(node_modules)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['env']
                        }
                    }
                ]
            },
            plugins: [
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                    objectFit: 'object-fit-images'
                })
            ],
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: 'vendors',
                            chunks: 'all'
                        }
                    }
                },
                runtimeChunk: false
            }
        }))
        .pipe(gulp.dest('./web/js/'))
        .pipe(reload({stream:true}));
});

gulp.task('imagemin', function() {
    gulp.src('./src/images/*.{jpg,png,gif,svg}')
        .pipe(imagemin())
        .pipe(gulp.dest('./web/images/'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./web/",
            index: '/index.html'
        }
    });
});

gulp.task('watch', function() {
    gulp.watch('./src/styles/**/*.scss', ['styles']);
    gulp.watch('./src/templates/**/*.twig', ['templates']);
    gulp.watch('./src/js/**/*.js', ['scripts']);
    gulp.watch('./src/images/*.{jpg,png,gif}', ['imagemin']);
});

gulp.task('default', ['templates', 'styles', 'scripts', 'svg', 'imagemin', 'copy', 'watch', 'browser-sync']);
gulp.task('build', ['templates', 'styles', 'scripts', 'svg', 'imagemin', 'copy', 'browser-sync']);