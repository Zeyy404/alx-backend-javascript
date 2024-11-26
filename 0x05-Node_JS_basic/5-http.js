const http = require('http');
const path = require('path');
const fs = require('fs').promises;

async function countStudents(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.trim().split('\n');

    if (lines.length <= 1) {
      return 'Number of students: 0\n';
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

    let output = `Number of students: ${totalStudents}\n`;
    for (const [field, names] of Object.entries(fields)) {
      output += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    }

    return output;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.write('Hello Holberton School!');
    res.end();
  }

  if (req.url === '/students') {
    const databaseFile = process.argv[2];

    if (!databaseFile) {
      res.statusCode = 400;
      res.end('Cannot load the database');
      return;
    }

    const filePath = path.join(__dirname, databaseFile);

    countStudents(filePath)
      .then((output) => {
        res.write('This is the list of our students\n');
        res.end(output);
      })
      .catch(() => {
        res.statusCode = 404;
        res.end('Cannot load the database');
      });
  }
});

const port = 1245;
app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});

module.exports = app;
