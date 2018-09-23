import React, { Component } from "react";
import "./VocabSelector.css";
import {defaultVocab, vocabs} from "./AvailableVocab";
import PropTypes from "prop-types";

class VocabSelector extends Component {
    changed(event){
        this.props.changed(event.target.value);
    }

    render() {
        return (
            <div>
                <select name="selectedVocab" onChange={(e)=>{this.changed(e);}} value={this.props.selection}>
                    <React.Fragment>
                        {
                            vocabs.map(vocab => (
                                <option key={vocab} value={vocab}>{vocab}</option>
                            ))
                        }
                    </React.Fragment>
                </select>
            </div>
        );
    }
}

VocabSelector.propTypes = {
    changed: PropTypes.func.isRequired,
    selection: PropTypes.string
};

VocabSelector.defaultProps = {
    selection: defaultVocab
};

export default VocabSelector;
