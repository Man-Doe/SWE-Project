//PLACEHOLDER version

var Game = function () {
    var currentRound;
    var currentQuestion;
    var guessAmount;
    var guessCorrect;
    var guessLimit;
    var guessRemaining;
    var questionRemaning;
    
    const nextQuestion = function () {
        currentQuestion.pauseAudioClip();
        currentQuestion = undefined;
        if (questionRemaning.length != 0) {
            currentQuestion = questionRemaning.pop();
        }
    }
    
    const Question = function (audioRelativePath, bpmInput, choiceArrayInput, correctChoiceInput, hintArrayInput) {
        const audioClip = new Audio(audioRelativePath);
        const bpm = bpmInput;
        const choiceArray = choiceArrayInput;
        const correctChoice = correctChoiceInput;
        const hintArray = hintArrayInput;
        return Object.freeze( {
                playAudioClip: function () {
                    audioClip.play();
                    return;
                },
                pauseAudioClip: function() {
                    audioClip.pause();
                    return;
                },
                loadAudioClip: function() {
                    audioClip.load();
                    return;
                },
                isCorrectChoice: function (choiceInput) {
                    return choiceInput === correctChoice;
                },
                isCorrectBpm: function (bpmInput) {
                    return bpm === bpmInput;
                },
                getChoiceText: function (choiceInput) {
                    if (!(choiceInput >= 1 && choiceInput <= choiceArrayInput.length)) {throw {message: "Out of Range"}};
                    return choiceArray[choiceInput-1];
                },
                getCorrectBPM: function () {
                    return bpm;
                },
                getCorrectChoice: function () {
                    return correctChoice;
                },
                getNextHintText: function () {
                    return hintArray[0];
                }
            }
        );
    };


    return Object.freeze (  {
            startNewGame: function (numberOfQuestions, guessLimitInput) {
                currentRound = 1;
                currentQuestion = Question("../audio/just-relax-11157.mp3", "85", ["85 BPM", "120 BPM", "60 BPM", "30 BPM"], 1, ["placeholder hint"]); 
                guessAmount = 0;
                guessLimit = guessLimitInput;
                guessRemaining = guessLimit;
                guessCorrect = 0;

                questionRemaning = [Question("../audio/just-relax-11157.mp3", "40", ["30 BPM", "20 BPM", "40 BPM", "50 BPM"], 3, ["Placeholder text"]),
                                    Question("../audio/just-relax-11157.mp3", "50", ["70 BPM", "50 BPM", "60 BPM", "80 BPM"], 2, ["Placeholder text"]),
                                    Question("../audio/just-relax-11157.mp3", "70", ["90 BPM", "80 BPM", "100 BPM", "70 BPM"], 4, ["Placeholder text"]),
                                    Question("../audio/just-relax-11157.mp3", "30", ["20 BPM", "40 BPM", "30 BPM", "10 BPM"], 3, ["Placeholder text"])];
                return;
            },
            hasGameEnded: function () {
                return (currentQuestion === undefined);
            }, 
            answerChoiceQuestion: function (choiceInput) {
                var isCorrect = currentQuestion.isCorrectChoice(choiceInput);
                guessRemaining -= 1;
                guessAmount += 1;
                if (isCorrect || guessRemaining <= 0) {
                    if (isCorrect) {guessCorrect += 1};
                    nextQuestion();
                    currentRound += 1;
                    guessRemaining = guessLimit;
                }
                return isCorrect;
            },
            answerOpenQuestion: function (bpmInput) {
                var isCorrect = currentQuestion.isCorrectBpm(bpmInput);
                guessRemaining -= 1;
                guessAmount += 1;
                if (isCorrect || guessRemaining <= 0) {
                    if (isCorrect) {guessCorrect += 1};
                    nextQuestion();
                    currentRound += 1;
                    guessRemaining = guessLimit;
                }
                return isCorrect;
            },
            getChoiceText: function (choiceInput) {
                return currentQuestion.getChoiceText(choiceInput);
            },
            getNextHintText: function () {
                return currentQuestion.getNextHintText();
            },
            getCorrectChoice: function () {
                return currentQuestion.getCorrectChoice();
            },
            getCorrectBPM: function () {
                return currentQuestion.getCorrectBPM();
            },
            getAccuracyPercentage: function () {
                return (guessCorrect/guessAmount)*100;
            },
            getCurrentRound: function() {
                return currentRound;
            },
            getGuessRemaning: function() {
                return guessRemaining;
            },
            playAudioClip: function () {
                currentQuestion.playAudioClip();
                return;
            },
            pauseAudioClip: function () {
                currentQuestion.pauseAudioClip();
                return;
            },
            loadAudioClip: function() {
                currentQuestion.loadAudioClip();
                return;
            }
        }
    );
};

something = Game();
something.startNewGame(5, 2);
document.writeln("wow");
document.writeln(something.answerChoiceQuestion(1));
document.writeln(something.answerChoiceQuestion(2));
document.writeln(something.answerChoiceQuestion(3));
something.playAudioClip();