const fs = require('fs');
const path = require('path');

module.exports = {
    createId() {
        return String(Math.round(Math.random() * 100000000))
    },

    findById(db, id) {
        const record = db.find((record) => record.id === id);
        if (!record) {
            console.log('Record not found');
        }
        return record;
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
