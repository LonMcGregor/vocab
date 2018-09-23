import React, { Component } from "react";
import "./Answer.css";
import PropTypes from "prop-types";

class Answer extends Component {
    render() {
        const className = "answer" + (this.props.isCorrect ? " correct" : " incorrect") + (this.props.selected ? " selected" : "");
        return (
            <div className={className}  onClick={this.props.answerChosen.bind(this)}>
                {this.props.word}
            </div>
        );
    }
}

Answer.propTypes = {
    word: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
    answerChosen: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired
};

export default Answer;
