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

getRandomNum(1, 2);

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

/**

 * Генерация объекта фотографии

 * @param {number} count — количество объектов, которое нужно сгенерировать

 */

const PHOTO_DISCRIPTION = ('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
const TEST_PHOTO_COUNT = 25;

function createTestPhoto(count) {
  const testPhoto = [];
  const id = getUniqRandomNum(...[1, count], count);
  const photoDescriptions = PHOTO_DISCRIPTION.split(' ');

  for (let i = 0; i < count; i++) {
    testPhoto[i] = {
      id: id[i],
      url: `photos/${id[i]}.jpg`,
      description: photoDescriptions[getRandomNum(0, photoDescriptions.length - 1)],
      likes: getRandomNum(100, 250),
      comments: getRandomNum(0, 200),
    };
  }
  return testPhoto;
}

createTestPhoto(TEST_PHOTO_COUNT);
