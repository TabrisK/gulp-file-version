### Feature

- Add a version info to your script references in *.html file

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
    return gulp.src(root.dist + "/*.html")//your source file
     .pipe(fv())//use gulp-file-version to add version information of script and link's reference
     .pipe(gulp.dest(root.dist));//output

});
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
    return gulp.src(root.dist + "/*.html")//你的源文件
     .pipe(fv())//运行gulp-file-version，为文件中的script和link引用文件添加版本
     .pipe(gulp.dest(root.dist));//输出

});
```
**PS:** 2.0.0之前的旧版本已经弃用。新版本使用更为简单且错误更少。