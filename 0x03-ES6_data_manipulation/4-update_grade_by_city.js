export default function updateStudentGradeByCity(list, city, newGrade) {
  return list
    .filter((studentList) => studentList.location === city)
    .map((studentList) => {
      const gradeObj = newGrade.find((grade) => grade.studentId === studentList.id);
      return {
        ...studentList,
        grade: gradeObj ? gradeObj.grade : 'N/A',
      };
    });
}
