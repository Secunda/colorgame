import React from "react"

import Header from "./Header"
import Footer from "./Footer"
import Content from "./Content"

export default class Layout extends React.Component {
    render() {
        const listOfChoosers = ['cl1', 'cl2', 'cl3', 'cl4', 'cl5', 'cl6', 'cl7'];

        return (
            <div className="App">
                <Header />
                <Content listOfChoosers={listOfChoosers} />
                <Footer listOfChoosers={listOfChoosers} />
            </div>
        );
    };
}