/**
 * Отрисовка миниатюр фотографий пользователей
 * @param {Array} thumbnails — массив данных о фотографиях
 */
function renderThumbnails (thumbnails) {
  const thumbnailFragment = document.createDocumentFragment();
  const container = document.querySelector('.pictures');

  thumbnails.forEach(({url, likes, comments}) => {
    const thumbnail = document.querySelector('#picture')
      .content
      .querySelector('.picture')
      .cloneNode(true);
    thumbnail.querySelector('.picture__img').src = url;
    thumbnail.querySelector('.picture__comments').textContent = comments;
    thumbnail.querySelector('.picture__likes').textContent = likes;
    thumbnailFragment.appendChild(thumbnail);
  });

  container.appendChild(thumbnailFragment);
}

export {renderThumbnails};
