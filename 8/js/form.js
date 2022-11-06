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
function EscapeKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    closeEditorModal();
  }
}

const form = document.querySelector('.img-upload__form');
const photoPreview = form.querySelector('.img-upload__preview');
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
function scaleChange(evt) {
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

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text'
});

const editorModal = form.querySelector('.img-upload__overlay');
/**
 * Функция открывает окно редактора загруженного изображения.
 */
function openEditorModal() {
  editorModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  sliderDepthOfEffect.setAttribute('disabled', true);
  document.addEventListener('keydown', EscapeKeydownHandler);
  scaleReset();
}

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

const closeEditorModalButton = form.querySelector('#upload-cancel');
const uploadControl = form.querySelector('#upload-file');
let effectClass = 'none';
/**
 * Функция закрывает окно редактора загруженного изображения.
 */
function closeEditorModal() {
  editorModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadControl.value = '';
  photoPreview.style.transform = `scale(${ScaleValue.DEFAULT / 100})`;
  document.removeEventListener('keydown', EscapeKeydownHandler);
  photoPreview.classList.remove(`effects__preview--${effectClass}`);
  photoPreview.classList.add('effects__preview--none');
  sliderDepthOfEffect.noUiSlider.set(1);
  form.querySelector('#effect-none').checked = true;
  effectClass = 'none';
  photoPreview.style.filter = effect.none;
}

/**
 * Функция устанавливает обработчики событий на окно редактора загруженного изображения.
 */
function addEventListenersToForm() {
  uploadControl.addEventListener('change', openEditorModal);
  closeEditorModalButton.addEventListener('click', closeEditorModal);
  scaleDownButton.addEventListener('click', scaleChange);
  scaleUpButton.addEventListener('click', scaleChange);
  photoPreview.classList.add('effects__preview--none');

  sliderDepthOfEffect.noUiSlider.on('update', () => {
    effect.depth = sliderDepthOfEffect.noUiSlider.get();
    sliderDepthOfEffectInput.value = effect.depth;
    photoPreview.style.filter = effect[effectClass];
  });

  form.addEventListener('change', (evt) => {
    if (evt.target.name === 'effect') {
      photoPreview.classList.remove(`effects__preview--${effectClass}`);
      photoPreview.classList.add(`effects__preview--${evt.target.value}`);
      sliderDepthOfEffect.noUiSlider.set(1);
      photoPreview.style.filter = effect[evt.target.value];

      if (!photoPreview.classList.contains('effects__preview--none')) {
        sliderDepthOfEffect.removeAttribute('disabled');
      } else {
        sliderDepthOfEffect.setAttribute('disabled', true);
      }
      effectClass = evt.target.value;
    }
  });

  form.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    } else {
      evt.preventDefault();
      const formData = new FormData(evt.target);
      sendData(formData);
    }
  });

  pristine.addValidator(
    form.querySelector('.text__description'),
    isCommentLengthCorrect,
    `от ${СommentLength.MIN} до ${СommentLength.MAX} символов`
  );
}

export {addEventListenersToForm};
