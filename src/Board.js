import React, { Component } from "react";
import "./Board.css";
import Flashcard from "./Flashcard";
import Answer from "./Answer";
import Vocab from "./Vocab";

class Board extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: false
        };
    }

    componentDidMount() {
        const v = new Vocab();
        v.loadVocab()
            .then(() => {
                if(this.isCancelled){
                    return;
                }
                this.setState({
                    ready: true,
                    vocab: v
                });
            });
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    render() {
        if(!this.state.ready){
            return (<div className="board">
                <span>Loading vocab...</span>
            </div>);
        }
        const v = this.state.vocab.nextWord();
        return (
            <div className="board">
                <Flashcard word={v.test}/>
                <React.Fragment>
                    {
                        v.choices.map(choice => (
                            <Answer key={choice} word={choice} isCorrect={choice===v.answer}/>
                        ))
                    }
                </React.Fragment>
            </div>
        );
    }
}

export default Board;
