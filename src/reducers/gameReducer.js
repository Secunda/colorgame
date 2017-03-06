export default function reducer(state={
    step: 0,
    matrix: [],
    score: 0,
    started: false,
    finished: false,
  }, action) {
    switch (action.type) {
      case "START_GAME": {
        return {
          ...state, 
          started: true,
          step: action.step,
          matrix: action.matrix,
          score: action.score,
        }
      }
      case "GAME_STEP": {
        return {
          ...state, 
          step: action.step,
          matrix: action.matrix,
          score: action.score
        }
      }
      /* no default */
    }

    return state
}
