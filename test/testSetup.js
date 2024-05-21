const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../config/db.json');

// restore original state of db after each test
const setupTeardownDb = () => {
    let dbOriginalState;

    beforeEach((done) => {
        fs.readFile(dbPath, 'utf-8', (err, data) => {
            if (err) {
                return done(err);
            }
            dbOriginalState = data;
            done();
        });
    });

    afterEach((done) => {
        fs.writeFile(dbPath, dbOriginalState, 'utf-8', (err) => {
            if (err) {
                return done(err);
            }
            done();
        });
    });
};

module.exports = setupTeardownDb;
