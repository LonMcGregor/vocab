import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GameOverScreen from "./GameOverScreen";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
    const sb = mount(<GameOverScreen restart={() => {}} total={33} />);
    expect(sb.text()).toEqual("Round Complete!Start AgainYour Score:33Developed by LonMcGregor on GitHub");
});
