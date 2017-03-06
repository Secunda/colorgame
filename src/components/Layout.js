import React from "react"
import { connect } from 'react-redux'

import Header from "./Header"
import Footer from "./Footer"
import Content from "./Content"

import Table from "../actions/Table"

class Layout extends React.Component {
    constructor(props) {
        super(props);
        
        this.gameTable = new Table();

        this.listOfChoosers = this.gameTable.listOfChoosers;
        this.cols = this.gameTable.cols;
        this.rows = this.gameTable.rows;
    }

    componentWillMount() {
        this.props.dispatch(this.startNewGame())
    }

    /**
     * Method for starting new game
     */
    startNewGame() {
        let state = this.gameTable.startNewGame();

        return state;
    }

    /**
     * Method for generating next step
     */
    nextStep(currentColor) {
        let state = this.gameTable.nextStep(currentColor);

        return state;
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

        this.props.dispatch(this.nextStep(currentChoose))
    }

    render() {
        const { game } = this.props;

        return (
            <div className="app flex-container">
                <Header newGame={this.newGameHandler} score={game.score} step={game.step} />
                <Content cols={this.cols} rows={this.rows} matrix={game.matrix} />
                <Footer listOfChoosers={this.listOfChoosers} nextStep={this.nextStepHandler} />
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