import NoResults from '../NoResults'
import { shallow } from "../../testRender";
describe('NoResults', () => {
  test('must return a function', () => {
    expect(typeof NoResults).toBe('function')
  });

  test('must render', () => {
    const wrapper = shallow(NoResults)
    expect(wrapper).toBeTruthy
  })
})