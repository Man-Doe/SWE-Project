function Game () {
    const RandFunctions = require("./RandFunctions");
    const Database = require("./Database");
    const randInstance = RandFunctions();
    const databaseInstance = Database();
    var currentRound = 0;
    var currentQuestion = null;
    var guessAmount = 0;
    var guessCorrect = 0;
    var guessLimit = 0;
    var guessRemaining = 0;
    var questionRemaning = 0;
    var difficulty = 0;
    
    
    const nextQuestion = function () {
        currentQuestion = null;
        if (questionRemaning.length != 0) {
            currentQuestion = questionRemaning.pop();
        }
    }
    
    return Object.freeze (  {
            startNewGame: async function (numberOfQuestions, guessLimitInput, gameType) {
                currentRound = 1;
                guessLimit = guessLimitInput;
                guessRemaining = guessLimit;
                guessAmount = 0;
                guessCorrect = 0;
                difficulty = gameType;
                var idList  = randInstance.generateListRandom(1, await databaseInstance.count(), numberOfQuestions);
                questionRemaning = [];
                if (guessLimitInput < 0 || difficulty > 3 || difficulty <= 0 || numberOfQuestions < 1) {throw {message:"Invalid input"};}
                currentQuestion = await databaseInstance.getQuestion(idList.pop()); 
                for (var i = 0; i < numberOfQuestions - 1; i++) {
                    questionRemaning[i] = await databaseInstance.getQuestion(idList.pop());
                }
                return;
            },
            answerChoiceQuestion: function (choiceInput) {
                if (currentQuestion === null) {throw {message:"No questions to answer"};}
                var isCorrect = currentQuestion.isCorrectChoice(choiceInput);
                var correctChoice = -1;
                guessRemaining -= 1;
                guessAmount += 1;
                if (isCorrect || guessRemaining <= 0) {
                    correctChoice = currentQuestion.getCorrectChoice();
                    if (isCorrect) {guessCorrect += 1};
                    nextQuestion();
                    currentRound += 1;
                    guessRemaining = guessLimit;
                }
                return ({
                    "isCorrect": isCorrect,
                    "correctChoice": correctChoice
                });
            },
            answerOpenQuestion: function (bpmInput) {
                if (currentQuestion === null) {throw {message:"No questions to answer"};}
                var isCorrect = currentQuestion.isCorrectBpm(bpmInput);
                var correctBPM = -1;
                guessRemaining -= 1;
                guessAmount += 1;
                if (isCorrect || guessRemaining <= 0) {
                    correctBPM = currentQuestion.getCorrectBPM();
                    if (isCorrect) {guessCorrect += 1};
                    nextQuestion();
                    currentRound += 1;
                    guessRemaining = guessLimit;
                }
                return ({
                    "isCorrect": isCorrect,
                    "BPM": correctBPM
                });
            },
            getAudioPath:function () {
                return currentQuestion.getAudioRelativePath();
            },
            getAccuracyPercentage: function () {
                if (guessAmount == 0) return 0;
                return (guessCorrect/guessAmount)*100;
            },           
            getData: function() {
                if (currentQuestion == null) {
                    return {
                        "choice1": null,
                        "choice2": null,
                        "choice3": null,
                        "choice4": null,
                        "hint": null, 
                        "accuracyPercentage": this.getAccuracyPercentage(),
                        "currentRound": currentRound,
                        "guessRemaning": guessRemaining,
                        "guessAmount": guessAmount,
                        "guessCorrect": guessCorrect,
                        "hasGameEnded": true
                    };
                } else  {
                    var hintInput = currentQuestion.getNextHintText();
                    if (difficulty != 1) {
                        hintInput = null;
                    }
                    return {
                        "choice1": currentQuestion.getChoice(1),
                        "choice2": currentQuestion.getChoice(2),
                        "choice3": currentQuestion.getChoice(3),
                        "choice4": currentQuestion.getChoice(4),
                        "hint": hintInput, 
                        "accuracyPercentage": this.getAccuracyPercentage(),
                        "currentRound": currentRound,
                        "guessRemaning": guessRemaining,
                        "guessAmount": guessAmount,
                        "guessCorrect": guessCorrect,
                        "hasGameEnded": false
                    };
                }
            },
            getLeaderboardCount: async function() {
                return new Promise((resolve) => {
                    resolve(databaseInstance.getLeaderboardCount());
                });
            },
            getLeaderboardRank: async function(rank) {
                return new Promise((resolve) => {
                    resolve(databaseInstance.getLeaderboardRank(rank));
                });
            },  
            recordOnLeaderBoard: async function (userName) {
                if (currentQuestion != null) throw {message:"The game is not over yet"};
                await databaseInstance.insertIntoLeaderboard(userName, this.getAccuracyPercentage());
                return;
            },
        }
    );
};

module.exports = Game;
