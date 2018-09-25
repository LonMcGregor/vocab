import React, { Component } from "react";
import "./Board.css";
import Flashcard from "./Flashcard";
import Answer from "./Answer";
import StatusBar from "./StatusBar";
import VocabGame from "./VocabGame";
import PropTypes from "prop-types";
import GameOverScreen from "./GameOverScreen";
import VocabSelector from "./VocabSelector";
import QuestionDone from "./QuestionDone";

class Board extends Component {

    constructor(props){
        super(props);
        document.addEventListener("vocabGameLoad", this.gameLoaded.bind(this));
        this.state = {
            vocabGame: props.vocabGame,
            answerSubmitted: false,
            night: window.location.href.indexOf("nm") > -1
        };
        if(!this.state.vocabGame.ready){
            this.state.vocabGame.setVocab(this.state.vocabGame.vocabSelection);
        }
    }

    vocabSelected(selection){
        this.state.vocabGame.setVocab(selection);
        this.forceUpdate();
    }

    gameLoaded(){
        this.state.vocabGame.nextQuestion();
        this.forceUpdate();
    }

    nextQuestion(){
        this.state.vocabGame.nextQuestion();
        this.setState({answerSubmitted: false});
    }

    answerSelected(choiceId){
        if(this.state.vocabGame.selectAnswer(choiceId)){
            this.setState({answerSubmitted: true});
        } else {
            this.forceUpdate();
        }
    }

    gameComplete(){
        this.state.vocabGame.restartVocab();
        this.state.vocabGame.resetScore();
        this.state.vocabGame.nextQuestion();
        this.forceUpdate();
    }

    getStyle(){
        return this.state.night ? {
            "--bg": "black",
            "--bgdim": "#1f1f1f",
            "--fg": "white",
            "--a1fg": "turquoise",
            "--a1bg": "teal",
            "--a2fg": "green",
            "--a2bg": "greenyellow"
        } : {
            "--bg": "white",
            "--bgdim": "#efefef",
            "--fg": "black",
            "--a1fg": "teal",
            "--a1bg": "turquoise",
            "--a2fg": "greenyellow",
            "--a2bg": "green"
        };
    }

    swapTheme(){
        this.setState({night: !this.state.night});
    }

    render() {
        const theme = this.getStyle(); /*?
            "--bg:black; --fg:white; --accent1fg: teal; --accent1bg: turquoise; --accent2fg: green; --accent2bg: greenyellow" :
            "--bg:white; --fg:black; --accent1fg: turquoise; --accent1bg: teal; --accent2fg: greenyellow; --accent2bg: green";*/
        if(!this.state.vocabGame.ready){
            return (<div className="board" style={theme}>
                <span>Loading...</span>
            </div>);
        }
        if(this.state.vocabGame.vocabFinished){
            return (<div style={theme}>
                <GameOverScreen restart={this.gameComplete.bind(this)} total={this.state.vocabGame.score} />
            </div>);
        }
        const done = this.state.answerSubmitted ? <QuestionDone points={this.state.vocabGame.availablePoints} close={this.nextQuestion.bind(this)} /> : <div/>;
        return (
            <div className="board" style={theme} onDoubleClick={this.swapTheme.bind(this)}>
                <Flashcard word={this.state.vocabGame.challenge}/>
                <div className="choices">
                    <React.Fragment>
                        {
                            this.state.vocabGame.choices.map(choice => (
                                <Answer key={choice.id} selected={choice.selected} word={choice.value} isCorrect={choice.isCorrect} answerChosen={this.answerSelected.bind(this, choice.id)} />
                            ))
                        }
                    </React.Fragment>
                </div>
                <VocabSelector changed={this.vocabSelected.bind(this)} selection={this.state.vocabGame.vocabSelection} />
                <StatusBar pointsAvailable={this.state.vocabGame.availablePoints} total={this.state.vocabGame.score} />
                {done}
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
