let fs = require("fs");
let path = require("path");
let {readdir} = require("fs/promises");
let out = fs.createWriteStream(path.join(__dirname, "project-dist/bundle.css"), "utf-8");

readdir(path.join(__dirname, "styles"), {withFileTypes: true}).then(items => items.forEach(item => {   
  let fileType = path.extname(path.join(__dirname, "styles", item.name));
  let inp = fs.createReadStream(path.join(__dirname, "styles", item.name), "utf8");
    if (item.isFile() && fileType == ".css") {
        inp.on("data", data => out.write(data));
    }
}));