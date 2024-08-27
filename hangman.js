var Hangman = (function () {
    'use strict';

    function Hangman(elId) {
        this.elId = elId;

        this.words = [
            { word: 'SORTING HAT', hint: ' A magical hat that sorts students into one of the four Hogwarts houses' },
            { word: 'GOLDEN SNITCH', hint: 'A small, winged ball in Quidditch that ends the game when caught' },
            { word: 'GALLEON', hint: 'The main currency in the wizarding world, made of gold' },
            { word: 'MIRROR OF ERISED', hint: 'A mirror that shows the deepest desires of the viewers heart' },
            { word: 'INVISIBILITY CLOAK', hint: 'A cloak that renders the wearer completely invisible' },
            { word: 'CHAMBER OF SECRETS', hint: 'A hidden chamber within Hogwarts housing a deadly monster' },
            { word: 'QUIDITCH', hint: 'A popular magical sport played on broomsticks' },
            { word: 'BASILISK', hint: 'A giant serpent that can kill with a single glance' },
            { word: 'TRIWIZARD TOURNAMENT', hint: 'A magical competition between three wizarding schools, testing skill, courage, and wit' },
            { word: 'DEATH EATERS', hint: 'Followers of Lord Voldemort, committed to dark magic and pure-blood supremacy' },
            { word: 'AVEDA KEDAVRA', hint: 'The Killing Curse, one of the Unforgivable Curses, causing instant death' },
            { word: 'MOANING MYRTYL', hint: 'A ghost who haunts a bathroom at Hogwarts, often crying' },
            { word: 'HORCRUX', hint: 'A dark object containing a fragment of a wizards soul for immortality' },
            { word: 'DEATHLY HALLOWS', hint: 'Three powerful magical objects that together make the possessor the Master of Death' },
            { word: 'ELDER WAND', hint: 'The most powerful wand ever made, one of the Deathly Hallows' },
            { word: 'Marauder Map', hint: 'A magical map showing every persons location within Hogwarts' },
            { word: 'VOLDEMORT', hint: 'The dark wizard who seeks to conquer the wizarding world and eradicate Muggles' },
            { word: 'SLYTHIRIN', hint: 'One of the four Hogwarts houses, known for ambition, cunning, and resourcefulness' },
            { word: 'RAVENCLAW', hint: 'One of the four Hogwarts houses, valued for intelligence, wisdom, and creativity' },
            { word: 'GRYFFINDOR', hint: 'One of the four Hogwarts houses, celebrated for bravery, courage, and chivalry' },
            { word: 'HUFFLEPUFF', hint: 'One of the four Hogwarts houses, known for loyalty, patience, and hard work' },
            { word: 'HEDWIG', hint: 'Harry Potters loyal snowy owl and messengerbound to serve their masters' },
            { word: 'DOBBY', hint: 'A free house-elf known for his loyalty to Harry Potter' },
            { word: 'SEVERUS SNAPE', hint: 'A complex and skilled wizard, known for his mastery of Potions and loyalty to Dumbledore' },
            { word: 'HAGRID', hint: 'The half-giant Keeper of Keys and Grounds at Hogwarts, with a love for magical creatures' },
            { word: 'DUMBLEDORE', hint: 'The wise and powerful headmaster of Hogwarts, revered in the wizarding world' },
            { word: 'TOM MARVOLO RIDDLE', hint: 'The birth name of Lord Voldemort, who turned from a brilliant student to a dark wizard' },
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
