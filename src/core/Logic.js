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
                            if (rowIndex > 0) {
                                arrayWithIndexesForAdditionalChecks.push([rowIndex, colIndex]);
                            }
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

            

            return newMatrix;
        }

        return matrix;
    }

}

export default Logic