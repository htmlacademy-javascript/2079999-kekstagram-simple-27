import {createPhotos} from './mock/data.js';
import {renderThumbnails} from './render-content.js';
import {addEventListenersToForm} from'./form.js';

const PHOTOS_COUNT = 25;
renderThumbnails(createPhotos(PHOTOS_COUNT));
addEventListenersToForm();
