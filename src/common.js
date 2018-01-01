'use strict';

import path from 'path';

/**
 * Create path.
 * @param {string} file File name.
 */
const createPath = file => path.join(__dirname, file);

/** File name of detail database. */
export const DETAIL_DB_NAME = createPath('detail.db');

/** File name of personality database. */
export const PERSONALITY_DB_NAME = createPath('personality.db');

/** First available data. */
export const FIRST_DATE = '1873-02-01';