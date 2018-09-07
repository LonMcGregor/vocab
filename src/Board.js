import React, { Component } from "react";
import "./Board.css";
import Flashcard from "./Flashcard";
import Answer from "./Answer";
import Vocab from "./Vocab";

class Board extends Component {

    constructor(props){
        super(props);
        this.state = {
            vocab: new Vocab()
        };
    }

    render() {
        const v = this.state.vocab.nextWord();
        return (
            <div className="board">
                <Flashcard word={v.test}/>
                <React.Fragment>
                    {
                        v.choices.map(choice => (
                            <Answer key={choice} word={choice} />
                        ))
                    }
                </React.Fragment>
            </div>
        );
    }
}

export default Board;
