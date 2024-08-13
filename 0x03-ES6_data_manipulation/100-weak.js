export const weakMap = new WeakMap();

export function queryAPI(endpoint) {
  if (!(endpoint && typeof endpoint === 'object' && 'protocol' in endpoint && 'name' in endpoint)) {
    throw new Error('Invalid endpoint');
  }

  const key = endpoint;
  const currentCount = weakMap.get(key) || 0;
  weakMap.set(key, currentCount + 1);

  if (weakMap.get(key) >= 5) {
    throw new Error('Endpoint load is high');
  }
}
