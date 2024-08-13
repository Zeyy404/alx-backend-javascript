export default function getStudentIdsSum(list) {
  return list
    .map((list) => list.id)
    .reduce((acc, currId) => acc + currId, 0);
}
