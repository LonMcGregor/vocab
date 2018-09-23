import Vocab from "./Vocab";
import {VocabException, shuffle} from "./Vocab";

const testArray = [
    ["a","b"],
    ["c","d"],
    ["e","f"],
    ["g","h"],
    ["i","j"]
];

/* eslint-disable no-unused-vars */
it("fails to instance", () => {
    expect(() => {
        const v = new Vocab();
    }).toThrowError();
    expect(() => {
        const v = new Vocab(testArray);
    }).toThrowError();
    expect(() => {
        const v = new Vocab(testArray, -1);
    }).toThrowError();
    expect(() => {
        const v = new Vocab(testArray, 5);
    }).toThrowError();
    expect(() => {
        const v = new Vocab(testArray, 6);
    }).toThrowError();
});
/* eslint-enable no-unused-vars */

it("instances appropriately", () => {
    const v = new Vocab(testArray, 3);
    const word = v.nextWord();
    expect(v.currentWord).toBe(word);
});

it("gets correct number of choices", () => {
    const v = new Vocab(testArray, 2);
    const word = v.nextWord();
    expect(word.choices.length).toBe(3);

    const v2 = new Vocab(testArray, 0);
    const word2 = v2.nextWord();
    expect(word2.choices.length).toBe(1);
    expect(word2.answer).toEqual(word2.choices[0]);
});

it("doesnt offer the answer as a choice twice", () => {
    const v = new Vocab(testArray, testArray.length-1);
    for(let i = 0; i < testArray.length; i++){
        const word = v.nextWord();
        let foundAnswer = false;
        for(let c = 0; c < word.choices.length; c++){
            if(word.choices[c]===word.answer){
                if(foundAnswer){
                    expect(true).toBe(false);
                } else {
                    foundAnswer = true;
                }
            }
        }
        expect(foundAnswer).toEqual(true);
    }
});

it("gets next word properly", () => {
    const v = new Vocab([
        ["a","b"],
        ["c","d"]
    ], 0);
    const word = v.nextWord();
    const word2 = v.nextWord();
    expect([word.answer, word.test]).not.toContainEqual(word2.answer);
    expect([word.answer, word.test]).not.toContainEqual(word2.test);
});

it("alternates between foreign and not", () => {
    const v = new Vocab([
        ["0","1"],
        ["0","1"]
    ], 1);
    const word = v.nextWord();
    if(word.test==="0"){
        expect(word.answer).toEqual("1");
        expect(word.choices[0]).toEqual("1");
        expect(word.choices[1]).toEqual("1");
    } else {
        expect(word.answer).toEqual("0");
        expect(word.choices[0]).toEqual("0");
        expect(word.choices[1]).toEqual("0");
    }
});

it("excepts properly", () => {
    const e = new VocabException("byzantine");
    expect(e.toString()).toEqual("Vocab Exception: byzantine");
});

it("shuffles properly", () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(["a"])).toEqual(["a"]);
    expect(shuffle(["a","b"])).toContain("a");
    expect(shuffle(["a","b"])).toContain("b");
    expect(shuffle(["a","b"]).length).toEqual(2);
    expect(shuffle(["a","b","c"])).toContain("a");
    expect(shuffle(["a","b","c"])).toContain("b");
    expect(shuffle(["a","b","c"])).toContain("c");
    expect(shuffle(["a","b","c"]).length).toEqual(3);
    expect(shuffle(["a","b","c","d","e"])).toContain("a");
    expect(shuffle(["a","b","c","d","e"])).toContain("b");
    expect(shuffle(["a","b","c","d","e"])).toContain("c");
    expect(shuffle(["a","b","c","d","e"])).toContain("d");
    expect(shuffle(["a","b","c","d","e"])).toContain("e");
    expect(shuffle(testArray).length).toEqual(5);
});

it("can restart", () => {
    const v = new Vocab([
        ["0","0"],
        ["2","2"]
    ], 0);
    const words = [v.nextWord(), v.nextWord()];
    expect(() => {v.nextWord();}).toThrow();
    v.restartVocab();
    const words2 = [v.nextWord(), v.nextWord()];
    expect(words2).toContainEqual(words[0]);
    expect(words2).toContainEqual(words[1]);
});

it("says how many are left", () => {
    const v = new Vocab([
        ["0","0"],
        ["2","2"]
    ], 0);
    expect(v.remainingWords()).toBe(2);
    v.nextWord();
    expect(v.remainingWords()).toBe(1);
    v.nextWord();
    expect(v.remainingWords()).toBe(0);
});
