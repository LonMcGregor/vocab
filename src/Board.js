import React, { Component } from "react";
import "./Board.css";
import Flashcard from "./Flashcard";
import Answer from "./Answer";
import Vocab from "./Vocab";
import StatusBar from "./StatusBar";

class Board extends Component {

    constructor(props){
        super(props);
        this.state = {
            ready: false,
            correct: 0,
            total: 0
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

    answerSelected(isCorrect){
        this.state.vocab.nextWord();
        this.setState({
            correct: isCorrect ? this.state.correct+1 : this.state.correct,
            total: this.state.total + 1
        });
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
                            <Answer key={choice} word={choice} isCorrect={choice===v.answer} answerChosen={this.answerSelected.bind(this)} />
                        ))
                    }
                </React.Fragment>
                <StatusBar correct={this.state.correct} total={this.state.total} />
            </div>
        );
    }
}

export default Board;
