let fs = require("fs");
let path = require("path");

let styles = path.join(__dirname, "styles");
let copyFolder = path.join(__dirname, "project-dist");
let folder = path.join(__dirname, "components");
let copyAssets = path.join(copyFolder, "assets");
let assets = path.join(__dirname, "assets");

fs.readdir(styles, {withFileTypes: true}, async (error, items) => {
  items.forEach(function(item, i) {
    let itemPath = path.join(styles, item.name);
      if (item.isFile() && item.name.split(".")[1] === "css") {
        fs.readFile(itemPath, "utf8", function (error, data) {
          if(error) return;
            else if (i === 0) {
              fs.writeFile(path.join(copyFolder, "style.css"), data, function (error) {
                if(error) return;
              });
                } else {
                  fs.appendFile(path.join(copyFolder, "style.css"), data, function(error) {
                    if(error) return;
             });
           }
         });
       }
    });
});

function copyRec(dir, output) {
  fs.readdir(dir, {withFileTypes: true}, function (error, items) {
    if (error) throw error;
    items.forEach(function(item) {
      if (!item.isFile()) {
        fs.stat(path.join(output, item.name), function(error) {
          if (error) {
            fs.mkdir(path.join(output, item.name), function(error) {
              if(error) return;
            });
            copyRec(`${dir}\\${item.name}`, path.join(output, item.name));
            } else {
              copyRec(`${dir}\\${item.name}`, path.join(output, item.name));
            }
          });
        } else {
          fs.copyFile(`${dir}\\${item.name}`, `${output}\\${item.name}`, function(error){
            if(error) return;
        });
      }
    });
  });
}
fs.stat (copyFolder, function (error) {
  if (error) {
    fs.mkdir(copyFolder, function (error) {
      if(error) return;
    });
    createProject();
  } else {  fs.readdir(copyFolder, function (error)  {
    if(error) return;
    else {
      createProject();
    }
  });
  }
});

fs.stat (copyAssets, function (error) {
  if (error) {
    fs.mkdir(copyAssets, function(error) {
      if(error) return;
    });
    copyRec(assets, copyAssets);
  } else {
    copyRec(assets, copyAssets);
  }
});

function createProject() {
  fs.copyFile(`${__dirname}\\template.html`, `${copyFolder}\\index.html`, function (error) {
    fs.readFile(`${copyFolder}\\index.html`, 'utf8', function(error, data) {
      fs.readdir(folder, {withFileTypes: true}, function (error, items) {
        items.forEach(function(item) {
          fs.readFile(`${folder}\\${item.name}`, 'utf8', function(error, dataFile) {
            let tag = `{{${item.name.split('.')[0]}}}`;
            data = data.replace(tag, dataFile);
            fs.writeFile(`${copyFolder}\\index.html`, data, function (error) {
              if(error) return;
              });
          });
        });
      }); 
    });
  });
}