import {createPhoto} from './mock/data.js';
import {renderThumbnails} from './render-content.js';
import './form/form.js';

const PHOTO_COUNT = 25;
renderThumbnails(createPhoto(PHOTO_COUNT));
