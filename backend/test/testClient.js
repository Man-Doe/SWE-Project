
async function startGame() {
    try {
        await fetch("http://localhost:49293/start/3/3/3");
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


async function answerChoice(num) {
    var result = await fetch(("http://localhost:49293/answer-multiple-choice/" + num));
    result = await result.json();
    return result["isCorrect"];
}


async function runGame() {
    await startGame();
    document.writeln("start to print out stuff");
    document.writeln("Choice Input 1:" + await answerChoice(1));
    document.writeln("Choice Input 2:" + await answerChoice(3));
    document.writeln("Choice Input 3:" + await answerChoice(4));
    document.writeln("Finished to print out stuff");
}


async function music() {
    var something = await new Audio("http://localhost:49293/stream");
    something.play();
}

music();
//runGame();

