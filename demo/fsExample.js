/**
 * Created by Helex on 2016/12/4.
 */
var fs = require("fs");
var crypto = require("crypto");

//console.log(fs.readFileSync("app/app.js",{encoding: "utf8"}));
console.log(__dirname);
console.log(crypto.createHash("md5").update("Hello World").digest("hex").substring(0,10));