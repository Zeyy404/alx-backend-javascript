interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: 'Zainab',
  lastName: 'Salih',
  age: 26,
  location: 'United Arab Emarites',
};
const student2: Student = {
  firstName: 'Wafaa',
  lastName: 'SeedAhmed',
  age: 28,
  location: 'United Kingdom',
}

const studentList: Student[] = [student1, student2];

function renderTable(students: Student[]): void {
  const tableBody = document.querySelector('#studentTable tbody') as HTMLTableSectionElement;
  tableBody.innerHTML = '';
  
  students.forEach((student) => {
    const row = document.createElement('tr');

    const firstNameCell = document.createElement('td');
    firstNameCell.textContent = student.firstName;
    row.appendChild(firstNameCell);

    const locationCell = document.createElement('td');
    locationCell.textContent = student.location;
    row.appendChild(locationCell);

    tableBody.appendChild(row);
  });
}

renderTable(studentList);
