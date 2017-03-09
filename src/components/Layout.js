import React from "react"
import { connect } from 'react-redux'

import Header from "./Header"
import Footer from "./Footer"
import Content from "./Content"

import { 
    generateGame, startNewGame, nextStep, calcScore, switchSize
} from "../actions/Table"

import { LIST_OF_CHOOSERS } from '../constants/DefaultGameOptions';

class Layout extends React.Component {
    componentWillMount() {
        this.props.dispatch(this.startNewGame())
    }

    componentWillUpdate(state) {
        console.log(state)
    }

    /**
     * Method for starting new game
     */
    startNewGame() {
        return (dispatch, getState) => {
            dispatch(generateGame(getState().game));
            dispatch(startNewGame(getState().game.matrix));
        }
    }

    /**
     * Method for generating next step
     */
    nextStep(currentColor) {
        let { game } = this.props,
            previousColor = game.currentColor,
            previousMatrix = game.matrix,
            gameStep = nextStep(currentColor, game);
        
        return (dispatch, getState) => {
            dispatch(gameStep);

            let { game } = getState(),
                currentColor = game.currentColor,
                currentMatrix = game.matrix,
                score = game.score;

            dispatch(calcScore(score, previousColor, previousMatrix, currentColor, currentMatrix));
        }
    }

    /**
     * Method for changing table size
     */
    switchSize = (rowNumbers, colNumbers) => {
        return (dispatch, getState) => {
            dispatch(switchSize(rowNumbers, colNumbers));
            dispatch(this.startNewGame());
        }
    }

    /**
     * New game handler
     */
    newGameHandler = (e) => {
        e.preventDefault();

        this.props.dispatch(this.startNewGame())
    }

    /**
     * Next step handler
     */
    nextStepHandler = (e, currentChoose) => {
        e.preventDefault();

        /**
         * If color is equal to current, won't do any actions
         */
        if (this.props.game.currentColor !== currentChoose) {
            this.props.dispatch(this.nextStep(currentChoose))
        }
    }

    /**
     * Switch game table size handler
     */
    switchTableSizeHandler = (e, rowNumbers, colNumbers) => {
        e.preventDefault();

        this.props.dispatch(this.switchSize(rowNumbers, colNumbers))
    }

    render() {
        const { game } = this.props;

        return (
            <div className="app flex-container">
                <Header newGame={this.newGameHandler} score={game.score} step={game.step}
                    switchSize={this.switchTableSizeHandler} />
                <Content cols={game.colNumbers} rows={game.rowNumbers} matrix={game.matrix} />
                <Footer listOfChoosers={LIST_OF_CHOOSERS} nextStep={this.nextStepHandler} />
            </div>
        );
    };
}

function mapStateToProps (state) {
    return {
        game: state.game
    }
}

export default connect(mapStateToProps)(Layout)