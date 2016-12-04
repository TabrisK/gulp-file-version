/**
 * Author: HELEX;
 * Create Time: 2016-11-28 13:48
 * Description:
 */
'use strict';
var fs = require('fs'),
    through2 = require('through2'),
    glob = require('glob');


module.exports = function (indexPathStr) {
    var env = /win32/.exec(process.platform);
    return through2(function (chunk, enc, callback) {
        if (chunk.isStream()) {
            this.emit('error', new gutil.PluginError('gulp-debug', 'Streaming not supported'));
            return cb();
        }

        if (!chunk.contents) {
            return cb();
        }

        var count = 0;
        for (var index in chunk.contents) {
            if (typeof(chunk.contents[index]) == "number")
                count += chunk.contents[index];
        }


        var pathList = env=="win32"?chunk.path.split("\\").reverse():chunk.path.split("/").reverse();
        if(pathList[1] == indexPathStr.split("/").reverse()[1]){
            pathList[1] = ".";
        }
        var targetFileName = pathList[1] + "/" + pathList[0];
        replaceIndex(indexPathStr, targetFileName, count.toString(16));
        this.push(chunk);
        callback()
    });

    function replaceIndex(ifile, transFileName, count) {
        var version = "?v=" + count;
        if (Object.prototype.toString.call(ifile) == "[object Array]") {
            ifile.forEach(function (i_ifile) {
                i_ifile && glob(i_ifile, function (err, i_files) {
                    if (err) return console.error(err);
                    i_files.forEach(function (i_ilist) {

                        var result = fs.readFileSync(i_ilist, 'utf8')
                            .replace(
                                new RegExp(transFileName + "[?v=[0-9a-zA-Z]*]?", "g"),
                                transFileName + version);
                        fs.writeFileSync(i_ilist, result, 'utf8');
                    })
                })
            })
        } else {
            ifile && glob(ifile, function (err, files) {
                if (err) return console.error(err);
                files.forEach(function (ilist) {
                    var result = fs.readFileSync(ilist, 'utf8')
                        .replace(
                            new RegExp(transFileName + "[?v=[0-9a-zA-Z]*]?", "g"),
                            transFileName + version
                        );
                    fs.writeFileSync(ilist, result, 'utf8');
                })
            })
        }
    }
};