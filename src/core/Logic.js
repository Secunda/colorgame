let Logic = class {
    constructor() {
        this.previousCells = 0;
        this.currentCells = 0;
    }

    newStep(currentColor, matrix) {
        let newMatrix = matrix.slice();
        if (newMatrix.length) {
            let statusMatrix = this.generateStatusMatrix(newMatrix),
                previousColor = newMatrix[0][0];

            return this.tableCalculation(newMatrix, statusMatrix, previousColor, currentColor);
        }
        
        return newMatrix;
    }

    tableCalculation(matrix, statusMatrix, previousColor, color, row = 0, col = 0) {
        if (statusMatrix[row][col] !== 1 && matrix[row][col] === previousColor) {
            matrix[row][col] = color;
            statusMatrix[row][col] = 1;
            
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

    step = (currentColor, matrix) => {
        if (matrix.length) {
            // previous color
            let previousColor = matrix[0][0],
                isAllowedApplyChangesRows = true,
                arrayWithIndexesForAdditionalChecks = [];

            /**
             * Calculate the number of marked cells by previous color
             */
            this.previousCells = this.calcScore(matrix, previousColor);

            let newMatrix = matrix.map((rowData, rowIndex) => {
                /**
                 * Check that first color of the row is correct and we should apply changes for this row
                 */
                if (isAllowedApplyChangesRows && (rowData[0] !== previousColor)) {
                    isAllowedApplyChangesRows = false;
                }

                /**
                 * Changes for this row should not applied
                 */
                if (!isAllowedApplyChangesRows) {
                    return rowData;
                }

                /**
                 * Flag that we should apply changes for columns
                 */
                let isAllowedApplyChangesCols = true;

                return rowData.map((color, colIndex) => {
                    /**
                     * Check that we must apply changes
                     */
                    if (isAllowedApplyChangesCols) {
                        /**
                         * Check column color and if it's correct, 
                         * we will change it for current choosen color
                         */
                        if (color === previousColor) {
                            return currentColor;
                        } else {
                            /**
                             * If it's not first row, we have to check color on previous row 
                             * with limitation by current index. For it we create additional 
                             * array with values - row index and column index
                             */
                            arrayWithIndexesForAdditionalChecks.push([rowIndex, colIndex]);
                        }
                    }

                    /**
                     * Set flag that other columns should not be changed
                     * and return initial color
                     */
                    isAllowedApplyChangesCols = false;
                    return color;
                });
            });

            if (arrayWithIndexesForAdditionalChecks.length) {
                let columnNumber = newMatrix[0].length;

                arrayWithIndexesForAdditionalChecks.forEach((data) => {
                    let [row, col] = data;

                    if (row === 0) {
                        let nextRow = row + 1;
                        for (let i = 0; i < col; i++) {
                            newMatrix = this.additionalTableCalculation(
                                newMatrix, nextRow, i, previousColor, currentColor
                            );
                        }
                    } else if(row > 0 && row < columnNumber - 1) {
                        let nextRow = row + 1;
                        let previousRow = row - 1;
                        for (let i = 0; i < col; i++) {
                            newMatrix = this.additionalTableCalculation(
                                newMatrix, nextRow, i, previousColor, currentColor
                            );
                            newMatrix = this.additionalTableCalculation(
                                newMatrix, previousRow, i, previousColor, currentColor
                            );
                        }
                    } else {
                        let previousRow = row - 1;
                        for (let i = 0; i < col; i++) {
                            newMatrix = this.additionalTableCalculation(
                                newMatrix, previousRow, i, previousColor, currentColor
                            );
                        }
                    }
                });
            }

            /**
             * Calculate the number of marked cells by current color
             */
            this.currentCells = this.calcScore(newMatrix, currentColor);

            return newMatrix;
        }

        return matrix;
    }

    /**
     * Additional checks for set current color of cells by using cross method
     */
    additionalTableCalculation(matrix, row, col, previousColor, currentColor) {
        if (
            typeof matrix[row] !== "undefined"
            && typeof matrix[row][col] !== "undefined"
            && matrix[row][col] === previousColor
        ) {
            /**
             * Change current color
             */
            matrix[row][col] = currentColor;

            /**
             * Try to find neighboring cells and check for our logic
             */
            matrix = this.additionalTableCalculation(matrix, row - 1, col, previousColor, currentColor);
            matrix = this.additionalTableCalculation(matrix, row, col + 1, previousColor, currentColor);
            matrix = this.additionalTableCalculation(matrix, row + 1, col, previousColor, currentColor);
            matrix = this.additionalTableCalculation(matrix, row, col - 1, previousColor, currentColor);
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