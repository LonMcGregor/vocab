import React, { Component } from "react";
import "./Board.css";
import Flashcard from "./Flashcard";
import Answer from "./Answer";
import StatusBar from "./StatusBar";
import VocabGame from "./VocabGame";
import PropTypes from "prop-types";
import GameOverScreen from "./GameOverScreen";

class Board extends Component {

    constructor(props){
        super(props);
        document.addEventListener("vocabGameLoad", this.gameLoaded.bind(this));
        this.state = {vocabGame: props.vocabGame};
        if(!this.state.vocabGame.ready){
            this.state.vocabGame.setVocab("/csv/SchoolSubjects.csv");
        }
    }

    gameLoaded(){
        this.state.vocabGame.nextQuestion();
        this.forceUpdate();
    }

    answerSelected(choiceId){
        if(this.state.vocabGame.selectAnswer(choiceId)){
            this.state.vocabGame.nextQuestion();
        }
        this.forceUpdate();
    }

    gameComplete(){
        this.state.vocabGame.restartVocab();
        this.state.vocabGame.resetScore();
        this.state.vocabGame.nextQuestion();
        this.forceUpdate();
    }

    render() {
        if(!this.state.vocabGame.ready){
            return (<div className="board">
                <span>Loading...</span>
            </div>);
        }
        if(this.state.vocabGame.vocabFinished){
            return (<GameOverScreen restart={this.gameComplete.bind(this)} total={this.state.vocabGame.score} />);
        }
        return (
            <div className="board">
                <Flashcard word={this.state.vocabGame.challenge}/>
                <React.Fragment>
                    {
                        this.state.vocabGame.choices.map(choice => (
                            <Answer key={choice.id} selected={choice.selected} word={choice.value} isCorrect={choice.isCorrect} answerChosen={this.answerSelected.bind(this, choice.id)} />
                        ))
                    }
                </React.Fragment>
                <StatusBar pointsAvailable={this.state.vocabGame.availablePoints} total={this.state.vocabGame.score} />
            </div>
        );
    }
}

Board.propTypes = {
    vocabGame: PropTypes.instanceOf(VocabGame)
};

Board.defaultProps = {
    vocabGame: new VocabGame()
};

export default Board;
