/**

 * Проверка длины строки

 * @param {string} str — исходная строка

 * @param {number} len — количество симолов для проверки

 * @return {boolean} — истина, если строка в диапазоне

 */
function isStrLengthCorrect(str, len) {
  return (str.length <= len);
}

isStrLengthCorrect('', 20);

/**

 * Генерация случайного числа из диапазона

 * @param {number} min — нижняя граница диапазона

 * @param {number} max — верхняя граница диапазона

 * @return {number} — случайное число из диапазона

 */
function getRandomNum(min, max) {
  if (min < 0 || min > max) {
    return NaN;
  }
  return Math.round(min + Math.random() * (max - min));
}

/**

 * Генерация массива указанного размера, состоящего из уникальных случайных чисел в указанном диапазоне

 * @param {number} min — нижняя граница диапазона для генерации случайного числа

 * @param {number} max — верхняя граница диапазона для генерации случайного числа

 * @param {number} count — размер массива (кол-во значений)

 */
function getUniqRandomNum(min, max, count) {
  const arr = [];
  let currentValue;

  if (min < 0 || min > max) {
    return NaN;
  }

  while (arr.length < count) {
    currentValue = getRandomNum(min, max);
    if (!arr.includes(currentValue, 0)) {
      arr.push(currentValue);
    }
  }
  return arr;
}

export {getRandomNum, getUniqRandomNum};
