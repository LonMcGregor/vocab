import React, { Component } from "react";
import "./QuestionDone.css";
import PropTypes from "prop-types";

class QuestionDone extends Component {
    render() {
        const congrats = this.props.points > 0 ? <p>Well Done!</p> : <p>Correct</p>;
        const points = this.props.points === 1 ? <p>You got 1 point</p> : <p>You got {this.props.points} points</p>;
        return (
            <div className="questionDone" onClick={this.props.close.bind(this)}>
                <div className="shadow"></div>
                <div className="modal">
                    {congrats}
                    {points}
                    <button>Next Question</button>
                </div>
            </div>
        );
    }
}

QuestionDone.propTypes = {
    close: PropTypes.func.isRequired,
    points: PropTypes.number.isRequired
};

export default QuestionDone;
