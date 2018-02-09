import { shallow } from "../../testRender";
import SearchBar from "../SearchBar";
import { assert, stub } from "sinon";

jest.useFakeTimers();
describe('SearchBar', () => {

  const stubSearchFor = stub();
  const renderWithProps = (props) => {
    return shallow(SearchBar).withProps({ searchFor: stubSearchFor, ...props })
  }

  beforeEach(() => {
    stubSearchFor.resetHistory()
  })

  it('must be a function', () => {
    expect(typeof SearchBar).toBe('function')
  });

  it('must render a TextField with an onChange', () => {
    const wrapper = renderWithProps()
      , actual = wrapper.find('TextField').prop('onChange')
      , expected = 'function'

    expect(typeof actual).toBe(expected);
  });

  it('must render an IconButton with an onClick', () => {
    const wrapper = renderWithProps()
      , actual = wrapper.find('IconButton').prop('onClick')
      , expected = 'function'

    expect(typeof actual).toBe(expected);
  });

  it('must have a standard state', () => {
    const wrapper = renderWithProps()
      , actual = wrapper.state()
      , expected = {
        searchTimeoutId: 0,
        searchText: ''
      }

    expect(actual).toMatchObject(expected);
  })

  it('must have a HandleChange method', () => {
    const wrapper = renderWithProps()
      , instance = wrapper.instance()
      , stubHandleSearchTimer = stub(instance, 'HandleSearchTimer')
      , handleChangeFunction = instance.HandleChange
    handleChangeFunction()
    assert.called(stubHandleSearchTimer)
  });

  it('must have a HandleSearchTimer method', () => {
    const wrapper = renderWithProps()
      , instance = wrapper.instance()
      , stubSetState = stub(instance, 'setState')
      , HandleSearchTimerFunction = instance.HandleSearchTimer
    HandleSearchTimerFunction();
    jest.runAllTimers();

    expect(clearTimeout).toHaveBeenCalled()
    expect(setTimeout).toHaveBeenCalled()

    assert.called(stubSearchFor)
    assert.called(stubSetState)
  });


  it('must have an ExecuteSearchWithStateValue', () => {
    const wrapper = renderWithProps()
      , instance = wrapper.instance()
      , ExecuteSearchWithStateValueFunction = instance.ExecuteSearchWithStateValue
      , searchText = 'test text'

    wrapper.setState({
      searchText
    })

    ExecuteSearchWithStateValueFunction()

    assert.calledWith(stubSearchFor, searchText)

  })

  // it('must have a DeleteTimeout', () => {
  //   const wrapper = renderWithProps()
  //     , instance = wrapper.instance()
  //     , DeleteTimeoutFunction = instance.DeleteTimeout
  //   DeleteTimeoutFunction()

  //   expect(clearTimeout).toHaveBeenCalled()
  // })

  // it('must have a setNewTimeout method', () => {
  //   const wrapper = renderWithProps()
  //     , functionToBeExecuted = stub()
  //     , instance = wrapper.instance()
  //     , stubSetState = stub(instance, 'setState')
  //     , setNewTimeoutFunction = instance.SetNewTimeout
  //   setNewTimeoutFunction(functionToBeExecuted)

  //   jest.runAllTimers()

  //   assert.called(stubSetState)
  //   assert.called(functionToBeExecuted)
  // })



})