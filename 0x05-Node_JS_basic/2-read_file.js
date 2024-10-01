const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf8');

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

module.exports = countStudents;
