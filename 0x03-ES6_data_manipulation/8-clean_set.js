export default function cleanSet(set, startString) {
  if (startString === undefined || startString.length === 0) {
    return '';
  }

  const filteredValued = Array.from(set)
    .filter((value) => typeof value === 'string' && value.startsWith(startString))
    .map((value) => value.slice(startString.length));

  return filteredValued.join('-');
}
