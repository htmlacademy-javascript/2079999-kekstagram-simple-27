import {renderThumbnails} from './render-content.js';
import {showAlert} from './util.js';

function getData() {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => response.json())
    .then((data) => renderThumbnails(data))
    .catch(() => showAlert());
}

function sendData(data) {
  fetch('https://27.javascript.pages.academy/kekstagram-simple', {
    method: 'POST',
    body: data,
    mode: 'no-cors',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  });
}

export {getData, sendData};
