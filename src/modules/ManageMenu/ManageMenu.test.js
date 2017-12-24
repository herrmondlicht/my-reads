import React from 'react'
import { shallow, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import ManageMenu from './ManageMenu';

configure({adapter: new Adapter()});

describe("Componente ManageMenu", () => {
	test("que deve ser uma função",() => {
		expect(typeof ManageMenu).toBe('function')
  });

  test("que deve ter renderizar um componente", () => {
    const wrapper = shallow(<ManageMenu />);
    wrapper.render()
  });

  test("que deve renderizar os itens da prop em uma lista", () => {
    const propItems = [
      {label:'Currently Reading', action: 'currently'},
      {label:'Want to Read', action:'want'},
      {label:'Read',action:'read'},
    ];
    const wrapper = shallow(<ManageMenu menuItems={ propItems }/>);

    propItems.map((item, index )=> {
      expect(wrapper.find('div')
            .children()
            .at(index).text())
            .toBe(propItems[index].label);
    });
  });

  test("que deve ter uma função de manejar o estado do livro nos itens renderizados da prop", () => {
    const propItems = [
      {label:'Currently Reading', action: 'currently'},
    ]
    ,wrapper = shallow(<ManageMenu menuItems={ propItems }/>)
    ,actual = wrapper.find('div').children().at(0).prop('onClick')
    expect(typeof actual).toBe('function');
  });

  test("testa o click do item", () => {
    const changeBookStatusStub = jest.fn()
    ,propItems = [
      {label:'Currently Reading', action: 'currently'},
    ]
    ,wrapper = shallow(<ManageMenu menuItems={ propItems } changeBookStatus={ changeBookStatusStub } />)
    ,clickDiv = wrapper.find({action:'currently'})

    clickDiv.simulate('click');

    expect(changeBookStatusStub).toBeCalledWith(propItems[0]);

  });

});