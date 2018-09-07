import React, { Component } from "react";
import "./Answer.css";
import PropTypes from "prop-types";

class Answer extends Component {
    render() {
        const className = "answer " + (this.props.isCorrect ? "correct" : "");
        return (
            <div className={className}>
                {this.props.word}
            </div>
        );
    }
}

Answer.propTypes = {
    word: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired
};

export default Answer;
