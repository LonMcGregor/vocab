import React from "react";
import ReactDOM from "react-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Answer from "./Answer";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Answer word="word" isCorrect={false}/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

it("sets correct class name properly", () => {
    const answer = mount(<Answer word="word" isCorrect={true}/>);
    expect(answer.getDOMNode().classList.contains("correct")).toBe(true);
});

it("doesnt sets correct class name when not needed", () => {
    const answer = mount(<Answer word="word" isCorrect={false}/>);
    expect(answer.getDOMNode().classList.contains("correct")).toBe(false);
});
