const http = require('http');
const path = require('path');
const fs = require('fs').promises;

async function countStudents(path, res) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.trim().split('\n');
    if (lines.length <= 1) {
      res.write('Number of students: 0\n');
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
    res.write(`Number of students: ${totalStudents}\n`);
    for (const [field, names] of Object.entries(fields)) {
      res.write(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`);
    }
  } catch (error) {
    res.statusCode = 500;
    res.end('Cannot load the database\n');
  }
}

const databaseFile = process.argv[2];

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    if (!databaseFile) {
      res.statusCode = 500;
      res.end('Cannot load the database\n');
      return;
    }
    const filePath = path.join(__dirname, databaseFile);

    fs.access(filePath)
      .then(() => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('This is the list of our students\n');

        return countStudents(filePath, res);
      })
      .catch(() => {
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
