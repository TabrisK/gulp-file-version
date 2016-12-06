### Feature

- Add a version info to your script references in *.html file

### Install
```shell
npm install gulp-file-version
```

###Example
```

#### Before
<html>
	...
		<script src="./common/app.js"></script>
	...
</html>

### After
<html>
	...
		<script src="./common/app.js?v=12fa31"></script>
	...
</html>
```

###Code
```
gulp.task("fv", function (cb) {
    return gulp.src("./dist/*.html")//your source file
     .pipe(fv())//use gulp-file-version to add version information of script and link's reference
     .pipe(gulp.dest("./dist"));//output

});
```


##API
#####fv(Regexp[, options])
Use custom regexp match source file.Add version info to the matched element, which is a file and must be existed.
options: < Object >
- base: < String >specify the root path of the reference file path。default path is the directory where the gulpfile.js in。
- Hash: < String >The algorithm is dependent on the available algorithms supported by the version of OpenSSL on the platform.Examples are 'sha256', 'sha512', etc. Default is a sum of the ascii in file.

Example:
```
gulp.task("tv", function(cb){//匹配angularjs中templateUrl引用文件并添加版本信息
    return gulp.src("./dist/**/*.js")
        .pipe(fv(/templateUrl:["']{1}([\w./-]*)["']{1}/g,{base: "./app", Hash: "md5"}))
        .pipe(gulp.dest("./dist"));
});
```

Result:
```
path   ./app/assets.js
###Before
...
var something = {
        templateUrl:"./assets/assets.html"
    };
...

###After
...
var something = {
        templateUrl:"./assets/assets.html?v=ed36a41cd9"
    };
...
```
**PS:** the old version before 2.0.0 of has been deprecated.The new version is more easy to use,and less error.

### 特性

- 为*.html文件的引用添加版本信息

###示例
```

#### Before
<html>
	...
		<script src="./common/app.js"></script>
	...
</html>

### After
<html>
	...
		<script src="./common/app.js?v=12fa31"></script>
	...
</html>
```

###代码
```

gulp.task("fv", function (cb) {
    return gulp.src("./dist/*.html")//你的源文件
     .pipe(fv())//运行gulp-file-version，为文件中的script和link引用文件添加版本
     .pipe(gulp.dest("./dist"));//输出

});
```


##API
#####fv(Regexp[, options])
用自定义的正则表达式匹配源文件内容，为其中满足条件的匹配项（文件路径）添加版本信息（该文件必须存在，否则报错）
options: < Object >
- base: < String >指定引用文件的根路径。默认为执行该任务所在文件的路径。
- Hash: < String >版本信息所使用的编码方式。默认为文件ascii码之和。可选"md5","sha256","sha512"。

Example:
```
gulp.task("tv", function(cb){//匹配angularjs中templateUrl引用文件并添加版本信息
    return gulp.src("./dist/**/*.js")
        .pipe(fv(/templateUrl:["']{1}([\w./-]*)["']{1}/g,{base: "./app", Hash: "md5"}))
        .pipe(gulp.dest("./dist"));
});
```

Result:
```
path   ./app/assets.js
###Before
...
var something = {
        templateUrl:"./assets/assets.html"
    };
...

###After
...
var something = {
        templateUrl:"./assets/assets.html?v=ed36a41cd9"
    };
...
```
**PS:** 2.0.0之前的旧版本已经弃用。新版本使用更为简单且错误更少。