// import modules
const assert = require('assert');
const fs = require('fs');
const {
    createId,
    findById,
    commitToDb,
    deleteById
} = require('../utils/db-utils');
const db = require('../config/db.json');
const setupTeardownDb = require('./testSetup');
const path = require('path');


describe('Database Utility Functions', () => {
    setupTeardownDb();  // restores db to original state after each test

    describe('createId', () => {
        it('returns a string with 8 numeric charcacters to use an id', () => {
            // setup
            const expectedLength = 8;
            const expectedType = 'string';
            // execute
            const id = createId();
            const idLength = id.length;
            const idType = typeof id;
            // verify
            assert.strictEqual(idLength, expectedLength);
            assert.strictEqual(idType, expectedType);
        });
    });
    
    describe('findById', () => {
        it('returns record from db file with matching id', () => {
            // setup
            const expectedRecord = {
                'id': '12345678',
                'name': 'Eating Out',
                'budget_remaining': '100'
            };
            // execute
            const record = findById('12345678');
            // verify
            assert.deepEqual(record, expectedRecord);
    
        });
        it('returns undefined if no record is found', () => {
            // execute
            const record = findById('xxxxxxxx');
            // verify
            assert.strictEqual(record, undefined);
        });
    });
    
    describe('commitToDb', () => {
        it('commits an updated instance of db to json file', () => {
            // setup
            const newDb = [];
            const dbPath = path.join(__dirname, '../config/db.json');
    
            // execute
            commitToDb(newDb);
            const dbFile = fs.readFileSync(dbPath);
            const data = JSON.parse(dbFile);
    
            // verify
            assert.deepStrictEqual(data, newDb);
        });
    });
    
    describe('deleteById', () => {
        it('deletes item from db file with matching id', () => {
            // setup
            const id = '12345678';
            const expectedDbLength = db.length -1;
            // execute
            deleteById(id);
            const record = findById(id);
            const DbLength = db.length;
            // verify
            assert.strictEqual(record, undefined);
            assert.strictEqual(DbLength, expectedDbLength);
    
        });
    });
});