import {createTestPhoto} from './mock/data.js';
import {renderThumbnails} from './render-content.js';

const TEST_PHOTO_COUNT = 25;
renderThumbnails(createTestPhoto(TEST_PHOTO_COUNT));
