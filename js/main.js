import {createTestPhoto} from './mock/data.js';
import {renderThumbnails} from './render-content.js';
import './form/form.js';

const TEST_PHOTO_COUNT = 25;
renderThumbnails(createTestPhoto(TEST_PHOTO_COUNT));
