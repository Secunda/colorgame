import React from "react"
import { connect } from 'react-redux'

import Header from "./Header"
import Footer from "./Footer"
import Content from "./Content"

import Table from "../core/Table"

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

    startNewGame() {
        let state = this.gameTable.startNewGame();
        this.matrix = state.matrix;

        return state;
    }

    nextStep() {
        let state = this.gameTable.nextStep();
        this.matrix = state.matrix;

        return state;
    }

    newGameHandler = (e) => {
        e.preventDefault();

        this.props.dispatch(this.startNewGame())
    }

    nextStepHandler = (e) => {
        e.preventDefault();

        this.props.dispatch(this.nextStep())
    }

    render() {
        return (
            <div className="App">
                <Header newGame={this.newGameHandler} />
                <Content cols={this.cols} rows={this.rows} matrix={this.matrix} />
                <Footer listOfChoosers={this.listOfChoosers} nextStep={this.nextStepHandler} />
            </div>
        );
    };
}

function mapStateToProps (state) {
  return {
    game: {}
  }
}

export default connect(mapStateToProps)(Layout)