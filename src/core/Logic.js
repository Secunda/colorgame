var Logic = class {

    step = (currentColor, matrix) => {
        if (matrix.length) {
            // previous color
            let previousColor = matrix[0][0],
                isAllowedApplyChangesRows = true,
                arrayWithIndexesForAdditionalChecks = [];

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
                    let row, col;
                    [row, col] = data;

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

            return newMatrix;
        }

        return matrix;
    }

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

}

export default Logic