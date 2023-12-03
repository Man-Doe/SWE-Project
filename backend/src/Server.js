const { Console } = require("console");
const gameConstructor = require("./Game.js");
const gameInstance = gameConstructor();
const http = require("http");
const cors = require('cors');
const express = require("express");
const fs = require("fs");
const Database = require("./Database");
const databaseInstance = Database();

const app = express(); 

app.use(cors());

app.get("/stream", function(req, res) { 
    try {
        res.writeHead(200, { 'Content-Type': 'audio/mp3' });
        fs.createReadStream(gameInstance.getAudioPath()).pipe(res);
    } catch (error) {
        next(error);
    }
}); 

app.get("/current-game-data", function(req, res) { 
    console.log("sending data");
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
        next(error);
    }
});

app.get("/answer-open-response/:answer", function(req, res) { 
    try {
        res.json(gameInstance.answerOpenQuestion(parseInt(req.params.answer)));
    } catch(error) {
        next(error);
    }
}); 

app.get("/leaderboard/player/:rank", function(req, res) { 
    try {
        res.json(gameInstance.getLeaderBoard(parseInt(req.params.rank)));
    } catch(error) {
        next(error);
    }
}); 

app.get("/leaderboard/record/:username", function(req, res) { 
    try {
        gameInstance.recordOnLeaderBoard(req.params.username);
        res.end("Added username to record");
    } catch(error) {
        next(error);
    }
}); 


app.use(function(request, response) { 
    response.status(404).render("404"); 
});

app.listen(49293, () => {
    console.log('Server is running on port 49293');
});