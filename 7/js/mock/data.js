import {getRandomNum, getUniqRandomNum} from './util.js';

const PHOTOS_DISCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

/**
 * Генерация массива фотографий
 * @param {number} count — количество фотографий, которое нужно сгенерировать
 * @return {Array} — массив фотографий
 */
function createPhotos(count) {
  const photos = [];
  const id = getUniqRandomNum(...[1, count], count);
  const photosDescription = PHOTOS_DISCRIPTION.split(' ');

  for (let i = 0; i < count; i++) {
    photos[i] = {
      id: id[i],
      url: `photos/${id[i]}.jpg`,
      description: photosDescription[getRandomNum(0, photosDescription.length - 1)],
      likes: getRandomNum(15, 200),
      comments: getRandomNum(0, 200),
    };
  }
  return photos;
}

export {createPhotos};
