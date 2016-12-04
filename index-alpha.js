/**
 * Created by Helex on 2016/12/3.
 */
'use strict';

var Stream = require('stream');
var Path = require('path');
var fs = require('fs');

function fv(obj) {

    var stream = new Stream.Transform({objectMode: true});
    var vInfo = "?v=";

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
        var r = new RegExp(/ src=['"]{1}([\/\w\.]*.js)['"]{1}| href=['"]{1}([\/\w\.]*.css)['"]{1}/g);
        var temp = r.exec(content);
        while(temp){
            temp = temp[1]?temp[1]:temp[2];
            srcCollection.push(temp);
            temp = r.exec(content);
        }

        srcCollection.map(function(v){
            var srcPath = Path.join(file.dirname, v);
            var count = 0;
            var srcContent = fs.readFileSync(srcPath);
            for (var index in srcContent) {
                if (typeof(srcContent[index]) == "number")
                    count += srcContent[index];
            }
            content = content.replace(new RegExp(v, "g"), v + vInfo + count.toString(16));
        });
        file.contents = Buffer.from(content);
        callback(null, file);
    };

    return stream;
}

module.exports = fv;