'use strict';

import nedb from 'nedb';

import { DETAIL_DB_NAME, FIRST_DATE, PERSONALITY_DB_NAME } from '../common';

/** Milliseconds per a day. */
const DATE = 1000 * 60 * 60 * 24;

/** Personality database. */
const personalityDb =
    new nedb({ filename: PERSONALITY_DB_NAME, autoload: true });

/** Detail database. */
const detailDb =
    new nedb({ filename: DETAIL_DB_NAME, autoload: true });

/**
 * @typedef Personality
 * @type {object}
 * @property {string} date
 * @property {number} cycle
 * @property {string} inner
 * @property {string} lifeBase
 * @property {string} outer
 * @property {string} potential
 * @property {string} workstyle
 */

/**
 * @typedef Detail
 * @type {object}
 * @property {string} type
 * @property {string} communication
 * @property {string} management
 * @property {string} response
 * @property {string} position
 * @property {string} motivation
 * @property {Object.<string, number>} romance
 * @property {Object.<string, number>} business
 * @property {Object.<string, string>} bizTeam
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
            const params = { date: diff / DATE >> 0 };
            personalityDb.findOne(
                params, (e, r) => e ? reject(e) : resolve(r));
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
        personalityDb.find(
            query(type, category),
            (e, r) =>
            e ? reject(e) : r.map(({ date }) => new Date(date))));

/**
 * Get detail from personality type.
 * @param {string} type Personality type.
 * @returns {Promise.<Detail>} Detail.
 */
export const detailAsync =
    type =>
    new Promise(
        (resolve, reject) => detailDb.findOne({ type }),
        (e, r) => e ? reject(e) : resolve(r));