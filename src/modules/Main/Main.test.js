import Main from "../Main";
import {stub, assert} from 'sinon'
import { shallow } from "../../testRender";

describe('Main', () => {
  test('must render a function', () =>{
    expect(typeof Main).toBe('function');
  })
})