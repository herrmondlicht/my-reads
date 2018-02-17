import React from 'react';
import { shallow } from "../../testRender";
import Library from './Library';
import { assert, stub, createStubInstance } from "sinon";
import ShelvesData from "../../utils/Shelves";
import * as BooksAPI from "../../utils/BooksAPI";

describe('Library', () => {
  const changeBookStatus = stub()
  const renderedLibrary = (props) =>
    shallow(Library)
      .withProps({ ...props, changeBookStatus })

  test('must return a function', () => {
    expect(typeof Library).toBe('function');
  });

  test('must render at least one shelf if has books', () => {
    const books = [
      { title: 'TEST', subtitle: 'subTest', id: 1, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 2, shelf: 'read' },
      { title: 'TEST', subtitle: 'subTest', id: 3, shelf: 'wantToRead' }
    ]
      , wrapper = renderedLibrary({ books })
      , expected = 1;
    let actual;
    actual = wrapper.find('Shelf').length;

    expect(actual).toBeGreaterThanOrEqual(expected);

  });

  test('must render the shelf with the correct props', () => {
    const books = [
      { title: 'TEST', subtitle: 'subTest', id: 1, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 2, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 3, shelf: 'currentlyReading' }
    ]
      , wrapper = renderedLibrary({ books })
      , requiredProps = ['bookList', 'title', 'shelfId', 'changeBookStatus']
    let shelfProps;
    shelfProps = wrapper.find('Shelf[shelfId="currentlyReading"]').props();

    requiredProps.map(prop => {
      expect(shelfProps).toHaveProperty(prop)
    })

  })

  test('must render a floatingActionButton with a route parameter', () => {
    const books = [
      { title: 'TEST', subtitle: 'subTest', id: 1, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 2, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 3, shelf: 'currentlyReading' }
    ]
      , wrapper = renderedLibrary({ books })
      , actual = wrapper.find('FloatingActionButton[href]').length
      , expected = 1;

    expect(actual).toBe(expected)
  })

  describe('has the getBooksFromShelf function', () => {
    const books = [
      { title: 'TEST', subtitle: 'subTest', id: 1, shelf: 'currentlyReading' },
      { title: 'TEST', subtitle: 'subTest', id: 2, shelf: 'read' },
      { title: 'TEST', subtitle: 'subTest', id: 3, shelf: 'wantToRead' }
    ]
    test('which must return the correct books based on the passed parameter', () => {
      const expected = books[0]
        , wrapper = renderedLibrary({ books })
        , getBooksFromShelfFunction = wrapper.instance().getBooksFromShelf
        , selectedShelf = ShelvesData[0];

      const actual = getBooksFromShelfFunction('currentlyReading')

      expect(actual).toContain(expected);

    });
  });
});