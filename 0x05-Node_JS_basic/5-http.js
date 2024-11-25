const http = require('http');
const path = require('path');
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    if (lines.length <= 1) {
      console.log('Number of students: 0');
      return;
    }
    const fields = {};
    let totalStudents = 0;
    lines.slice(1).forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine) {
        const [firstname, , , field] = trimmedLine.split(',');
        totalStudents += 1;
        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      }
    });
    console.log(`Number of students: ${totalStudents}`);
    for (const [field, names] of Object.entries(fields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

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
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    const filePath = path.join(__dirname, databaseFile);

    countStudents(filePath)
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

const port = 1245;
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});

module.exports = app;
