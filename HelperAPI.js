

async function startGame(numOfQuestions, numOfGuesses, difficulty) {
    const response = await fetch(("https://coral-app-tlq32.ondigitalocean.app/" + numOfQuestions + 
                    "/" + numOfGuesses + "/" + difficulty)); 
    return response;
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
    const response = await fetch("https://coral-app-tlq32.ondigitalocean.app/current-game-data");
    const result = await response.json();
    return result;
}

async function getAudio() {
    var newAudio = await new Audio("http://localhost:49293/stream");
    return newAudio;
}

async function recordOnLeaderBoard(username) {
    const response = await fetch("http://localhost:49293/leaderboard/record/" + username);
    return response;
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

async function d() {
    await startGame(1,1,1);
    something = await getData();
    document.writeln(JSON.stringify(something));
};

d();