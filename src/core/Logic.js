let Logic = class {
    constructor() {
        this.previousCells = 0;
        this.currentCells = 0;
    }

    /**
     * Make game step with matrix calculation
     * @param {String} currentColor 
     * @param {Array} matrix 
     */
    newStep(currentColor, matrix) {
        if (matrix.length) {
            let statusMatrix = this.generateStatusMatrix(matrix),
                previousColor = matrix[0][0];
                
            matrix = this.tableCalculation(matrix, statusMatrix, previousColor, currentColor);
        }
        
        return matrix;
    }

    /**
     * Additional checks for set current color of cells by using cross method
     * @param {Array} matrix 
     * @param {Array} statusMatrix 
     * @param {String} previousColor 
     * @param {String} color 
     * @param {Number} row 
     * @param {Number} col 
     */
    tableCalculation(matrix, statusMatrix, previousColor, color, row = 0, col = 0) {
        if (statusMatrix[row][col] !== 1 && matrix[row][col] === previousColor) {
            /**
             * Set flag that this cell was checked
             */
            statusMatrix[row][col] = 1;

            matrix[row][col] = color;
            
            /**
             * The same column, but row higher on one 
             */
            if ((row - 1) >= 0) {
                matrix = this.tableCalculation(matrix, statusMatrix, previousColor, color, row - 1, col);
            }
            /**
             * The same row, but next column
             */
            if ((col + 1) < matrix[0].length) {
                matrix = this.tableCalculation(matrix, statusMatrix, previousColor, color, row, col + 1);
            }
            /**
             * The same column, but row below on one
             */
            if ((row + 1) < matrix.length) {
                matrix = this.tableCalculation(matrix, statusMatrix, previousColor, color, row + 1, col);
            }
            /**
             * The same row, but previous column
             */
            if ((col - 1) >= 0) {
                matrix = this.tableCalculation(matrix, statusMatrix, previousColor, color, row, col - 1);
            }
        }

        return matrix;
    }

    /**
     * Calculate the number of cells with provided color by using cross method
     */
    calculateIdenticalCells(matrix, statusMatrix, color, row = 0, col = 0) {
        let numberOfCells = 0;

        if (matrix.length) {
            if (statusMatrix[row][col] !== 1 && matrix[row][col] === color) {
                numberOfCells++;

                statusMatrix[row][col] = 1;

                /**
                 * The same column, but row higher on one 
                 */
                if ((row - 1) >= 0) {
                    numberOfCells += this.calculateIdenticalCells(matrix, statusMatrix, color, row - 1, col);
                }
                /**
                 * The same row, but next column
                 */
                if ((col + 1) < matrix[0].length) {
                    numberOfCells += this.calculateIdenticalCells(matrix, statusMatrix,  color, row, col + 1);
                }
                /**
                 * The same column, but row below on one
                 */
                if ((row + 1) < matrix.length) {
                    numberOfCells += this.calculateIdenticalCells(matrix, statusMatrix, color, row + 1, col);
                }
                /**
                 * The same row, but previous column
                 */
                if ((col - 1) >= 0) {
                    numberOfCells += this.calculateIdenticalCells(matrix, statusMatrix, color, row, col - 1);
                }
            }
        }

        return numberOfCells;
    }

    /**
     * Wrapper for calculating cells number 
     */
    calcScore(matrix, color) {
        if (matrix.length) {
            /**
             * Create empty array with matrix structure to set which cell was handled
             */
            let statusMatrix = this.generateStatusMatrix(matrix),
                row = 0,
                col = 0;

            return this.calculateIdenticalCells(matrix, statusMatrix, color, row, col);
        }

        return 0;
    }

    /**
     * Calculate score
     */
    getScore(score) {
        let newCells = this.currentCells - this.previousCells;
        return score + Math.ceil(newCells * Math.pow(1.1, newCells));
    }

    /**
     * Generate status matrix for correct handling
     * @param {Array} matrix 
     */
    generateStatusMatrix(matrix) {
        return [...Array(matrix.length)].map(
            () => {
                return [...Array(matrix[0].length)].map(() => {
                    return 0;
                })
            }
        );
    }

}

export default Logic