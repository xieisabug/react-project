var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var typescriptConfig = {
    "module": "commonjs",
    "jsx": "react",
    "target": "es3",
    "sourceMap": true
};
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

var PATH = {
    src: {
        html: 'src/**/*.html',
        css: 'src/**/*.css',
        sass: 'src/**/*.sass',
        tsx: ['src/**/*.tsx'],
        mock : 'src/**/*.json'
    },
    build: {
        tsx: 'build',
        sass: 'build'
    },
    release: {
        html: 'release',
        css: 'release',
        mock: 'release'
    }

};

gulp.task('mock', function () {
    gulp.src(PATH.src.mock)
        .pipe(gulp.dest(PATH.release.mock));

});

gulp.task('html', function () {
    gulp.src(PATH.src.html)
        .pipe(gulp.dest(PATH.release.html));

});

gulp.task('css', function () {
    gulp.src(PATH.src.css)
        .pipe(gulp.dest(PATH.release.css));

    gulp.src(PATH.src.sass)
        .pipe(gulp.dest(PATH.build.sass));
});

gulp.task('typescript', function (done) {


    gulp.src(PATH.src.tsx)
        .pipe(typescript(typescriptConfig))
        .pipe(gulp.dest(PATH.build.tsx))
        .on('end', function () {
            done()
        });
});

gulp.task('webpack', ['typescript'], function (done) {
    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function () {
        done();
    });
});

gulp.task('del-build', ['webpack'], function () {
    del('build')
});

gulp.task('build-js', ['typescript', 'webpack', 'del-build']);

gulp.task('default', ['mock', 'html', 'css', 'build-js']);