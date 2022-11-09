const GET_DATA_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const POST_SEND_DATA_URL = 'https://27.javascript.pages.academy/kekstagram-simple';

/**
 * Функция отправляет GET-запрос.
 * @param {Function} onSuccess - колл-бэк функция, вызываемая при успешном ответе от сервера.
 * @param {Function} onFail - - колл-бэк функция, вызываемая при ошибочном ответе от сервера.
 * @return {Promise} - объект-промис.
 */
function getData(onSuccess, onFail) {
  return fetch(GET_DATA_URL)
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onFail());
}

/**
 * Функция отправляет POST-запрос.
 * @param {Function} onSuccess - колл-бэк функция, вызываемая при успешном ответе от сервера.
 * @param {Function} onFail - - колл-бэк функция, вызываемая при ошибочном ответе от сервера.
 * @return {Promise} - объект-промис.
 */
function sendData(onSuccess, onFail, data) {
  return fetch(POST_SEND_DATA_URL, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }})
    .catch(() => (onFail()));
}

export {getData, sendData};
