import {uploadControl, editorModal, closeEditorModalButton} from './selection.js';
import {scaleControl} from './scale-control.js';

function openEditorModal() {
  editorModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  scaleControl.setDefaultValue();
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

closeEditorModalButton.addEventListener('click', () => {
  closeEditorModal();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeEditorModal();
  }
});

scaleControl.reduce.addEventListener('click', () => {
  scaleControl.reduceValue();
});

scaleControl.add.addEventListener('click', () => {
  scaleControl.addValue();
});

export * from './form.js';
