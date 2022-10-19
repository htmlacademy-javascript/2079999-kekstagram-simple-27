const form = document.querySelector('.img-upload__form');
const uploadControl = form.querySelector('#upload-file');
const editorModal = form.querySelector('.img-upload__overlay');
const closeEditorModalButton = form.querySelector('#upload-cancel');
const photoPreview = form.querySelector('.img-upload__preview');

export {form, uploadControl, editorModal, closeEditorModalButton, photoPreview};
