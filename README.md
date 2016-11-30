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
var fv = require("gulp-file-version")
gulp.src([
				"./dist/**/*.{js,css}"//the reference files' glob.In order to calculate suffix.
			], { base: 'dist' })
        .pipe(fv("./dist/index.html"));//where your index.html are.Of cause you can specify several HTML files by using glob.Such as "./dist/*.html"
```


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
var fv = require("gulp-file-version")
gulp.src([
				"./dist/**/*.{js,css}"//指定引用文件路径的glob字符串。用于计算引用文件的后缀。
			], { base: 'dist' })
        .pipe(fv("./dist/index.html"));//你的html文件的glob字符串。当然你可以指定多个要添加版本信息的*.html。像这样"./dist/*.html"。
```# gulp-file-version
