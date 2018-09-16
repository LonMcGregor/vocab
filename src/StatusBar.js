import React, { Component } from "react";
import "./StatusBar.css";
import PropTypes from "prop-types";

class StatusBar extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <footer className="statusbar">
                <div className="tracker">Got <span className="correctCount">{this.props.correct}</span> correct, out of <span className="totalCount">{this.props.total}</span> so far</div>
                <div className="info">Developed by <a href="https://github.com/LonMcGregor/vocab">LonMcGregor on GitHub</a></div>
            </footer>
        );
    }
}

StatusBar.propTypes = {
    correct: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};


export default StatusBar;
