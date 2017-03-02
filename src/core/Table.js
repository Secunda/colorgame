import Logic from "./Logic"

var Table = class {
    constructor() {
        this.listOfChoosers = ['cl1', 'cl2', 'cl3', 'cl4', 'cl5', 'cl6', 'cl7'];
        this.cols = 20;
        this.rows = 20; 

        this.step = 0;
        this.score = 0;
        this.matrix = [];

        this.logic = new Logic();
    }

    /**
     * Generating new game matrix with randow values
     */
    generateGame() {
        let gameMatrix = [...new Array(this.rows)].map((currentRow) => {
            return [...new Array(this.cols)].map((currentCols) => {
                let randomIndex = Math.floor(Math.random() * this.listOfChoosers.length),
                    bg = this.listOfChoosers[randomIndex];

                return bg;
            });
        });
        
        
        return gameMatrix;
    }

    /**
     * Calculating current score
     */
    calcScore() {
        return ++this.score;
    }

    /**
     * Necessary cleaning for new game
     */
    clearOldStateAndGenerateNewOne() {
        this.step = 0;
        this.score = 0;

        this.matrix = this.generateGame();
    }

    /**
     * State for starting new game
     */
    startNewGame() {
        this.clearOldStateAndGenerateNewOne();

        return {
            type: "START_GAME",
            matrix: this.matrix,
            score: this.calcScore(),
            step: this.step
        }
    }

    /**
     * State for game step
     */
    nextStep(currentColor) {
        this.matrix = this.logic.step(currentColor, this.matrix);
        this.step++;

        return {
            type: "GAME_STEP",
            matrix: this.matrix,
            score: this.calcScore(),
            step: this.step
        }
    }
}

export default Table