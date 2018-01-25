import React from 'react';
import { shallow } from "../../testRender";
import Book from './Book';
import { assert, stub } from "sinon";

describe("Componente Book", () => {
	const defaultProps = {
		changeBookStatus:jest.fn(),
		reloadBooks: jest.fn(),
		bookObject:{
			imageLinks:{
				thumbnail:'imageURL',
			},
			title:"title",
			subtitle:"subtitle"
		}
	}

	beforeEach(()=> {
		defaultProps.changeBookStatus.mockReset()
	})

	test("must render a Book component", () => {
		expect(typeof Book).toBe('function')
	});

	test("must render a ManageMenu component", () => {
		const wrapper = shallow(Book).withProps({...defaultProps});
		expect(wrapper.find('ManageMenu').length).toBe(1)
	});

	test("must render an img", () => {
		const wrapper = shallow(Book).withProps({...defaultProps});
		expect(wrapper.find('img').length).toBe(1);
	});

	test("must render a loading if isFetching is true", () => {
		const wrapper = shallow(Book).withProps({...defaultProps});
		wrapper.setState({isFetching:true});
		expect(wrapper.find('Loading').length).toBe(1);
	});

	test("must have check element AND not have the ManageMenu if selectionFunction is passed", () => {
		const stub_onCheck = jest.fn()
		, wrapper = shallow(Book).withProps({...defaultProps, selectionFunction:stub_onCheck})
		, actual = wrapper.find('Checkbox').length
		, expected = 1
		expect(actual).toBe(expected);
		
	});

	test("must have execute checkFunction if checkbox is checked", () => {
		const stub_onCheck = jest.fn()
		, wrapper = shallow(Book).withProps({...defaultProps, selectionFunction:stub_onCheck})
		, checkbox = wrapper.find('Checkbox')

		checkbox.simulate('check');

		expect(stub_onCheck).toBeCalled();
	});

	test("que não deve ter elemento de check caso não haja selectionFunction", () => {
		const wrapper = shallow(Book).withProps({...defaultProps})
		expect(wrapper.find('Checkbox').length).toBe(0);
	});

	describe("que deve possuir uma função updateBook ", () => {
		test("que deve executar a função recebida do componente pai para atualizar o livro", () => {
			const stub_changeBookStatus = stub().resolves({})
				, wrapper = shallow(Book).withProps({...defaultProps, changeBookStatus: stub_changeBookStatus})
				, updateBookStatusFunction = wrapper.instance().updateBookStatus
				, bookAction = 'currentlyReading'

				updateBookStatusFunction(bookAction);

				assert.called(stub_changeBookStatus)
				assert.calledWith(stub_changeBookStatus, defaultProps.bookObject, bookAction)

		});
	});

})