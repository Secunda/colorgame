import { 
    GENERATE_GAME, START_GAME, CHANGE_TABLE_SIZE, GAME_STEP, 
    CALCULATE_SCORE 
} from '../constants/ActionTypes';
import { COLS, ROWS } from '../constants/DefaultGameOptions';

export default function reducer(state={
    /**
     * Game state
     */
    step: 0,
    matrix: [],
    score: 0,

    /**
     * Game properties
     */
    started: false,
    finished: false,

    /**
     * Game options
     */
    currentColor: "",
    colNumbers: COLS,
    rowNumbers: ROWS
  }, action) {
    switch (action.type) {
        case GENERATE_GAME: {
            return {
                ...state,
                matrix: action.matrix,
            }
        }
        case START_GAME: {
            return {
                ...state, 
                started: true,
                step: action.step,
                matrix: action.matrix,
                score: action.score,
                currentColor: action.currentColor,
            }
        }
        case CHANGE_TABLE_SIZE: {
            return {
                ...state, 
                colNumbers: action.colNumbers,
                rowNumbers: action.rowNumbers,
            }
        }
        case GAME_STEP: {
            return {
                ...state, 
                step: action.step,
                matrix: action.matrix,
                currentColor: action.currentColor,
            }
        }
        case CALCULATE_SCORE: {
            return {
                ...state, 
                score: action.score,
            }
        }
        /* no default */
    }

    return state
}
