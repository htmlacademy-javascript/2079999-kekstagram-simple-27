import {getRandomNum, getUniqRandomNum} from './util.js';

const PHOTO_DISCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

/**
 * Генерация объекта фотографии
 * @param {number} count — количество объектов, которое нужно сгенерировать
 * @return {Object} — случайное число из диапазона
 */
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

export {createTestPhoto};
