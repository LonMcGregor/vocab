import Sack from "./Sack";

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * https://stackoverflow.com/questions/6274339/
 */
export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export class VocabException {
    constructor(msg){
        this.msg = msg;
    }

    toString(){
        return "Vocab Exception: "+this.msg;
    }
}


class Vocab {
    constructor(vocabArray, numberAdditionalChoices){
        if(!vocabArray){
            throw new VocabException("Must specify a vocab array.");
        }
        if(isNaN(numberAdditionalChoices)){
            throw new VocabException("Must specify number of additional choices.");
        }
        if(numberAdditionalChoices < 0 || numberAdditionalChoices >= vocabArray.length){
            throw new VocabException("Choices must be zero or more.");
        }
        if(vocabArray.length < numberAdditionalChoices + 1){
            throw new VocabException("Array must have at least as many elements as choices + 1");
        }
        this._wordSack = new Sack(vocabArray);
        this._numberAdditionalChoices = numberAdditionalChoices;
    }

    _genChoices(question, foreign){
        const unshuffledChoices = [question[foreign]];
        let additionalChoices = [];
        if(this._numberAdditionalChoices > 0){
            additionalChoices = this._wordSack.peekAll(this._numberAdditionalChoices+1);
            const dupeQuestion = additionalChoices.indexOf(question);
            for(let i = 0; i < ((dupeQuestion>=0) ? additionalChoices.length : additionalChoices.length - 1); i++){
                if(i===dupeQuestion){
                    continue;
                }
                unshuffledChoices.push(additionalChoices[i][foreign]);
            }
        }
        return shuffle(unshuffledChoices);
    }

    nextWord() {
        const foreign = Math.floor(Math.random() * 2);
        const question = this._wordSack.pick();
        const shuffledChoices = this._genChoices(question, foreign);
        this.currentWord =  {
            test: question[(foreign + 1) % 2],
            answer: question[foreign],
            choices: shuffledChoices
        };
        return this.currentWord;
    }

    remainingWords(){
        return this._wordSack.size(true);
    }

    restartVocab() {
        this._wordSack.reshuffle();
    }
}


export default Vocab;
