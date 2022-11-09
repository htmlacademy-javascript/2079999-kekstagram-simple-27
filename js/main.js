import {getData} from './network.js';
import {addEventListenersToForm} from './form.js';
import {onSuccessSubmit, onFailSubmit, showAlert} from './util.js';
import {renderThumbnails} from './render-content.js';

getData(renderThumbnails, showAlert).then(() => addEventListenersToForm(onSuccessSubmit, onFailSubmit));
