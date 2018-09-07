
const SchoolSubjects = [
    "すうがく", "Maths",
    "れきし", "History",
    "ちり", "Geography",
    "りか", "Science",
    "たいいく", "P.E.",
    "こくご", "Japanese"
];

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
    nextWord() {
        const random = Math.floor((Math.random() * 100) % SchoolSubjects.length);
        const selection = SchoolSubjects[random];
        let answerIndex = (random % 2) ? random - 1 : random + 1;
        const answer = SchoolSubjects[(answerIndex)];
        const unshuffledChoices = [answer];
        for(let i = 0; i < MAX_EXTRA_ANSWERS; i++){
            answerIndex += 2;
            answerIndex = answerIndex % SchoolSubjects.length;
            unshuffledChoices.push(SchoolSubjects[(answerIndex)]);
        }
        const shuffledChoices = shuffle(unshuffledChoices);
        return {
            test: selection,
            answer: answer,
            choices: shuffledChoices
        };
    }
}

export default Vocab;
