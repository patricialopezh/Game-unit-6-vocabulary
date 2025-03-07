// Vocabulary data: words, definitions, and sentences
const vocabularyData = [
    {
        word: "be bitten",
        definition: "To be harmed by the teeth of an animal or insect.",
        sentence: "I was afraid to go outside because I didn’t want to ___ by a mosquito."
    },
    {
        word: "be stung",
        definition: "To be pierced by the sharp part of an insect or plant.",
        sentence: "He was ___ by a bee while picking flowers."
    },
    {
        word: "break",
        definition: "To separate into pieces due to force.",
        sentence: "Be careful not to ___ the glass while washing it."
    },
    {
        word: "bruise",
        definition: "An injury that causes skin discoloration without breaking it.",
        sentence: "I fell off my bike and got a ___ on my arm."
    },
    {
        word: "burn",
        definition: "To injure tissue due to heat, fire, or chemicals.",
        sentence: "Don’t touch the stove—you’ll ___ your hand!"
    },
    {
        word: "fall off",
        definition: "To drop or detach from something.",
        sentence: "The book might ___ the shelf if it isn’t balanced."
    },
    {
        word: "hit",
        definition: "To strike or come into forceful contact with something.",
        sentence: "Be careful not to ___ your head on the low doorframe."
    },
    {
        word: "scratch",
        definition: "To cut or scrape the skin lightly.",
        sentence: "My cat likes to ___ the furniture when she's bored."
    },
    {
        word: "slip",
        definition: "To lose balance and slide unintentionally.",
        sentence: "Watch out for the wet floor, or you might ___."
    },
    {
        word: "sprain",
        definition: "To twist a ligament or joint.",
        sentence: "I managed to ___ my ankle during the basketball game."
    },
    {
        word: "trip over",
        definition: "To stumble and fall due to hitting an obstacle.",
        sentence: "Be careful not to ___ the cables on the floor."
    }
];

// Spanish translations for the vocabulary
const spanishTranslations = {
    "be bitten": "ser mordido",
    "be stung": "ser picado",
    "break": "romper",
    "bruise": "moretón",
    "burn": "quemadura",
    "fall off": "caerse",
    "hit": "golpear",
    "scratch": "rasguño",
    "slip": "resbalarse",
    "sprain": "torcerse",
    "trip over": "tropezar"
};

// Select key elements
const character = document.querySelector('.character');
const healthBar = document.querySelector('.health');
const words = document.querySelectorAll('.word'); // Vocabulary words
let health = 100; // Start with full health
let score = 0; // Start with a score of 0
let collectedWords = []; // Track collected words


// Randomly position words
words.forEach((word) => {
    const randomX = Math.floor(Math.random() * 760);
    const randomY = Math.floor(Math.random() * 360);
    word.style.left = `${randomX}px`;
    word.style.top = `${randomY}px`;
});

// Character movement
document.addEventListener('keydown', (event) => {
    const style = window.getComputedStyle(character);
    let left = parseInt(style.left);
    let top = parseInt(style.top);

    if (event.key === 'ArrowLeft' && left > 0) {
        character.style.left = `${left - 10}px`;
    }
    if (event.key === 'ArrowRight' && left < 760) {
        character.style.left = `${left + 10}px`;
    }
    if (event.key === 'ArrowUp' && top > 0) {
        character.style.top = `${top - 10}px`;
    }
    if (event.key === 'ArrowDown' && top < 360) {
        character.style.top = `${top + 10}px`;
    }
});

// Collect words with Spanish translation prompt
function collectWords() {
    const characterRect = character.getBoundingClientRect();

    words.forEach((word) => {
        const wordRect = word.getBoundingClientRect();

        if (
            characterRect.left < wordRect.right &&
            characterRect.right > wordRect.left &&
            characterRect.top < wordRect.bottom &&
            characterRect.bottom > wordRect.top
        ) {
            const wordText = word.getAttribute('data-word');
            word.remove(); // Remove the word from the screen
            collectedWords.push(wordText); // Add word to collected list

            // Ask for the Spanish translation
            const studentAnswer = prompt(
                `What is the Spanish meaning of "${wordText}"?`
            );

            if (
                studentAnswer &&
                studentAnswer.toLowerCase() === spanishTranslations[wordText].toLowerCase()
            ) {
                score += 10; // Bonus points for correct translation
                alert(`Correct! +10 points for "${wordText}"`);
            } else {
                alert(
                    `The correct Spanish translation for "${wordText}" is "${spanishTranslations[wordText]}".`
                );
            }

            // Update the score visually
            alert(`You collected: "${wordText}"`);
        }
    });

    // If all words are collected, move to Phase 2
    if (collectedWords.length === vocabularyData.length) {
        alert("Great job! You've collected all the words. Now, let's match them to their definitions.");
        matchDefinitions(); // Start Phase 2
    }
}

// Phase 2: Match Definitions
function matchDefinitions() {
    vocabularyData.forEach((item) => {
        const playerAnswer = prompt(
            `Definition: "${item.definition}"\nWhich word matches this definition?`
        );

        if (playerAnswer && playerAnswer.toLowerCase() === item.word.toLowerCase()) {
            score += 20; // Correct match
            alert(`Correct! +20 points for "${item.word}"`);
        } else {
            health -= 10; // Incorrect match
            alert(`Wrong! -10 health. The correct word was "${item.word}".`);
        }

        healthBar.style.width = `${health}%`;
        if (health <= 0) {
            endGame();
        }
    });

    alert("Nice work! Now let's complete the sentences."); // Move to Phase 3
    fillInTheBlanks(); // Start Phase 3
}

// Phase 3: Fill in the Blanks
function fillInTheBlanks() {
    vocabularyData.forEach((item) => {
        const playerAnswer = prompt(
            `Complete the sentence:\n"${item.sentence.replace("___", "...")}"`
        );

        if (playerAnswer && playerAnswer.toLowerCase() === item.word.toLowerCase()) {
            score += 20; // Correct answer
            alert(`Great job! +20 points for completing the sentence: "${item.sentence}"`);
        } else {
            health -= 10; // Incorrect answer
            alert(`Wrong! The correct word was "${item.word}".`);
        }

        healthBar.style.width = `${health}%`;
        if (health <= 0) {
            endGame();
        }
    });

    alert(`Congratulations! You've completed the game. Your final score is ${score}.`);
    endGame(); // Reset the game
}

// End the game
function endGame() {
    health = 100;
    score = 0;
    healthBar.style.width = '100%';
    alert("Game reset! Try again.");
}

// Game loop
function gameLoop() {
    collectWords(); // Phase 1: Collect words
    requestAnimationFrame(gameLoop); // Keep the game running
}
gameLoop(); // Start the game
