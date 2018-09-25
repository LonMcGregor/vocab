import React from "react";
import ReactDOM from "react-dom";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import QuestionDone from "./QuestionDone";

configure({ adapter: new Adapter() });

it("init", () => {
    const qd = mount(<QuestionDone points={-1} close={jest.fn()}/>);
    expect(qd.text()).toEqual("CorrectYou got -1 pointsNext Question");
    const qd2 = mount(<QuestionDone points={0} close={jest.fn()}/>);
    expect(qd2.text()).toEqual("CorrectYou got 0 pointsNext Question");
    const qd3 = mount(<QuestionDone points={1} close={jest.fn()}/>);
    expect(qd3.text()).toEqual("Well Done!You got 1 pointNext Question");
    const qd4 = mount(<QuestionDone points={2} close={jest.fn()}/>);
    expect(qd4.text()).toEqual("Well Done!You got 2 pointsNext Question");
});
