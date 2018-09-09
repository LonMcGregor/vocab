import React from "react";
import ReactDOM from "react-dom";
import { configure } from "enzyme";
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
