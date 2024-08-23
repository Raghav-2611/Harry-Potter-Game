var Hangman = (function () {
    'use strict';

    function Hangman(elId) {
        this.elId = elId;

        // Define 5 sets of 5 words each
        this.wordSets = [
            [
                { word: 'BROOM', hint: 'A flying object used by witches and wizards' },
                { word: 'HARRY', hint: 'The boy who is also a hero' },
                { word: 'SCHOOL', hint: 'A place where young witches and wizards learn magic' },
                { word: 'WAND', hint: 'An essential tool for casting spells' },
                { word: 'POTTER', hint: 'The last name of the main character' }
            ],
            [
                { word: 'SPELL', hint: 'A magical action performed with a wand' },
                { word: 'QUIDDITCH', hint: 'A popular sport played on broomsticks' },
                { word: 'GOBLIN', hint: 'A creature that works in Gringotts' },
                { word: 'ELF', hint: 'A house helper with magical abilities' },
                { word: 'VOLDERMORT', hint: 'The dark wizard antagonist' }
            ],
            // Add 3 more sets here
        ];

        this.currentSet = [];
        this.currentWordIndex = 0;
        this.score = 0;
        this.totalWords = 5;
    }

    Hangman.prototype.reset = function () {
        this.STOPPED = false;
        this.MISTAKES = 0;
        this.GUESSES = [];
        this.currentSet = this.wordSets[Math.floor(Math.random() * this.wordSets.length)];
        this.currentWordIndex = 0;
        this.score = 0;

        this.loadWord();
    };

    Hangman.prototype.loadWord = function () {
        var selectedWord = this.currentSet[this.currentWordIndex];
        this.WORD = selectedWord.word;
        this.HINT = selectedWord.hint;
        
        document.getElementById("btn-start").style.display = "none";
        
        this.hideElementByClass('h');
        this.showElementByIdWithContent(this.elId + "_guessbox", null);
        this.showElementByIdWithContent(this.elId + "_word", this.getGuessedWord());
        this.showElementByIdWithContent(this.elId + "_hint", this.HINT);
        this.showElementByIdWithContent(this.elId + "_end", "");
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
            this.showElementByIdWithContent(this.elId + "_" + this.MISTAKES, null);
            if (this.MISTAKES === 6) {
                this.showElementByIdWithContent(this.elId + "_end", "GAME OVER!<br/>The word was: " + this.WORD + "<br/>Score: " + this.score + "/" + this.totalWords);
                this.STOPPED = true;
                setTimeout(() => this.reset(), 2000);
            }
        } else if (this.getGuessedWord().indexOf('_') === -1) {
            this.score++;
            this.currentWordIndex++;
            if (this.currentWordIndex < this.totalWords) {
                this.loadWord();
            } else {
                this.showElementByIdWithContent(this.elId + "_end", "You won!<br/>Score: " + this.score + "/" + this.totalWords);
                this.STOPPED = true;
            }
        }
    };

    Hangman.prototype.showElementByIdWithContent = function (elId, content) {
        if (content !== null) {
            document.getElementById(elId).innerHTML = content;
        }
        document.getElementById(elId).style.opacity = 1;
    };

    Hangman.prototype.hideElementByClass = function (elClass) {
        var elements = document.getElementsByClassName(elClass), i;
        for (i = 0; i < elements.length; i++) {
            elements[i].style.opacity = 0;
        }
    };

    Hangman.prototype.getGuessedWord = function () {
        var result = "", i;
        for (i = 0; i < this.WORD.length; i++) {
            result += (this.GUESSES.indexOf(this.WORD[i]) > -1) ?
                this.WORD[i] : "_";
        }
        return result;
    };

    return new Hangman('hangm');
}());
