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

const form = document.querySelector('.img-upload__form');
const closeEditorModalButton = form.querySelector('#upload-cancel');
const scaleDownButton = form.querySelector('.scale__control--smaller');
const scaleUpButton = form.querySelector('.scale__control--bigger');
const uploadControl = form.querySelector('#upload-file');
const editorModal = form.querySelector('.img-upload__overlay');
const photoPreview = form.querySelector('.img-upload__preview');
const sliderDepthOfEffect = form.querySelector('.effect-level__slider');
const sliderDepthOfEffectInput = form.querySelector('.effect-level__value');
const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text'
});

const scaleControlInputValue = form.querySelector('.scale__control--value');
/**
 * Функция устанавливает значение масштаба по умолчанию в окне редактора загруженного изображения.
 */
function scaleReset() {
  scaleControlInputValue.value = `${ScaleValue.DEFAULT}%`;
  photoPreview.style.transform = `scale(${ScaleValue.DEFAULT / 100})`;
}

/**
 * Функция меняет значение масштаба в окне редактора загруженного изображения.
 */
function scaleChange(evt) {
  let currentValue = Number((scaleControlInputValue.value).slice(0, -1));

  if ((evt.target === scaleUpButton) && currentValue >= ScaleValue.MIN && currentValue < ScaleValue.MAX) {
    scaleControlInputValue.value = `${currentValue + ScaleValue.STEP}%`;
  }

  if ((evt.target === scaleDownButton) && currentValue > ScaleValue.MIN && currentValue <= ScaleValue.MAX) {
    scaleControlInputValue.value = `${currentValue - ScaleValue.STEP}%`;
  }

  currentValue = Number((scaleControlInputValue.value).slice(0, -1));
  photoPreview.style.transform = `scale(${currentValue / 100})`;
}

/**
 * Функция вызывает закрытие окна редактора загруженного изображения, если произошло нажатие ESC.
 * @param {Object} evt - объект события.
 */
function onEscape(evt) {
  if (isEscapeKey(evt)) {
    closeEditorModal();
  }
}

/**
 * Функция открывает окно редактора загруженного изображения.
 */
function openEditorModal() {
  document.addEventListener('keydown', onEscape);
  editorModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleReset();
  sliderDepthOfEffect.setAttribute('disabled', true);
}

noUiSlider.create(sliderDepthOfEffect, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

let effectName;
form.addEventListener('change', (evt) => {
  if (evt.target.name === 'effect') {
    photoPreview.classList.remove(`effects__preview--${effectName}`);
    photoPreview.classList.add(`effects__preview--${evt.target.value}`);
    effectName = evt.target.value;

    if (!photoPreview.classList.contains('effects__preview--none')) {
      sliderDepthOfEffect.removeAttribute('disabled');
    } else {
      sliderDepthOfEffect.setAttribute('disabled', true);
    }
  }
});


const effect = {
  depth: 1,
  chrome: `grayscale(${this.depth})`,
  sepia: `sepia(${this.depth})`,
  marvin: `invert(${this.depth * 100}%)`,
  phobos: `blur(${this.depth}px)`,
  heat: `brightness(${this.depth})`
};

sliderDepthOfEffect.noUiSlider.on('update', () => {
  effect.depth = sliderDepthOfEffect.noUiSlider.get();
  sliderDepthOfEffectInput.value = effect.depth;
  photoPreview.style.filter = effect[effectName];
});

form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

pristine.addValidator(
  form.querySelector('.text__description'),
  isCommentLengthCorrect,
  `от ${СommentLength.MIN} до ${СommentLength.MAX} символов`
);


/**
 * Функция закрывает окно редактора загруженного изображения.
 */
function closeEditorModal() {
  editorModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadControl.value = '';
  photoPreview.style.transform = `scale(${ScaleValue.DEFAULT / 100})`;
  document.removeEventListener('keydown', onEscape);
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
  return comment.length >= СommentLength.MIN && comment.length <= СommentLength.MAX;
}


/**
 * Функция устанавливает обработчики событий на окно редактора загруженного изображения.
 */
function addEventListenersToForm() {
  uploadControl.addEventListener('change', openEditorModal);
  closeEditorModalButton.addEventListener('click', closeEditorModal);
  scaleDownButton.addEventListener('click', scaleChange);
  scaleUpButton.addEventListener('click', scaleChange);
}

export {addEventListenersToForm};
