function Database() {
    const Question = require("./Question");
    const sqlite3 = require("sqlite3").verbose();

    const db = new sqlite3.Database("backend/db/GameDatabase.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.err(err.message);
    });

    return {
        count: async function() {
            return 0;
        },
        getQuestion: async function(id) {
            var query = "SELECT relPath, bpm, hint FROM Songs WHERE id = " + id + ";";
        }
    };
}


const db = new sqlite3.Database("backend/db/GameDatabase.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.err(err.message);
});

db.run(
    "CREATE TABLE Song{id: INTEGER PRIMARY KEY, relPath:VARCHAR(255), bpm: INTEGER, hint: VARCHAR(255)};"
) 
module.exports = Database;