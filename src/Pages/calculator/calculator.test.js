import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr } from "../../../test/testUtils";
import Calculator from "./calculator";

const setup = () => {
  return shallow(<Calculator />);
};

test("renders without error", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "component-calculator");
  expect(component.length).toBe(1);
});
