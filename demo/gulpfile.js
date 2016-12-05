/**
 * Created by Helex on 2016/12/3.
 */
var gulp = require("gulp");
var $ = require('gulp-load-plugins')();
var fv = require("../index-alpha");
var fs = require("fs");

var root = {
    src: "./app",
    dist: "./dist"
};

gulp.task("compile", function () {
    return gulp.src(root.src + "/**/*.*")
        .pipe(gulp.dest(root.dist));
});

gulp.task("fv", function (cb) {
    return gulp.src(root.dist + "/*.html")
     .pipe(fv({Hash: "md5"}))
     .pipe(gulp.dest(root.dist));

});

gulp.task("tv", function(cb){
    return gulp.src(root.dist + "/**/*.js")
        .pipe(fv(/templateUrl:["']{1}([\w./]*)["']{1}/g,{base: "./app", Hash: "md5"}))
        .pipe(gulp.dest(root.dist));
});

gulp.task("timestamp", function (cb) {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
    fs.renameSync(root.dist, root.dist + localISOTime.replace(/:/g, ""));
    return cb();
});

gulp.task("build", gulp.series("compile", "fv", "tv", "timestamp"));

gulp.task("default", gulp.parallel("build"));