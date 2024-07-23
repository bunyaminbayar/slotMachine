document.addEventListener("DOMContentLoaded", () => {
    /**
     * Represents a Slot Machine game.
     */
    class SlotMachine {
        /**
         * Initializes the SlotMachine instance.
         * @param {Array<string>} reelIds - Array of reel element IDs.
         * @param {string} spinButtonId - ID of the spin button.
         * @param {string} playAgainButtonId - ID of the play again button.
         * @param {string} winningContainerId - ID of the winning container.
         * @param {string} fireworksContainerId - ID of the fireworks container.
         */
        constructor(reelIds, spinButtonId, playAgainButtonId, winningContainerId, fireworksContainerId) {
            this.reels = reelIds.map(id => document.getElementById(id)); // Get reel elements by IDs
            this.spinButton = document.getElementById(spinButtonId); // Get spin button element
            this.playAgainButton = document.getElementById(playAgainButtonId); // Get play again button element
            this.winningContainer = document.getElementById(winningContainerId); // Get winning container element
            this.fireworksContainer = document.getElementById(fireworksContainerId); // Get fireworks container element
            this.symbols = ['cherry', 'banana', 'melon']; // Array of symbols

            // Add event listeners
            this.spinButton.addEventListener('click', this.spinReels.bind(this));
            this.playAgainButton.addEventListener('click', this.removeWinningEffects.bind(this));

            // Initialize reels with random symbols
            this.initReels();
        }

        /**
         * Initializes reels with random symbols.
         */
        initReels() {
            this.reels.forEach(reel => {
                for (let i = 0; i < 66; i++) {
                    const randomSymbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                    reel.appendChild(this.createSymbolElement(randomSymbol));
                }
            });
        }

        /**
         * Creates an image element for a symbol.
         * @param {string} symbol - The symbol name.
         * @returns {HTMLImageElement} - The created image element.
         */
        createSymbolElement(symbol) {
            const img = document.createElement('img');
            img.src = `assets/images/${symbol}.png`; // Set the source of the image
            img.alt = symbol; // Set the alt text for the image
            return img;
        }

        /**
         * Spins the reels and handles the result.
         */
        spinReels() {
            const resultSymbols = [];

            this.reels.forEach((reel, index) => {
                reel.classList.add('spin'); // Add spin class for animation
                setTimeout(() => {
                    reel.classList.remove('spin'); // Remove spin class after animation

                    reel.innerHTML = ''; // Clear current symbols
                    for (let i = 0; i < 66; i++) {
                        const randomSymbol = this.symbols[Math.floor(Math.random() * this.symbols.length)];
                        reel.appendChild(this.createSymbolElement(randomSymbol));
                        if (i === 1) {
                            resultSymbols[index] = randomSymbol; // Store the symbol at position 1
                        }
                    }

                    // Check if there is a winning combination
                    if (resultSymbols.length === 3) {
                        if (this.checkWinning(resultSymbols)) {
                            setTimeout(() => {
                                this.startWinningEffects();
                            }, 1000);
                        }
                    }
                }, 3000); // Duration of the spin animation
            });
        }

        /**
         * Checks if there is a winning combination of symbols. Give a winning effect if at least two symbols next to each other are the same.
         * @param {Array<string>} resultSymbols - Array of symbols from the reels.
         * @returns {boolean} - True if there is a win, otherwise false.
         */
        checkWinning(resultSymbols) {
            const [first, second, third] = resultSymbols;
            return first === second || second === third;
        }

        /**
         * Starts the winning effects, including fireworks and showing the winning container.
         */
        startWinningEffects() {
            this.createFireworks();
            this.winningContainer.style.display = 'flex';
            this.fireworksContainer.style.display = 'block';
        }

        /**
         * Removes the winning effects, including hiding the winning container and fireworks.
         */
        removeWinningEffects() {
            this.winningContainer.style.display = 'none';
            this.fireworksContainer.style.display = 'none';
        }

        /**
         * Creates multiple fireworks with a delay for each.
         */
        createFireworks() {
            for (let i = 0; i < 150; i++) {
                setTimeout(() => this.createFirework(), Math.random() * 3000);
            }
        }

        /**
         * Creates a single firework element.
         */
        createFirework() {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${Math.random() * 100}vw`;
            firework.style.setProperty('--shoot-duration', `${Math.random() + 1}s`);
            firework.style.setProperty('--explode-duration', `${Math.random() + 0.5}s`);
            firework.style.setProperty('--delay', '1s');
            firework.style.setProperty('--translate-y', `-${Math.random() * 80 + 10}vh`);

            const startSize = `${Math.random() * 10 + 5}px`;
            const endSize = `${Math.random() * 50 + 50}px`;
            firework.style.setProperty('--start-size', startSize);
            firework.style.setProperty('--end-size', endSize);

            firework.style.background = this.getRandomColor();
            this.fireworksContainer.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 2000);
        }

        /**
         * Generates a random color for the firework.
         * @returns {string} - The random color.
         */
        getRandomColor() {
            const colors = ['#a67c00', '#bf9b30', '#ffbf00', '#ffcf40'];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }

    // Initialize the slot machine with relevant IDs
    new SlotMachine(
        ['reel1', 'reel2', 'reel3'],
        'spinButton',
        'playAgain',
        'winningCont',
        'fireworksContainer'
    );
});
