import React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FirstStep from "../components/FirstStep";
import {shallow} from "enzyme";

Enzyme.configure({adapter: new Adapter() });


describe('First Step', () => {
    it('fills in something' , () => {
    })
})