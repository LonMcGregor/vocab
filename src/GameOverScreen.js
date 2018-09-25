import React, { Component } from "react";
import "./GameOverScreen.css";
import PropTypes from "prop-types";

class GameOverScreen extends Component {
    render() {
        return (<div className="gameOver">
            <h1>Round Complete!</h1>
            <button className="restart" onClick={this.props.restart.bind(this)}>Start Again</button>
            <p>Your Score:{this.props.total}</p>
            <footer>Developed by <a href="https://github.com/LonMcGregor/vocab">LonMcGregor on GitHub</a></footer>
        </div>
        );
    }
}

GameOverScreen.propTypes = {
    restart: PropTypes.func.isRequired,
    total: PropTypes.number.isRequired,
};

export default GameOverScreen;
