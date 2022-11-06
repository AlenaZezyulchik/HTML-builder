let fs = require('fs/promises');
let path = require('path');

let dir = path.join(__dirname, 'files');
let copy = path.join(__dirname, 'files-copy');

fs.rm(copy, {recursive: true, force: true}).finally(function() {
  fs.mkdir(copy, {recursive: true});
  fs.readdir(dir, {withFileTypes: true}).then(function(elems) {
    elems.forEach(function(elem) {
      if (elem.isFile()) {
        let item = path.join(dir, elem.name);
        let itemDes = path.join(copy, elem.name);
        fs.copyFile(item, itemDes);}
        });
    });
});