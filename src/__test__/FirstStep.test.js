import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FlatInfo from "../components/FlatSteps/FlatInfo";
import {shallow} from "enzyme";

Enzyme.configure({adapter: new Adapter() });

describe('Flat Info', () => {
    it('fills in something' , () => {
        const wrapper = shallow(<FlatInfo/>)
    })
})