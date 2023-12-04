const { Console } = require("console");
const gameConstructor = require("./Game.js");
const gameInstance = gameConstructor();
const http = require("http");
const cors = require('cors');
const express = require("express");
const fs = require("fs");

const app = express(); 

app.use(cors());

app.get("/stream", function(req, res) { 
    try {
        res.writeHead(200, { 'Content-Type': 'audio/mp3' });
        fs.createReadStream(gameInstance.getAudioPath()).pipe(res);
    } catch (error) {
        console.log(error)
    }
}); 

app.get("/current-game-data", function(req, res) { 
    res.json(gameInstance.getData());
}); 

app.get("/start/:numQuestion/:numGuess/:difficulty", async function(req, res) {
    try {
        const numOfQuestions = parseInt(req.params.numQuestion);
        const numOfGuesses = parseInt(req.params.numGuess);
        const diff = parseInt(req.params.difficulty);
        await gameInstance.startNewGame(numOfQuestions,numOfGuesses, diff);
        res.end("Intalize game");
    } catch(error) {
        console.log(error)
    }
});

app.get("/answer-open-response/:answer", function(req, res) { 
    try {
        res.json(gameInstance.answerOpenQuestion(parseInt(req.params.answer)));
    } catch(error) {
        console.log(error)
    }
}); 

app.get("/answer-multiple-choice/:answer", function(req, res) { 
    try {
        res.json(gameInstance.answerChoiceQuestion(parseInt(req.params.answer)));
    } catch(error) {
        console.log(error)
    }
}); 

app.get("/leaderboard/count", async function(req, res) { 
    try {
        res.json(await gameInstance.getLeaderboardCount());
    } catch(error) {
        console.log(error)
    }
}); 

app.get("/leaderboard/player/:rank", async function(req, res) { 
    try {
        res.json(await gameInstance.getLeaderboardRank(parseInt(req.params.rank)));
    } catch(error) {
        console.log(error)
    }
}); 

app.get("/leaderboard/record/:username", async function(req, res) { 
    try {
        await gameInstance.recordOnLeaderBoard(req.params.username);
        res.end("Added username to record");
    } catch(error) {
        console.log(error)
    }
}); 



app.listen(49293, () => {
    console.log('Server is running on port 49293');
});