/**
 * Created by Helex on 2016/12/3.
 */
'use strict';

var Stream = require('stream');
var Path = require('path');
var fs = require('fs');
var crypto = require('crypto');

function fv(arg1, arg2) {

    var stream = new Stream.Transform({objectMode: true});
    var vInfo = "?v=";
    var regexp, opts;
    if (Object.prototype.toString.call(arg2) == "[object Object]")opts = arg2;
    if (Object.prototype.toString.call(arg1) == "[object RegExp]")
        regexp = arg1;
    else if (Object.prototype.toString.call(arg1) == "[object Object]")
        opts = arg1;

    var _opts = opts || {};

    function parsePath(path) {
        var extname = Path.extname(path);
        return {
            dirname: Path.dirname(path),
            basename: Path.basename(path, extname),
            extname: extname
        };
    }

    stream._transform = function (originalFile, unused, callback) {


        var file = originalFile.clone({contents: false});
        var parsedPath = parsePath(file.relative);
        var content = file.contents.toString("utf8");
        var srcCollection = [];
        var _regexp = regexp ? new RegExp(regexp) : new RegExp(/ src=['"]{1}([\/\w\.-]*.js)(\?v=\w*)?['"]{1}| href=['"]{1}([\/\w\.-]*.css)(\?v=\w*)?['"]{1}/g);
        var r = _regexp;
        var temp = r.exec(content);
        while (temp) {
            for (var index = 1; index < temp.length; index++) {
                if (temp[index]) {
                    temp = temp[index];
                    break;
                }
            }
            srcCollection.push(temp);
            temp = r.exec(content);
        }
        srcCollection.map(function (v) {//v is a string, which is the file relative path
            var basePath = _opts.base ? Path.join(process.cwd(), _opts.base) : file.dirname;
            var srcPath = Path.join(basePath, v);
            var suffix;
            var srcContent = fs.readFileSync(srcPath);
            if (_opts.Hash) {
                suffix = crypto.createHash(_opts.Hash).update(srcContent).digest("hex").substring(0, 10);
            } else {
                var count = 0;
                for (var index in srcContent) {
                    if (typeof(srcContent[index]) == "number")
                        count += srcContent[index];
                }
                suffix = count.toString(16);
            }
            console.log(v + "\\?v=\\w*" + "|" + v);
            console.log(v + vInfo + suffix);
            content = content.replace(
                new RegExp(v + "\\?v=\\w*" + "|" + v, "g"),
                v + vInfo + suffix);
        });
        file.contents = Buffer.from(content);
        callback(null, file);
    };

    return stream;
}

module.exports = fv;