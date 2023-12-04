

function Database() {
    const Question = require("./Question");
    const sqlite3 = require("sqlite3").verbose();
    const db = new sqlite3.Database("backend/db/GameDatabase.db", sqlite3.OPEN_READWRITE, (err) => {
        if (err) return console.error(err.message);
    });
    return {
        count: function() {
            var query = "SELECT COUNT(*) FROM Song;";
            return new Promise((resolve, reject) => {
                db.get(query, [], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row['COUNT(*)']);
                    }
                });
            });
        },
        getQuestion: async function(id) {
            var query = 'SELECT relPath, bpm, hint FROM Song WHERE id = ?;';
            return new Promise((resolve, reject) => {
                db.get(query, [id], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        var val = Question(row['relPath'], row['bpm'], row['hint']);
                        resolve(val);
                    }
                });
            });
        },
        insertIntoLeaderboard: async function(username, score) {
            var query = 'INSERT INTO Leaderboard(username, accuracy) VALUES (?, ?);';
            return new Promise((resolve, reject) => {
                db.get(query, [username, score], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            });
        },
        getLeaderboardCount: async function() {
            var query = "SELECT COUNT(*) FROM Leaderboard;";
            return new Promise((resolve, reject) => {
                db.get(query, [], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row['COUNT(*)']);
                    }
                });
            });
        },
        getLeaderboardRank: async function(rank) {
            if (rank > this.getLeaderboardCount()) {throw {message: "Rank does not exist within leadboard"};}
            var query = "SELECT * FROM Leaderboard ORDER BY accuracy DESC LIMIT 1 OFFSET ?;";
            return new Promise((resolve, reject) => {
                db.get(query, [(rank-1)], (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row);
                    }
                });
            });
        }
    };
}



module.exports = Database;
