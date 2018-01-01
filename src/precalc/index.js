'use strict';

import fs from 'fs';
import datastore from 'nedb-promise';
import progress from 'progress';
import wadjet from 'wadjet';

import { DETAIL_DB_NAME, FIRST_DATE, PERSONALITY_DB_NAME } from '../common';

/**
 * Drop table.
 * @param {string} file Table file.
 */
const drop =
    file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    };

/**
 * Create progress bar.
 * @param {number} total Total number of process.
 */
const createProgressBar =
    total =>
    new progress(
        ':bar :percent :eta sec', {
            clear: true,
            complete: '▒',
            incomplete: '░',
            width: 26,
            total,
        });

/**
 * Create date object.
 * @param {number} elapsed Elapsed days.
 */
const createDate =
    elapsed => {
        const date = new Date(FIRST_DATE);
        date.setDate(date.getDate() + elapsed);
        return date;
    };

/**
 * Pre-caluclate personality data.
 */
const precalcPersonalityAsync =
    async() => {
        const db =
            datastore({ filename: PERSONALITY_DB_NAME, autoload: true });
        await db.ensureIndex({ fieldName: 'date', unique: true });
        const indexes = ['inner', 'outer', 'workstyle', 'lifeBase'];
        for (const fieldName of indexes) {
            await db.ensureIndex({ fieldName });
        }
        const total = 64982;
        const bar = createProgressBar(total);
        for (let days = 0; days < total; days++) {
            const date = createDate(days);
            const personality = wadjet.personality(date);
            await db.insert(Object.assign(personality, { date: days }));
            bar.tick();
        }
        bar.terminate();
    };

/**
 * Pre-caluclate detail data.
 */
const precalcDetailAsync =
    async() => {
        const db = datastore({ filename: DETAIL_DB_NAME, autoload: true });
        const bar = createProgressBar(wadjet.types.length);
        await db.ensureIndex({ fieldName: 'type', unique: true });
        for (const type of wadjet.types) {
            const detail = wadjet.detail(type);
            detail.type = type;
            detail.bizTeam =
                wadjet.bizTeam(detail.business, type, detail.position);
            await db.insert(detail);
            bar.tick();
        }
        bar.terminate();
    };

drop(PERSONALITY_DB_NAME);
drop(DETAIL_DB_NAME);

(async() => {
    await precalcDetailAsync();
    await precalcPersonalityAsync();
})().catch(console.error);