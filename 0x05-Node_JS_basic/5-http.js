const http = require('http');
const path = require('path');
const countStudent = require('./3-read_file_async');

const databaseFile = process.argv[2];

if (!databaseFile) {
  console.error('Please provide the database file as an argument.');
  process.exit(1);
}

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/student') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    const filePath = path.join(__dirname, databaseFile);

    countStudent(filePath)
      .then(() => {
        res.end();
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        res.statusCode = 500;
        res.end('Cannot load the database\n');
      });
  } else {
    res.statusCode = 404;
    res.end('Not Found\n');
  }
});

module.exports = app;
