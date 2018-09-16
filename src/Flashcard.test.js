import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Flashcard from "./Flashcard";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
    const sb = mount(<Flashcard word="byzantine" />);
    expect(sb.find(".flashcard").text()).toEqual("byzantine");
});
