import Logic from "../core/Logic"

import { 
    GENERATE_GAME, START_GAME, CHANGE_TABLE_SIZE, GAME_STEP, CALCULATE_SCORE, IS_GAME_FINISHED
} from '../constants/ActionTypes';
import { LIST_OF_CHOOSERS } from '../constants/DefaultGameOptions';

import _ from 'lodash'

/**
 * Generating new game matrix with randow values
 * @param {Object} props 
 */
export function generateGame(props) {
    let gameMatrix = [...new Array(props.rowNumbers)].map((currentRow) => {
        return [...new Array(props.colNumbers)].map((currentCols) => {
            let randomIndex = Math.floor(Math.random() * LIST_OF_CHOOSERS.length),
                bg = LIST_OF_CHOOSERS[randomIndex];

            return bg;
        });
    });
    
    return {
        type: GENERATE_GAME,
        matrix: gameMatrix
    };
}

/**
 * Starting new game
 * @param {Array} matrix 
 */
export function startNewGame(matrix) {
    return {
        type: START_GAME,
        matrix: _.cloneDeep(matrix),
        score: 0,
        step: 0,
        currentColor: matrix[0][0]
    }
}

/**
 * Action for game step
 * @param {String} currentColor 
 * @param {Object} props 
 */
export function nextStep(currentColor, props) {
    let logic = new Logic(),
        matrix = _.cloneDeep(props.matrix),
        step = _.clone(props.step);

    matrix = logic.newStep(currentColor, matrix);

    return {
        type: GAME_STEP,
        matrix: matrix,
        step: ++step,
        currentColor: currentColor
    }
}

/**
 * Calculating current score
 * @param {Number} score 
 * @param {String} previousColor 
 * @param {Array} previousMatrix 
 * @param {String} currentColor 
 * @param {Array} currentMatrix 
 */
export function calcScore(score, previousColor, previousMatrix, currentColor, currentMatrix) {
    let logic = new Logic();

    /**
     * Manual score calculation 
     */
    logic.currentCells = logic.calcScore(currentMatrix, currentColor);
    logic.previousCells = logic.calcScore(previousMatrix, previousColor);

    return {
        type: CALCULATE_SCORE,
        score: logic.getScore(score)
    }
}

/**
 * Change game matrix size 
 * @param {Number} rowNumbers 
 * @param {Number} colNumbers 
 */
export function switchSize(rowNumbers, colNumbers) {
    return {
        type: CHANGE_TABLE_SIZE,
        colNumbers: colNumbers,
        rowNumbers: rowNumbers
    }
}

export function isGameFinished(matrix) {
    let logic = new Logic();

    return {
        type: IS_GAME_FINISHED,
        finished: logic.isGameFinished(matrix)
    }
}