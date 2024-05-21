const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../config/db.json');

module.exports = {
    getDb() {
        file = fs.readFileSync(dbPath);
        return JSON.parse(file);
    },

    createId() {
        return String(Math.round(Math.random() * 100000000000)).slice(0, 8)
    },

    findById(db, id) {
        return db.find((record) => record.id === id);
    },

    commitToDb(updatedDb) {
        fs.writeFileSync(
            path.join(__dirname, '../config/db.json'),
            JSON.stringify(updatedDb, null, 2)
            );
    },

    deleteById(db, id) {
        const index = db.findIndex((item) => {return item.id === id;});
          if (index == -1) {
            console.log("Invalid index");
          }
          db.splice(index, 1);
          return db;
    }
};
