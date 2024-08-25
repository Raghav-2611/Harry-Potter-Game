var Hangman = (function () {
    'use strict';

    function Hangman(elId) {
        this.elId = elId;

        this.words = [
            { word: 'SORTING HAT', hint: 'A tool to sort new hogwarts students into four houses' },
            { word: 'GOLDEN SNITCH', hint: 'Flying golden ball need to catch this to end the game' },
            { word: 'GALLEON', hint: 'The most valued currency of the wizarding world' },
            { word: 'MIRROR OF ERISED', hint: 'Shows u your deepest desire' },
            { word: 'PHILOSEPHERS STONE', hint: 'Makes you immortal' },
            { word: 'INVISIBILITY CLOAK', hint: 'Clothing Apparel which makes you invisible' },
            { word: 'CHAMBER OF SECRETS', hint: 'Sylitherin made this room. the continuation to know more about the word of hogwarts' },
            { word: 'QUIDITCH', hint: 'Wizarding football' },
            { word: 'BASILISK', hint: 'Snake which roams the plumbing of Hogwarts' },
            { word: 'TRIWIZARD TOURNAMENT', hint: 'Game in which every school has one champion only the toughest shall survive' },
            { word: 'DEATH EATERS', hint: 'Voldermort followers' },
            { word: 'AVEDA KEDAVRA', hint: 'One of the unforgivable curses' },
            { word: 'MOANING MYRTYL', hint: 'Died and stays in the washroom' },
            { word: 'HOURCRUXES', hint: 'Voldermort made 7 of these powerful objects' },
            { word: 'DEATHLY HALLOWS', hint: 'The combination of the resurrection stone ,the elder wand and the clock of invisiblility to form a symbol' },
            { word: 'ELDER WAND ', hint: 'The most powerful wand' },
            { word: 'SLYTHIRIN', hint: 'Draco Malfoy was sorted into this house by the hat' },
            { word: 'RAVENCLAW', hint: 'Harry potter was part of this house along with his friends Harmoine and Ron' },
            { word: 'GRYFFINDOR', hint: 'This house is represented by a Lion' },
            { word: 'HUFFLEPUFF', hint: 'this house has yellow and black colours in their flag also are known for their loyalty and patience' },
            { word: 'HEDWIG', hint: 'Harry pet companion to Hogwarts' },
            { word: 'Dobby', hint: 'A house elf, a magical creature bound to serve their masters' },
            { word: 'SNAPE', hint: 'a gothic professor incharge of the dark arts' },
            { word: 'HAGRID', hint: 'A half giant wizard , keeper of the magical creature' },
            { word: 'DUMBLEDORE', hint: 'This person is also known as the headmaster' },
        ];

        this.currentSet = [];
        this.currentWordIndex = 0;
        this.score = 0;
        this.totalWords = 5;
        this.STOPPED = false;
        this.MISTAKES = 0;
        this.GUESSES = [];
    }

    Hangman.prototype.reset = function () {
        this.STOPPED = false;
        this.MISTAKES = 0;
        this.GUESSES = [];
        this.currentSet = this.getRandomWords(this.totalWords);
        this.currentWordIndex = 0;
        this.score = 0;

        this.loadWord();
    };

    Hangman.prototype.getRandomWords = function (count) {
        // Shuffle the array and pick the first 'count' elements
        const shuffled = this.words.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    Hangman.prototype.loadWord = function () {
        this.GUESSES = []; // Reset guessed letters array
    
        var selectedWord = this.currentSet[this.currentWordIndex];
        this.WORD = selectedWord.word;
        this.HINT = selectedWord.hint;
    
        document.getElementById("btn-start").style.display = "none";
    
        this.updateHangmanParts();
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedWord());
        this.showElementByIdWithContent(this.elId + "_hint", this.HINT);
        this.showElementByIdWithContent(this.elId + "_end", "");
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join('')); // Clear guessed letters display
    };

    Hangman.prototype.updateHangmanParts = function () {
        for (var i = 1; i <= 6; i++) {
            var partId = this.elId + "_" + i;
            var partElement = document.getElementById(partId);
            if (i <= this.MISTAKES) {
                partElement.style.opacity = 1; // Show part
            } else {
                partElement.style.opacity = 0; // Hide part
            }
        }
    };

    Hangman.prototype.guess = function (letter) {
        letter = letter.charAt(0).toUpperCase();

        if (this.STOPPED || this.GUESSES.indexOf(letter) > -1) {
            return;
        }

        this.GUESSES.push(letter);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedWord());
        this.showElementByIdWithContent(this.elId + "_guesses", this.GUESSES.join(''));

        if (this.WORD.indexOf(letter) < 0) {
            this.MISTAKES++;
            this.updateHangmanParts();
            if (this.MISTAKES === 6) {
                this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>The word was: " + this.WORD + "<br/>Score: " + this.score + "/" + this.totalWords);
                this.STOPPED = true;
                // Optionally, offer a "Restart" button here
            }
        } else if (this.getGuessedWord().indexOf('_') === -1) {
            this.score++;
            this.currentWordIndex++;
            if (this.currentWordIndex < this.totalWords) {
                this.loadWord();
            } else {
                this.showElementByIdWithContent(this.elId + "_end", "You won!<br/>Score: " + this.score + "/" + this.totalWords);
                this.STOPPED = true;
                // Optionally, offer a "Restart" button here
            }
        }
    };

    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };

    Hangman.prototype.getGuessedWord = function () {
        var result = "";
        for (var i = 0; i < this.WORD.length; i++) {
            if (this.WORD[i] === " ") {
                result += " "; // Keep spaces as spaces
            } else if (this.GUESSES.indexOf(this.WORD[i]) > -1) {
                result += this.WORD[i]; // Reveal the letter if guessed
            } else {
                result += "_"; // Show an underscore for unguessed letters
            }
        }
        return result;
    };
    

    return new Hangman('hangm');
}());
