var wins = 0;
var losses = 0;

var directionsText = document.getElementById("directions-text");
var userChoiceText = document.getElementById("userchoice-text");
var guessedText = document.getElementById("letter-guessed-text");
var lettersGuessedText = document.getElementById("letters-guessed-text");
var guessesRemainingText = document.getElementById("guesses-remaining-text");
var lossCountText = document.getElementById("losses-text");
var winCountText = document.getElementById("wins-text");


var game =  new psychic();

document.onkeyup = function(event) {
    var userGuess = event.key;
    game.guess = userGuess

    if(!game.gameOver)
    {
        if(!game.guesses.includes(userGuess))
            game.checkGuess(userGuess);
    }
    else
    {
        game = new psychic();
        game.update();
    }
};


function psychic () {
    this.choices = ['a','b','c','d','e','f','g','h','i','j',
                'k','l','m','n','o','p','q','r','s','t',
                    'u','v','w','x','y','z']; 

    this.computerChoice = this.choices[Math.floor(Math.random() * this.choices.length)];
    this.guesses = [];
    this.numGuesses = 5;
    this.guessedCorrect = false;
    this.gameOver = false;
    this.notice = "";
    this.guess = "";
    console.log(this.computerChoice);

}

psychic.prototype.checkGuess = function (guess) {
    this.guesses.push(guess.toUpperCase());

    if (guess == this.computerChoice)
    {
        this.guessedCorrect = true;
    }
    else
    {
        this.numGuesses--;
        this.notice = "Please try again";
    }

    if (this.numGuesses == 0 && !this.guessedCorrect)
    {
        losses++;
        this.gameOver = true;
        this.notice = "You did not guess correctly. The correct answer is: " + this.computerChoice.toUpperCase();
    }
    if (this.guessedCorrect)
    {
        wins++;
        this.gameOver = true;
        this.notice = "You guessed it correctly!!! The letter is: " + this.computerChoice.toUpperCase();

    }
    game.update();
};

psychic.prototype.update = function () {
     // Hide the directions
     directionsText.textContent = "";

     // Display the user and computer guesses, and wins/losses/ties.
     userChoiceText.textContent = "You chose: " + this.guess.toUpperCase();
     
     // Display current guesses
     guessedText.textContent =  this.notice;
     
     //remaing number of guesses
     guessesRemainingText.textContent = "Guesses Remaining: " + this.numGuesses;
 
     lettersGuessedText.textContent = "Letters Guessed: " + this.guesses.join(" ");
     // amount of wins
     winCountText.textContent = "Wins: " + wins;
     // amount of losses
     lossCountText.textContent = "Losses: " + losses;  
}

game.update();