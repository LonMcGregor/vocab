import React from "react";
import ReactDOM from "react-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Board from "./Board";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    fetch.resetMocks();
    fetch.mockResponse(`a,b
c,d
e,f
g,h
i,j`);
    const div = document.createElement("div");
    ReactDOM.render(<Board />, div);
    ReactDOM.unmountComponentAtNode(div);
});

/*
it("handles clicks correctly", () => {
    fetch.resetMocks();
    fetch.mockResponse(`a,b
c,d
e,f
g,h
i,j`);
    const board = mount(<Board />);
    expect(board.state().total).toEqual(0);
    expect(board.state().correct).toEqual(0);
    const pretext = board.render().find(".flashcard").text();
    expect(board.render().find(".correctCount").text()).toEqual("0");
    //board.find(".answer:not(.correct)").simulate("click");
    expect(board.state().total).toEqual(1);
    expect(board.state().correct).toEqual(0);
    expect(board.render().find(".flashcard").text()).not.toEqual(pretext);
    //board.find(".answer.correct").simulate("click");
    expect(board.state().total).toEqual(2);
    expect(board.state().correct).toEqual(1);
});
*/
