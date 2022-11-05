let path = require('path');
let fs = require('fs');

let info = function (file) {
  let elem = [];
  if (file.isFile()) {
    fs.stat(path.resolve(__dirname, "secret-folder", file.name), function (err, stats) {
      if (err) {
        return;
      }
      elem.push(file.name.split('.').slice(0, -1).join('.'));
      elem.push(path.extname(file.name).slice(1));
      elem.push((Math.round(stats.size/1024)) + ' Kb');
      process.stdout.write(`${elem.join(' - ')} \n`);
    });
  }
};

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, function (err, files) {
  if (err) {
    return;
  }
  files.forEach(item => {
    info(item);
  });
});