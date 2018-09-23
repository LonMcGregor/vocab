import VocabGame from "./VocabGame";

const mockInput = `a,b
c,d
e,f
g,h
i,j
k,l
`;
const mockMapAnswers = {
    "a": "b",
    "c": "d",
    "e": "f",
    "g": "h",
    "i": "j",
    "k": "l",
    "b": "a",
    "d": "c",
    "f": "e",
    "h": "g",
    "j": "i",
    "l": "k"
};

it("notifies when game loaded", async () => {
    const vg = new VocabGame();
    const evt = jest.fn();
    document.addEventListener("vocabGameLoad", evt);
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    expect(evt).toHaveBeenCalled();
    expect(vg.challenge).toBe("");
    expect(vg.choices).toEqual([]);
});

it("can reset score", () => {
    const vg = new VocabGame();
    vg.score = 22222;
    vg.resetScore();
    expect(vg.score).toBe(0);
});

it("can restart current vocab set", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    const round1 = [];
    vg.nextQuestion();
    round1.push(vg.challenge);
    round1.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round1.push(vg.challenge);
    round1.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round1.push(vg.challenge);
    round1.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round1.push(vg.challenge);
    round1.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round1.push(vg.challenge);
    round1.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round1.push(vg.challenge);
    round1.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    expect(vg.vocabFinished).toBe(true);
    vg.restartVocab();
    expect(vg.vocabFinished).toBe(false);
    const round2 = [];
    vg.nextQuestion();
    round2.push(vg.challenge);
    round2.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round2.push(vg.challenge);
    round2.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round2.push(vg.challenge);
    round2.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round2.push(vg.challenge);
    round2.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round2.push(vg.challenge);
    round2.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    round2.push(vg.challenge);
    round2.push(vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge][0])[0].value);
    vg.nextQuestion();
    expect(vg.vocabFinished).toBe(true);
    round1.sort();
    round2.sort();
    expect(round1).toEqual(round2);
});

it("can move to next question", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    vg.nextQuestion();
    const c1 = vg.challenge;
    const c2 = vg.choices;
    vg.nextQuestion();
    expect(vg.challenge).not.toBe(c1);
    const c3 = vg.choices;
    c2.sort();
    c3.sort();
    expect(c3).not.toEqual(c2);
});

it("notifies when vocab set is finished", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    expect(vg.nextQuestion()).toBe(true);
    expect(vg.vocabFinished).toBe(false);
    expect(vg.nextQuestion()).toBe(true);
    expect(vg.vocabFinished).toBe(false);
    expect(vg.nextQuestion()).toBe(true);
    expect(vg.vocabFinished).toBe(false);
    expect(vg.nextQuestion()).toBe(true);
    expect(vg.vocabFinished).toBe(false);
    expect(vg.nextQuestion()).toBe(true);
    expect(vg.vocabFinished).toBe(false);
    expect(vg.nextQuestion()).toBe(true);
    expect(vg.vocabFinished).toBe(false);
    expect(vg.nextQuestion()).toBe(false);
    expect(vg.challenge).toBe("");
    expect(vg.availablePoints).toBe(0);
    expect(vg.vocabFinished).toBe(true);
    expect(vg.nextQuestion()).toBe(false);
    expect(vg.challenge).toBe("");
    expect(vg.availablePoints).toBe(0);
    expect(vg.vocabFinished).toBe(true);
});

it("selects a correct answer", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    vg.nextQuestion();
    const correct = vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge]);
    expect(correct[0].selected).toBe(false);
    expect(vg.selectAnswer(correct[0].id)).toBe(true);
    expect(vg.score).toBe(10);
    const correct2 = vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge]);
    expect(correct2[0].selected).toBe(true);
});

