import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import StatusBar from "./StatusBar";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
    const sb = mount(<StatusBar pointsAvailable={22} total={33} />);
    expect(sb.find(".pointsAvailable").text()).toEqual("22");
    expect(sb.find(".totalCount").text()).toEqual("33");
});
