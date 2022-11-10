import {sendData} from './network.js';
import {isEscapeKey} from './util.js';

const ScaleValue = {
  MAX: 100,
  MIN: 25,
  DEFAULT: 100,
  STEP: 25
};

const СommentLength = {
  MIN: 20,
  MAX: 140
};

/**
 * Функция проверяет длину комментария.
 * @param {String} comment - объект события.
 * @return {boolean} - истина, если длина комментария укладывается в диапазон.
 */
function isCommentLengthCorrect (comment) {
  return comment.length >= СommentLength.MIN && comment.length <= СommentLength.MAX;
}

/**
 * Функция вызывает закрытие окна редактора загруженного изображения, если произошло нажатие ESC.
 * @param {Object} evt - объект события.
 */
function escapeKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    closeEditorModalHandler();
  }
}

const form = document.querySelector('.img-upload__form');
const photoPreviewContainer = form.querySelector('.img-upload__preview');
const photoPreview = photoPreviewContainer.querySelector('img');
const scaleInputValue = form.querySelector('.scale__control--value');
/**
 * Функция устанавливает значение масштаба по умолчанию в окне редактора загруженного изображения.
 */
function scaleReset() {
  scaleInputValue.value = `${ScaleValue.DEFAULT}%`;
  photoPreview.style.transform = `scale(${ScaleValue.DEFAULT / 100})`;
}

const scaleUpButton = form.querySelector('.scale__control--bigger');
const scaleDownButton = form.querySelector('.scale__control--smaller');
/**
   * Функция меняет значение масштаба в окне редактора загруженного изображения.
   */
function scaleChangeHandler(evt) {
  let currentValue = Number((scaleInputValue.value).slice(0, -1));

  if ((evt.target === scaleUpButton) && currentValue >= ScaleValue.MIN && currentValue < ScaleValue.MAX) {
    scaleInputValue.value = `${currentValue + ScaleValue.STEP}%`;
  }

  if ((evt.target === scaleDownButton) && currentValue > ScaleValue.MIN && currentValue <= ScaleValue.MAX) {
    scaleInputValue.value = `${currentValue - ScaleValue.STEP}%`;
  }

  currentValue = Number((scaleInputValue.value).slice(0, -1));
  photoPreview.style.transform = `scale(${currentValue / 100})`;
}

const sliderDepthOfEffect = form.querySelector('.effect-level__slider');
const sliderDepthOfEffectInput = form.querySelector('.effect-level__value');
noUiSlider.create(sliderDepthOfEffect, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const effect = {
  depth: 1,
  get chrome() {
    return `grayscale(${this.depth})`;
  },
  get sepia() {
    return `sepia(${this.depth})`;
  },
  get marvin() {
    return `invert(${this.depth * 100}%)`;
  },
  get phobos() {
    return `blur(${this.depth * 3}px)`;
  },
  get heat() {
    return `brightness(${this.depth * 3})`;
  },
  get none() {
    return 'none';
  }
};

const editorModal = form.querySelector('.img-upload__overlay');
const uploadControl = form.querySelector('#upload-file');
let activeEffectClass = effect.none;
/**
 * Функция открывает окно редактора загруженного изображения.
 */
function openEditorModalHandler() {
  editorModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderDepthOfEffect.setAttribute('disabled', true);
  document.addEventListener('keydown', escapeKeydownHandler);
  scaleReset();
  photoPreview.style.transform = `scale(${ScaleValue.DEFAULT / 100})`;
  photoPreviewContainer.classList.remove(`effects__preview--${activeEffectClass}`);
  photoPreviewContainer.classList.add('effects__preview--none');
  sliderDepthOfEffect.noUiSlider.set(1);
  form.querySelector('#effect-none').checked = true;
  activeEffectClass = effect.none;
  photoPreviewContainer.style.filter = effect.none;
  form.querySelector('.text__description').value = '';
}

const closeEditorModalButton = form.querySelector('#upload-cancel');
/**
 * Функция закрывает окно редактора загруженного изображения.
 */
function closeEditorModalHandler() {
  editorModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeydownHandler);
  uploadControl.value = '';
}
const submitButton = form.querySelector('#upload-submit');
/**
 * Функция блокирует кнопку отправки формы.
 */
function blockSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
}

/**
 * Функция отменяет блокировку кнопки отправки формы.
 */
function unblockSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
}

/**
 * Функция устанавливает обработчики событий на окно редактора загруженного изображения.
 */
function addEventListenersToForm(onSuccess, onFail) {
  uploadControl.addEventListener('change', openEditorModalHandler);
  closeEditorModalButton.addEventListener('click', closeEditorModalHandler);
  scaleDownButton.addEventListener('click', scaleChangeHandler);
  scaleUpButton.addEventListener('click', scaleChangeHandler);
  photoPreviewContainer.classList.add('effects__preview--none');

  sliderDepthOfEffect.noUiSlider.on('update', () => {
    effect.depth = sliderDepthOfEffect.noUiSlider.get();
    sliderDepthOfEffectInput.value = effect.depth;
    photoPreviewContainer.style.filter = effect[activeEffectClass];
  });

  form.addEventListener('change', (evt) => {
    if (evt.target.name === 'effect') {
      photoPreviewContainer.classList.remove(`effects__preview--${activeEffectClass}`);
      photoPreviewContainer.classList.add(`effects__preview--${evt.target.value}`);
      sliderDepthOfEffect.noUiSlider.set(1);
      photoPreviewContainer.style.filter = effect[evt.target.value];

      if (!photoPreviewContainer.classList.contains('effects__preview--none')) {
        sliderDepthOfEffect.removeAttribute('disabled');
      } else {
        sliderDepthOfEffect.setAttribute('disabled', true);
      }
      activeEffectClass = evt.target.value;
    }
  });

  const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text'
  });

  pristine.addValidator(
    form.querySelector('.text__description'),
    isCommentLengthCorrect,
    `Комментарий должен содержать от ${СommentLength.MIN} до ${СommentLength.MAX} символов`
  );

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(onSuccess, onFail, new FormData(evt.target))
        .then(() => closeEditorModalHandler())
        .then(() => unblockSubmitButton());
    }
  });
}

export {addEventListenersToForm};
