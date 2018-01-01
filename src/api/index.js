'use strict';

import nedb from 'nedb';

import { DETAIL_DB_NAME, FIRST_DATE, PERSONALITY_DB_NAME } from '../common';

/** Milliseconds per a day. */
const DATE = 1000 * 60 * 60 * 24;

/** Current database. */
const db = new nedb({ filename: PERSONALITY_DB_NAME, autoload: true });

/**
 * @typedef Personality
 * @type {object}
 * @property {number} cycle
 * @property {string} inner
 * @property {string} lifeBase
 * @property {string} outer
 * @property {string} potential
 * @property {string} workstyle
 */

/**
 * Get personality from birthday.
 * @param {Date | string} birth
 * @returns {Promise.<Personality>} Personality.
 */
export const personalityAsync =
    birth =>
    new Promise(
        (resolve, reject) => {
            const d = typeof birth === 'string' ? new Date(birth) : birth;
            const diff = (d.getTime() - new Date(FIRST_DATE).getTime());
            const params = { date: days / DATE >> 0 };
            db.findOne(params, (e, r) => e ? reject(e) : resolve(r));
        });

/**
 * Create query.
 * @param {string} type Personality type.
 * @param {'inner'|'outer'|'workstyle'} category Category of personality type.
 * @return {Object.<string, string>} Query.
 */
const query =
    (type, category) => ({
        [category]: type
    });

/**
 * Get birthdays from personality type.
 * @param {string} type Personality type.
 * @param {'inner'|'outer'|'workstyle'} category Category of personality type.
 * @returns {Promise.<Date[]>} Birthdays.
 */
export const birthdaysAsync =
    (type, category = 'inner') =>
    new Promise(
        (resolve, reject) =>
        db.find(
            query(type, category),
            (e, r) => e ? reject(e) : r.map(({ date }) => new Date(date))));