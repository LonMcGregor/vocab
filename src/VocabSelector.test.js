import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VocabSelector from "./VocabSelector";
import {vocabs} from "./AvailableVocab";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
    const vs = mount(<VocabSelector changed={() => {}}/>);
    const expected = vocabs.join("");
    expect(vs.text()).toBe(expected);
});
