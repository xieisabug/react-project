var gulp = require('gulp');
var del = require('del');
var typescript = require('gulp-typescript');
var typescriptConfig = {
    "module" : "commonjs",
    "jsx" : "react",
    "target": "es5",
    "sourceMap": true
};
var webpack = require('webpack');
var webpackConfig = require("./webpack.config.js");

var PATH = {
    src : {
        tsx : 'src/**/*.tsx'
    },
    build : {
        tsx : 'build'
    }
};

gulp.task('typescript', function(done){


    gulp.src(PATH.src.tsx)
        .pipe(typescript(typescriptConfig))
        .pipe(gulp.dest(PATH.build.tsx))
        .on('end', function () {
            done()
        });
});

gulp.task('webpack', ['typescript'], function(done) {
    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function (err, stats) {
        done();
    });
});

gulp.task('del-build', ['webpack'], function(){
    del('build')
});


gulp.task('default', ['typescript', 'webpack', 'del-build']);