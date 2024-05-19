const fs = require('fs');
const db = require('../config/db.json');

// restore original state of db after each test
setupTeardownDb = () => {
    let dbOriginalState;
    beforeEach(() => {
        dbOriginalState = JSON.stringify(db, null, 2);
    });
    afterEach(() => {
        fs.writeFileSync('./config/db.json' , dbOriginalState, 'utf-8');
    });
};

module.exports = setupTeardownDb;