it("selects a wrong answer", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    vg.nextQuestion();
    const incorrect = vg.choices.filter(x => x.value!==mockMapAnswers[vg.challenge]);
    const correct = vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge]);
    expect(vg.availablePoints).toBe(10);
    expect(incorrect[0].selected).toBe(false);
    expect(vg.selectAnswer(incorrect[0].id)).toBe(false);
    expect(vg.availablePoints).toBe(5);
    expect(vg.score).toBe(0);
    const incorrect2 = vg.choices.filter(x => x.value!==mockMapAnswers[vg.challenge]);
    expect(incorrect2[0].selected).toBe(true);
    expect(vg.selectAnswer(correct[0].id)).toBe(true);
    expect(vg.availablePoints).toBe(5);
    expect(vg.score).toBe(5);
});

it("selects a wrong answer twice", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    vg.nextQuestion();
    const incorrect = vg.choices.filter(x => x.value!==mockMapAnswers[vg.challenge]);
    const correct = vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge]);
    expect(vg.availablePoints).toBe(10);
    expect(vg.selectAnswer(incorrect[0].id)).toBe(false);
    expect(vg.availablePoints).toBe(5);
    expect(vg.score).toBe(0);
    expect(vg.selectAnswer(incorrect[1].id)).toBe(false);
    expect(vg.availablePoints).toBe(0);
    expect(vg.score).toBe(0);
    expect(vg.selectAnswer(correct[0].id)).toBe(true);
    expect(vg.availablePoints).toBe(0);
    expect(vg.score).toBe(0);
});

it("selects a wrong answer thrice", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    vg.nextQuestion();
    const incorrect = vg.choices.filter(x => x.value!==mockMapAnswers[vg.challenge]);
    const correct = vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge]);
    expect(vg.availablePoints).toBe(10);
    expect(vg.selectAnswer(incorrect[0].id)).toBe(false);
    expect(vg.availablePoints).toBe(5);
    expect(vg.score).toBe(0);
    expect(vg.selectAnswer(incorrect[1].id)).toBe(false);
    expect(vg.availablePoints).toBe(0);
    expect(vg.score).toBe(0);
    expect(vg.selectAnswer(incorrect[2].id)).toBe(false);
    expect(vg.availablePoints).toBe(-5);
    expect(vg.score).toBe(0);
    expect(vg.selectAnswer(correct[0].id)).toBe(true);
    expect(vg.availablePoints).toBe(-5);
    expect(vg.score).toBe(-5);
});

it("selects the same wrong answer multiple times", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    vg.nextQuestion();
    const incorrect = vg.choices.filter(x => x.value!==mockMapAnswers[vg.challenge]);
    const correct = vg.choices.filter(x => x.value===mockMapAnswers[vg.challenge]);
    expect(vg.availablePoints).toBe(10);
    expect(vg.selectAnswer(incorrect[0].id)).toBe(false);
    expect(vg.availablePoints).toBe(5);
    expect(vg.score).toBe(0);
    expect(vg.selectAnswer(incorrect[0].id)).toBe(false);
    expect(vg.availablePoints).toBe(5);
    expect(vg.score).toBe(0);
    expect(vg.selectAnswer(correct[0].id)).toBe(true);
    expect(vg.availablePoints).toBe(5);
    expect(vg.score).toBe(5);
});

it("offers choices", async () => {
    const vg = new VocabGame();
    fetch.resetMocks();
    fetch.mockResponse(mockInput);
    await vg.setVocab("stuff");
    vg.nextQuestion();
    const c = vg.choices;
    expect(c).toHaveLength(4);
    let foundCorrect = 0;
    const uniqueIds = [];
    for(let i = 0; i < c.length; i++){
        expect(uniqueIds.indexOf(c[i].id)).toBe(-1);
        uniqueIds.push(c[i].id);
        if(c[i].isCorrect){
            foundCorrect += 1;
            expect(c[i].value).toBe(mockMapAnswers[vg.challenge]);
        } else {
            expect(c[i].value).not.toBe(mockMapAnswers[vg.challenge]);
        }
    }
    expect(foundCorrect).toBe(1);
});

it("nothing if answer when no choices available", () => {
    const vg = new VocabGame();
    expect(vg.selectAnswer(2)).toBeUndefined();
});
