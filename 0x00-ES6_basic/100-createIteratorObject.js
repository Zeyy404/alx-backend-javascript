export default function createIteratorObject(report) {
  const { allEmployees } = report;
  const employeesArray = Object.values(allEmployees).flat();

  return employeesArray[Symbol.iterator]();
}
