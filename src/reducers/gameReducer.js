export default function reducer(state={
    step: 0,
    matrix: [],
    score: 0,
    started: false,
    finished: false,
    currentColor: "",
    colNumbers: 20,
    rowNumbers: 20
  }, action) {
    switch (action.type) {
      case "START_GAME": {
        return {
          ...state, 
          started: true,
          step: action.step,
          matrix: action.matrix,
          score: action.score,
          currentColor: action.currentColor,
        }
      }
      case "CHANGE_TABLE_SIZE": {
        return {
          ...state, 
          started: true,
          step: action.step,
          matrix: action.matrix,
          score: action.score,
          currentColor: action.currentColor,
          colNumbers: action.colNumbers,
          rowNumbers: action.rowNumbers,
        }
      }
      case "GAME_STEP": {
        return {
          ...state, 
          step: action.step,
          matrix: action.matrix,
          score: action.score,
          currentColor: action.currentColor,
        }
      }
      /* no default */
    }

    return state
}
