import React, { Component } from "react";
import "./Flashcard.css";
import PropTypes from "prop-types";

class Flashcard extends Component {
    render() {
        return (
            <div className="flashcard">
                {this.props.word}
            </div>
        );
    }
}

Flashcard.propTypes = {
    word: PropTypes.string.isRequired
};

export default Flashcard;
