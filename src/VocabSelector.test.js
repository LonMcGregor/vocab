import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VocabSelector from "./VocabSelector";

configure({ adapter: new Adapter() });

it("renders correctly", () => {
    const vs = mount(<VocabSelector changed={() => {}}/>);
    expect(vs.text()).toBe("jp/Calendar.csvjp/Conversation.csvjp/Count.csvjp/FoodDrink.csvjp/Home.csvjp/Nature.csvjp/Particles.csvjp/People.csvjp/PoliteConversation.csvjp/SchoolSubjects.csvjp/Town.csv");
});
