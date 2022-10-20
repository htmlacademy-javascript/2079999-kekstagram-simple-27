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

function setDefaultScaleValue() {
  scaleControlInputValue.value = `${DEFAULT_SCALE_VALUE}%`;
}

function setAddedScaleValue() {
  let currentValue = Number((scaleControlInputValue.value).slice(0, -1));

  if (currentValue >= MIN_SCALE_VALUE && currentValue < MAX_SCALE_VALUE) {
    scaleControlInputValue.value = `${currentValue + CHANGE_SCALE_STEP}%`;
  }
  currentValue = Number((scaleControlInputValue.value).slice(0, -1));
  photoPreview.style.transform = `scale(${currentValue / 100})`;
}

function setReducedScaleValue() {
  let currentValue = Number((scaleControlInputValue.value).slice(0, -1));

  if (currentValue > MIN_SCALE_VALUE && currentValue <= MAX_SCALE_VALUE) {
    scaleControlInputValue.value = `${currentValue - CHANGE_SCALE_STEP}%`;
  }
  currentValue = Number((scaleControlInputValue.value).slice(0, -1));
  photoPreview.style.transform = `scale(${currentValue / 100})`;
}

function addEventListenersToForm() {
  function openEditorModal() {
    editorModal.classList.remove('hidden');
    document.body.classList.add('modal-open');
    setDefaultScaleValue();
  }

  function closeEditorModal() {
    editorModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }

  function isEscapeKey(evt) {
    return (evt.key === 'Escape');
  }

  uploadControl.addEventListener('change', () => {
    openEditorModal();
  });
  // openEditorModal();

  closeEditorModalButton.addEventListener('click', () => {
    closeEditorModal();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeEditorModal();
    }
  });

  scaleControlReduceButton.addEventListener('click', () => {
    setReducedScaleValue();
  });

  scaleControlAddButton.addEventListener('click', () => {
    setAddedScaleValue();
  });

  let effectName;
  form.addEventListener('change', (evt) => {
    if (evt.target.name === 'effect') {
      photoPreview.classList.remove(`effects__preview--${effectName}`);
      photoPreview.classList.add(`effects__preview--${evt.target.value}`);
      effectName = evt.target.value;
    }
  });
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text'
});


function isCommentLengthCorrect (value) {
  return value.length >= MIN_COMMENT_LENGTH && value.length <= MAX_COMMENT_LENGTH;
}

pristine.addValidator(
  form.querySelector('.text__description'),
  isCommentLengthCorrect,
  `от ${MIN_COMMENT_LENGTH} до ${MAX_COMMENT_LENGTH} символов`
);


form.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export {addEventListenersToForm};

//чистим обработчики событий и очищаем инпут формы загрузки
