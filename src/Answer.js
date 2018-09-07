import React, { Component } from "react";
import "./Answer.css";
import PropTypes from "prop-types";

class Answer extends Component {
    render() {
        return (
            <div className="answer">
                {this.props.word}
            </div>
        );
    }
}

Answer.propTypes = {
    word: PropTypes.string.isRequired
};

export default Answer;
