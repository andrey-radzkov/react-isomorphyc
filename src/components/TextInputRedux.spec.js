import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {expect} from "chai";
import {TextInputRedux} from "./TextInputRedux";
configure({adapter: new Adapter()});
//TODO: TestUtils have been moved to react-dom/test-utils
//TODO: run via idea
describe('<TextInputRedux/>', () => {
  describe('<TextInputRedux/>', () => {
    it('should return empty data and LOAD_SUPPLIER type', () => {
      const wrapper = shallow(<TextInputRedux meta={{}}/>);
      const actual = wrapper.find('FormGroup');
      console.log(actual); // View shallowly rendered component

      expect(actual).to.have.length(1);
    });
  });

});
