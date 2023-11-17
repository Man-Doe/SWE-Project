The execute a test of the program run the "program.html" file in a browser




Terms -
Choice - The game has a collection of question. Each question contains four multiple choice options. Each multiple choice has values starting from [1-4].



How to use it 
First make a game instance with the Game() constructor.

When the player is ready to start a new game please call startNewGame(questionAmount, guessLimit), where questionAmount is a number that represents the number of questions in the game 
and the guessLimit is a number the represents the amount of guesses the user has for each question. 

When the game starts or when the player has answered a question use the hasGameEnded() method. If hasGameEnded() returns true the game has ended and the GUI should go into a result screen.
If hasGameEnded() returns false it will do the following indented instructions.

    If it is easy or medium difficulity use the getChoiceText(choiceInput) where choiceInput is a number that gets a corresponding text for the current questions choice text from [1-4].

    When the player is ready to check if there answer is correct or not please use the answerChoiceQuestion(choiceInput) where choice input is a number that represents the choice 
    they picked or answerOpenQuestion(bpmInput) where bpm input is a string that represents the bpm they had answered. When either method is called it will return true if the 
    answer was correct or false if the answer is wrong. The method also automatically switches to the next question if all the guesses are used up or if the answer given was correct. 


 


Notes -
startNewGame method works even if a game is still ongoing. As it will just overwite the current game.
When answerChoiceQuestion(choiceInput) and answerOpenQuestion(bpmInput) makes the game switch to a new question when an audio clip is playing. It will pause the audio clip.


Methods to display question.

1.Everytime answerChoiceQuestion or answerOpenQuestion is called and it is not the end of the game. Just display the game's current question again even if it is the same one.

2.Redisplay the current question of the game under the following condition ((answerChoiceQuestion(choiceInput) || gameInstance.getGuessRemaning() === 1) && !gameInstance.hasGameEnded()).  
