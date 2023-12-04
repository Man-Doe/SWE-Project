

async function startGame(numOfQuestions, numOfGuesses, difficulty) {
    await fetch(("http://localhost:49293/start/" + numOfQuestions + 
                    "/" + numOfGuesses + "/" + difficulty)); 
    return;
}

async function answerOpenResponseQuestion(bpmInput) {
    const response = await fetch("http://localhost:49293/answer-open-response/" + bpmInput);
    const result = await response.json();
    return result;
}

async function answerMultipleChoiceQuestion(choiceInput) {
    const response = await fetch("http://localhost:49293/answer-multiple-choice/" + choiceInput);
    const result = await response.json();
    return result;
}

async function getData() {
    const response = await fetch("http://localhost:49293/current-game-data");
    const result = await response.json();
    return result;
}

async function getAudio() {
    var newAudio = await new Audio("http://localhost:49293/stream");
    return newAudio;
}

async function recordOnLeaderBoard(username) {
    const response = await fetch("http://localhost:49293/leaderboard/record/" + username);
    return;
}

async function getPlayerOnLeaderboard(rank) {
    const response = await fetch("http://localhost:49293/leaderboard/player/" + rank);
    const result = response.json();
    return result;
}

async function getLeaderboardCount() {
    const response = await fetch("http://localhost:49293/leaderboard/count");
    const result = response.json();
    return result;
}


