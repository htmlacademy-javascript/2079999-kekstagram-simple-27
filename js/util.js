const ALERT_SHOW_TIME = 5000;

/**
 * Проверка длины строки
 * @param {string} str — исходная строка
 * @param {number} len — количество симолов для проверки
 * @return {boolean} — истина, если строка в диапазоне
 */
function isStrLengthCorrect(str, len) {
  return (str.length <= len);
}

/**
 * Функция проверяет является ли нажатая клавиша ESC-ом.
 * @param {Object} evt - объект события.
 * @return {boolean} - истина, если нажатая клавиша - ESC.
 */
function isEscapeKey(evt) {
  return (evt.key === 'Escape');
}

/**
 * Функция генерирует всплывающее окно с сообщением об ошибке.
 */
function showAlert() {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.width = '300px';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '100px';
  alertContainer.style.right = '0';
  alertContainer.style.marginLeft = 'auto';
  alertContainer.style.marginRight = 'auto';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Не удалось загрузить данные. Перезагрузите страницу';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

/**
 * Функция генерирует всплывающее окно с сообщением об успешной отправке формы.
 */
function onSuccessSubmit() {
  const successPopup = document.querySelector('#success')
    .content
    .querySelector('.success')
    .cloneNode(true);
  document.body.appendChild(successPopup);

  const closeButton = successPopup.querySelector('.success__button');
  closeButton.addEventListener('click', () => {
    successPopup.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      successPopup.remove();
    }
  }, {once: true});
  document.addEventListener('click', (evt) => {
    if (evt.target.id !== 'success') {
      successPopup.remove();
    }
  }, {once: true});
}

/**
 * Функция генерирует всплывающее окно с сообщением об ошибке при отправке формы.
 */
function onFailSubmit() {
  const errorPopup = document.querySelector('#error')
    .content
    .querySelector('.error')
    .cloneNode(true);
  document.body.appendChild(errorPopup);

  const closeButton = errorPopup.querySelector('.error__button');
  closeButton.addEventListener('click', () => {
    errorPopup.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      errorPopup.remove();
    }
  }, {once: true});
  document.addEventListener('click', (evt) => {
    if (evt.target.id !== 'error') {
      errorPopup.remove();
    }
  }, {once: true});
}

export {isStrLengthCorrect, isEscapeKey, showAlert, onSuccessSubmit, onFailSubmit};
