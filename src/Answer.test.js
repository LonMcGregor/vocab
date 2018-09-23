import React from "react";
import ReactDOM from "react-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Answer from "./Answer";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Answer word="word" isCorrect={false} selected={false} answerChosen={()=>{}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("sets correct class name properly", () => {
    const answer = mount(<Answer word="word" isCorrect={true} selected={true} answerChosen={()=>{}}/>);
    expect(answer.getDOMNode().classList.contains("correct")).toBe(true);
    expect(answer.getDOMNode().classList.contains("incorrect")).toBe(false);
    expect(answer.getDOMNode().classList.contains("selected")).toBe(true);
});

it("doesnt sets correct class name when not needed", () => {
    const answer = mount(<Answer word="word" isCorrect={false} selected={false} answerChosen={()=>{}}/>);
    expect(answer.getDOMNode().classList.contains("correct")).toBe(false);
    expect(answer.getDOMNode().classList.contains("incorrect")).toBe(true);
    expect(answer.getDOMNode().classList.contains("selected")).toBe(false);
});

it("responds to clicks properly", () => {
    const mockCallback = jest.fn();

    const answer = mount(<Answer word="word" isCorrect={false} selected={false} answerChosen={mockCallback}/>);
    answer.find("div").simulate("click");
    expect(mockCallback.mock.calls.length).toBe(1);

    const answer2 = mount(<Answer word="word" isCorrect={true} selected={false} answerChosen={mockCallback}/>);
    answer2.find("div").simulate("click");
    expect(mockCallback.mock.calls.length).toBe(2);
});
