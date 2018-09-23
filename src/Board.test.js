import React from "react";
import ReactDOM from "react-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Board from "./Board";
import VocabGame from "./VocabGame";

configure({ adapter: new Adapter() });

it("init", () => {
    const vg = new VocabGame();
    vg.setVocab = jest.fn();
    const board = mount(<Board vocabGame={vg}/>);
    expect(board.text()).toEqual("Loading...");
});

it("renders properly", () => {
    const vg = new VocabGame();
    vg.setVocab = jest.fn();
    vg.ready = true;
    vg.challenge = "byzantine";
    vg.choices = [
        {
            id: "1",
            isCorrect: true,
            value: "an option",
            selected: false
        },
        {
            id: "2",
            isCorrect: false,
            value: "other option",
            selected: false
        },
        {
            id: "3",
            isCorrect: false,
            value: "with option",
            selected: false
        },
    ];
    vg.score = 987;
    vg.availablePoints = 22;
    const board = mount(<Board vocabGame={vg}/>);
    expect(board.text()).toEqual("byzantinean optionother optionwith optionPoints for this question: 22... Total: 987Developed by LonMcGregor on GitHub");
});

it("says when game is over", () => {
    const vg = new VocabGame();
    vg.setVocab = jest.fn();
    vg.ready = true;
    vg.score = 987;
    vg.availablePoints = 22;
    vg.vocabFinished = true;
    const board = mount(<Board vocabGame={vg}/>);
    expect(board.text()).toEqual("Round Complete!Start AgainYour Score:987Developed by LonMcGregor on GitHub");
});
