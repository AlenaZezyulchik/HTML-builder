
let fs = require('fs');
let path = require('path');
let readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'));

let data = '';
readableStream.on('data', partData => data += partData);
readableStream.on('end', () => process.stdout.write(data));