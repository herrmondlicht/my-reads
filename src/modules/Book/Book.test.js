import React from 'react'
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import Book from './Book';

configure({adapter: new Adapter()});

describe("Componente Book", () => {
	test("que deve renderizar um componente",() => {
		expect(typeof Book).toBe('function')
	});
})