
const QuestionList = function () {
    const questionStore = [];
    var userList = []; 
    var currentQuestion = null;
    var choiceArray;

    function generateRandomInclusive (floor, ceiling) {
        return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
    }

    function generateListRandom(floor, ceiling, amount) {
        if (amount > (ceiling - floor + 1) || amount < 0) throw {message: "Invalid amount"};
        var result = [];
        var i = 0;
        var randNum;
        while (i < amount) {
            randNum = generateRandomInclusive(floor,ceiling);
            while (result.includes(randNum)) {randNum = generateRandomInclusive(floor,ceiling)};
            result.push(randNum);
            i++;
        }
        return result;
    }

    const Question = function (audioRelativePathInput, bpmInput, hintInput) {
        const audioClip = new Audio(audioRelativePathInput);
        const bpm = bpmInput;
        const hint = hintInput;
        var choiceArray = [];

        function contains (arr, value) {
            for (let item of arr) {
                if (item == value) {return true;}
            }
            return false;
        }
    
        do {
            choiceArray = generateListRandom(60,144,3);
        } while(contains(choiceArray, bpm));
    
        const correctChoice = generateRandomInclusive(1,4);
        if (correctChoice != 4) {
            choiceArray.splice(correctChoice-1, 0, bpm);
        } else  {
            choiceArray.push(bpm);
        }
    
        return Object.freeze( {
                isCorrectChoice: function (choiceInput) {
                    return choiceInput == correctChoice;
                },
                isCorrectBpm: function (bpmInput) {
                    return bpm == bpmInput;
                },
                getChoice: function (choiceInput) {
                    if (!(choiceInput >= 1 && choiceInput <= choiceArray.length)) {throw {message: "Out of Range"}};
                    return choiceArray[choiceInput-1];
                },
                getCorrectBPM: function () {
                    return bpm;
                },
                getCorrectChoice: function () {
                    return correctChoice;
                },
                getHint: function () {
                    return hint;
                },
                playMusic: function() {
                    audioClip.loop = true;
                    audioClip.play();
                },
                isPlaying: function(){
                    return audioClip.paused;
                },
                pauseMusic: function() {
                    audioClip.pause();
                },
                loadMusic: function() {
                    audioClip.load();
                }
            }
        );
    };

    //intalize list 
    questionStore[0] = Question("../../../Tracks/air_raid_130bpm.mp3", 130, "SUPERHEROES from Daft Punk is 140 BPM.");
    questionStore[1] = Question("../../../Tracks/catacombs_136bpm.mp3", 136, "Seems pretty fast! A song with a similar tempo is __ by __ at __.");
    questionStore[2] = Question("../../../Tracks/dreamscape_110bpm.mp3", 110, "Hmmm, when I listen to this, ___ by ___ at ___ comes to mind...");
    questionStore[3] = Question("../../../Tracks/hammer_remix-X-doki_doki_105bpm.mp3", 105, "Silent Night, Holy Night by Frank Sinatra is 90 BPM.");
    questionStore[4] = Question("../../../Tracks/head_in_the_clouds_115bpm.mp3", 115, "Holiday by Weezer is 120 BPM.");
    questionStore[5] = Question("../../../Tracks/journey_home_82bpm.mp3", 82, "Seems pretty fast! A song with a similar tempo is __ by __ at __.");
    questionStore[6] = Question("../../../Tracks/midnight_rush_100bpm.mp3", 100, "Hmmm, when I listen to this, ___ by ___ at ___ comes to mind...");
    questionStore[7] = Question("../../../Tracks/simulationator_118bpm.mp3", 118, "Holiday by Weezer is 120 BPM.");
    questionStore[8] = Question("../../../Tracks/The_Inquisition_Bach_Little_Fugue_In_G_Minor_85bpm.mp3", 85, "Between Two Worlds by Mili is 83 BPM.");
    questionStore[9] = Question("../../../Tracks/vector_vibes_100bpm.mp3", 100, "Silent Night Holy Night by Frank Sinatra is 90 BPM.")

    return Object.freeze({
        generateQuestions: function (amount) {
            if (amount > questionStore.length || amount <= 0) {throw {message: "Invalid amount"};}
            var randList = generateListRandom(0, questionStore.length - 1, amount);
            userList = []
            while (randList.length != 0) {
                userList.push(questionStore[randList.pop()]);
            }
            currentQuestion = userList.pop();
        },
        nextQuestion: function() {
            if (userList.length <= 0) {throw {message: "No more questions"};}
            currentQuestion.pauseMusic();
            currentQuestion = userList.pop();
        },
        getChoice: function (choiceInput) {
            if (currentQuestion == null) {throw {message: "No more questions"};}
            currentQuestion.getChoice(choiceInput);
        },
        getCorrectBPM: function() {
            if (currentQuestion == null) {throw {message: "No more questions"};}
            return currentQuestion.getCorrectBPM();
        },
        getCorrectChoice: function() {
            if (currentQuestion == null) {throw {message: "No more questions"};}
            return currentQuestion.getCorrectChoice();
        },
        getHint: function() {
            if (currentQuestion == null) {throw {message: "No more questions"};}
            return currentQuestion.getHint();
        },
        playMusic: function() {
            if (currentQuestion == null) {throw {message: "No more questions"};}
            currentQuestion.playMusic()
        },
        isPlaying: function(){
            if (currentQuestion == null) {throw {message: "No more questions"};}
            currentQuestion.isPlaying()
        },
        pauseMusic: function() {
            if (currentQuestion == null) {throw {message: "No more questions"};}
            currentQuestion.pauseMusic();
        },
        loadMusic: function() {
            if (currentQuestion == null) {throw {message: "No more questions"};}
            currentQuestion.loadMusic();
        }
    })
}

