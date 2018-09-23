import React, { Component } from "react";
import "./StatusBar.css";
import PropTypes from "prop-types";

class StatusBar extends Component {
    render() {
        return (
            <footer className="statusbar">
                <div className="tracker">Points for this question: <span className="pointsAvailable">{this.props.pointsAvailable}</span>... Total: <span className="totalCount">{this.props.total}</span></div>
                <div className="info">Developed by <a href="https://github.com/LonMcGregor/vocab">LonMcGregor on GitHub</a></div>
            </footer>
        );
    }
}

StatusBar.propTypes = {
    pointsAvailable: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};


export default StatusBar;
