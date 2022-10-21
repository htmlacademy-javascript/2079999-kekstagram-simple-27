const CHANGE_SCALE_STEP = 25;
const DEFAULT_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const MIN_COMMENT_LENGTH = 20;
const MAX_COMMENT_LENGTH = 140;
const form = document.querySelector('.img-upload__form');
const uploadControl = form.querySelector('#upload-file');
const editorModal = form.querySelector('.img-upload__overlay');
const closeEditorModalButton = form.querySelector('#upload-cancel');
const photoPreview = form.querySelector('.img-upload__preview');
const scaleControlReduceButton = form.querySelector('.scale__control--smaller');
const scaleControlAddButton = form.querySelector('.scale__control--bigger');
const scaleControlInputValue = form.querySelector('.scale__control--value');
const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text'
});

/**
 * Функция устанавливает значение масштаба по умолчанию в окне редактора загруженного изображения.
 */
function setDefaultScaleValue() {
  scaleControlInputValue.value = `${DEFAULT_SCALE_VALUE}%`;
}

/**
 * Функция увеличивает значение масштаба в окне редактора загруженного изображения.
 */
function setAddedScaleValue() {
  let currentValue = Number((scaleControlInputValue.value).slice(0, -1));

  if (currentValue >= MIN_SCALE_VALUE && currentValue < MAX_SCALE_VALUE) {
    scaleControlInputValue.value = `${currentValue + CHANGE_SCALE_STEP}%`;
  }
  currentValue = Number((scaleControlInputValue.value).slice(0, -1));
  photoPreview.style.transform = `scale(${currentValue / 100})`;
}

/**
 * Функция уменьшает значение масштаба в окне редактора загруженного изображения.
 */
function setReducedScaleValue() {
  let currentValue = Number((scaleControlInputValue.value).slice(0, -1));

  if (currentValue > MIN_SCALE_VALUE && currentValue <= MAX_SCALE_VALUE) {
    scaleControlInputValue.value = `${currentValue - CHANGE_SCALE_STEP}%`;
  }
  currentValue = Number((scaleControlInputValue.value).slice(0, -1));
  photoPreview.style.transform = `scale(${currentValue / 100})`;
}

/**
 * Функция вызывает закрытие окна редактора загруженного изображения, если произошло нажатие ESC.
 * @param {Object} evt - объект события.
 */
function closeEditorModalIfEscapeKey(evt) {
  if (isEscapeKey(evt)) {
    closeEditorModal();
  }
}

/**
 * Функция открывает окно редактора загруженного изображения.
 */
function openEditorModal() {
  closeEditorModalButton.addEventListener('click', closeEditorModal);
  scaleControlReduceButton.addEventListener('click', setReducedScaleValue);
  scaleControlAddButton.addEventListener('click', setAddedScaleValue);
  document.addEventListener('keydown', closeEditorModalIfEscapeKey);
  editorModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  setDefaultScaleValue();

  let effectName;
  form.addEventListener('change', (evt) => {
    if (evt.target.name === 'effect') {
      photoPreview.classList.remove(`effects__preview--${effectName}`);
      photoPreview.classList.add(`effects__preview--${evt.target.value}`);
      effectName = evt.target.value;
    }
  });

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

  pristine.addValidator(
    form.querySelector('.text__description'),
    isCommentLengthCorrect,
    `от ${MIN_COMMENT_LENGTH} до ${MAX_COMMENT_LENGTH} символов`
  );
}

/**
 * Функция закрывает окно редактора загруженного изображения.
 */
function closeEditorModal() {
  editorModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadControl.value = '';
  document.removeEventListener('keydown', closeEditorModalIfEscapeKey);
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
 * Функция проверяет длину комментария.
 * @param {String} comment - объект события.
 * @return {boolean} - истина, если длина комментария укладывается в диапазон.
 */
function isCommentLengthCorrect (comment) {
  return comment.length >= MIN_COMMENT_LENGTH && comment.length <= MAX_COMMENT_LENGTH;
}

/**
 * Функция устанавливает обработчики событий на окно редактора загруженного изображения.
 */
function addEventListenersToForm() {
  uploadControl.addEventListener('change', openEditorModal);
}

export {addEventListenersToForm};
