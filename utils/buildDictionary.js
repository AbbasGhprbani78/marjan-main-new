// utils/buildDictionary.js
export function buildDictionary(dictArray) {
  return dictArray.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}
