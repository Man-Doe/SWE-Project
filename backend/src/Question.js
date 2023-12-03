

const Question = function (audioRelativePathInput, bpmInput, hintInput) {
    const audioRelativePath = audioRelativePathInput;
    const RandFunctions = require("./RandFunctions");
    const randInstance = RandFunctions();
    const bpm = bpmInput;
    const hint = hintInput;
    var choiceArray;
    do {
        choiceArray = randInstance.generateListRandom(20,200,3);
    } while(choiceArray.includes(bpm));
    const correctChoice = randInstance.generateRandomInclusive(1,4);
    choiceArray.splice(correctChoice-1, 0, bpmInput);

    return Object.freeze( {
            playAudioClip: function () {
                //audioClip.play();
                return;
            },
            pauseAudioClip: function() {
                //audioClip.pause();
                return;
            },
            loadAudioClip: function() {
                //audioClip.load();
                return;
            },
            isCorrectChoice: function (choiceInput) {
                return choiceInput === correctChoice;
            },
            isCorrectBpm: function (bpmInput) {
                return bpm === bpmInput;
            },
            getChoice: function (choiceInput) {
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
                return hint;
            },
            getAudioRelativePath: function() {
                return audioRelativePath;
            }
        }
    );
};

module.exports = Question;
