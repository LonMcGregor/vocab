import Vocab from "./Vocab";
import CSVParser from "./CSVParser";
import {defaultVocab} from "./AvailableVocab";

export default class VocabGame{
    constructor(){
        this.ready = false;
        this._csvp = new CSVParser();
        this.challenge = "";
        this.choices = [];
        this.score = 0;
        this.availablePoints = 0;
        this.vocabSelection = defaultVocab;
    }

    _gameLoaded(){
        this.ready = true;
        document.dispatchEvent(new Event("vocabGameLoad"));
    }

    resetScore(){
        this.score = 0;
    }

    setVocab(uri){
        this.ready = false;
        this.vocabSelection = uri;
        return this._csvp.asArray(this.vocabSelection)
            .then(vocabArray => {
                this._vocab = new Vocab(vocabArray, 3);
                this.challenge = "";
                this.choices = [];
                this.resetScore();
                this._gameLoaded();
            });
    }

    restartVocab(){
        this._vocab.restartVocab();
        this.vocabFinished = this._vocab.remainingWords()===0;
    }

    nextQuestion(){
        if(this._vocab.remainingWords()===0){
            this.vocabFinished = true;
            this.availablePoints = 0;
            this.challenge = "";
            this.choices = [];
            return false;
        }
        this.vocabFinished = false;
        const question = this._vocab.nextWord();
        this.availablePoints = 10;
        this.challenge = question.test;
        this.choices = [];
        let choiceIndex = 0;
        question.choices.forEach(x => {
            this.choices.push({
                id: "choice"+(++choiceIndex),
                value: x,
                isCorrect: x===question.answer,
                selected: false
            });
        });
        return true;
    }

    selectAnswer(answerId){
        if(this.choices.length===0){
            return;
        }
        for(let i = 0; i < this.choices.length; i++){
            const chosen = this.choices[i];
            if(chosen.id!==answerId){
                continue;
            }
            if(chosen.selected){
                return chosen.isCorrect;
            }
            this.choices[i].selected = true;
            if(chosen.isCorrect){
                this.score += this.availablePoints;
                return true;
            } else {
                this.availablePoints -= 5;
                return false;
            }
        }
    }
}
