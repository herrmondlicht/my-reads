import React from 'react';
import { shallow } from "../../testRender";
import Book from './Book';


describe("Componente Book", () => {
	const defaultProps = {
		changeBookStatus:jest.fn(), 
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

	test("must have check element if selectionFunction is passed", () => {
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
			const stub_changeBookStatus = jest.fn()
				, wrapper = shallow(Book).withProps({...defaultProps, changeBookStatus: stub_changeBookStatus})
				, updateBookStatusFunction = wrapper.instance().updateBookStatus
				, updateBookParameters = 'currentlyReading'

				updateBookStatusFunction(updateBookParameters);

				expect(stub_changeBookStatus).toBeCalled();
				expect(stub_changeBookStatus).toBeCalledWith({action:'currentlyReading', book: defaultProps.bookObject})

		});
	});

})