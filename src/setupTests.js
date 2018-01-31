const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

const fetch = (api, header) => ({
  then: fetch,
  catch: fetch
})

global.localStorage = localStorageMock
global.fetch = fetch