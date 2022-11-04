let path = require('path');
let fs = require('fs');
let writeStream = fs.createWriteStream(path.join(__dirname, 'text.txt'));
let { stdout, stdin, exit } = require('process');
console.log("Введите текст:");

stdin.on("data", (data) => {
  if (data.toString().trim() === 'exit') {
    completed();
  } else {
    writeStream.write(data);
  }
});
process.on('SIGINT', completed);

function completed() {
  console.log('До свидания!');
  exit();
}