// //test
// {
//     var something = QuestionList();
//     something.generateQuestions(1);
//     if (something.getCorrectBPM() >= 0) {
//        document.writeln("Passed test 1\n");
//     }
  
    try {
        something.nextQuestion()
    } catch (error) {
        document.writeln("passed test 2\n");
    }

    something = QuestionList();
    try {
        something.getChoice(3);
    } catch (error) {
        document.writeln("passed test 3\n");
    }
    try {
        something.getCorrectBPM();
    } catch (error) {
        document.writeln("passed test 4\n");
    }
    try {
        something.getCorrectChoice();
    } catch (error) {
        document.writeln("passed test 5\n");
    }
    try {
        something.getHint();
    } catch (error) {
        document.writeln("passed test 6\n");
    }
    try {
        something.playMusic();
    } catch (error) {
        document.writeln("passed test 7\n");
    }
    try {
        something.pauseMusic();
    } catch (error) {
        document.writeln("passed test 8\n");
    }
    try {
        something.loadMusic();
    } catch (error) {
        document.writeln("passed test 9\n");
    }
    
    function contains (arr, value) {
        for (let item of arr) {
            if (item == value) {return true;}
        }
        return false;
    }

    function isAllValuesUnique(arr) {
        const uniqueValues = new Set(arr);
        return uniqueValues.size === arr.length;
    }

    function generateRandomInclusive (floor, ceiling) {
        return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
    }

    function generateListRandom(floor, ceiling, amount) {
        if (amount > (ceiling - floor + 1) || amount < 0) throw {message: "Invalid amount"};

        var result = [];
        var i = 0;
        var randNum;

        while (i < amount) {
            randNum = generateRandomInclusive(floor,ceiling);
            while (result.includes(randNum)) {randNum = generateRandomInclusive(floor,ceiling)};
            result.push(randNum);
            i++;
        }

        return result;
    }
    var outcome = true;
    try {
        for (var i = 0; i < 1000000; i++) {
            var choiceArray;
            var bpm = generateRandomInclusive(60,144);
            do {
                choiceArray = generateListRandom(60,144,3);
            } while(contains(choiceArray, bpm));
        
            var correctChoice = generateRandomInclusive(1,4);
            
            if (correctChoice != 4) {
                choiceArray.splice(correctChoice-1, 0, bpm);
            } else  {
                choiceArray.push(bpm);
            }
            
            if (!isAllValuesUnique(choiceArray)) {
                document.writeln(choiceArray);
                outcome = false;
                break;
            }
        }
    } catch (err) {
        document.writeln(err);
        outcome = false;
    }
    if (outcome) {document.writeln("passed test 10");}
}
