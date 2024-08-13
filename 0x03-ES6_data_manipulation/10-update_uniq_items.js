export default function updateUniqueItems(groceries) {
  for (const [item, quantity] of groceries.entries()) {
    if (quantity === 1) {
      groceries.set(item, 100);
    }
  }

  return groceries;
}
