import Sack from "./Sack";
import CSVParser from "./CSVParser";

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 * https://stackoverflow.com/questions/6274339/
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const MAX_EXTRA_ANSWERS = 3;

class Vocab {
    constructor(){
        this.parser = new CSVParser();
    }

    loadVocab(){
        return this.parser.asArray("/csv/SchoolSubjects.csv")
            .then(vocabArray => {
                this.subjectSack = new Sack(vocabArray);
            });
    }

    nextWord() {
        const foreign = Math.floor(Math.random() * 2);
        const question = this.subjectSack.pick();
        const unshuffledChoices = [question[foreign]];
        const additionalChoices = this.subjectSack.peek(MAX_EXTRA_ANSWERS);
        additionalChoices.forEach(x => {
            unshuffledChoices.push(x[foreign]);
        });
        const shuffledChoices = shuffle(unshuffledChoices);
        return {
            test: question[(foreign + 1) % 2],
            answer: question[foreign],
            choices: shuffledChoices
        };
    }
}


export default Vocab;
