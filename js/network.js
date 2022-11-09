function getData(onSuccess, onFail) {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => response.json())
    .then((data) => onSuccess(data))
    .catch(() => onFail());
}

function sendData(onSuccess, onFail, data) {
  fetch('https://27.javascript.pages.academy/kekstagram-simple', {
    method: 'POST',
    body: data,
    'Content-Type': 'multipart/form-data',
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
