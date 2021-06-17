import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Header from './Header';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should render a Header component if user is authenticated', () => {
    const store = mockStore({
      userLogin: {
        userInfo: { 
            data: {
                id: 1
            }
          }
        }
    });
    const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter
                initialEntries={['./']}
                initialIndex={0}>
        <Header />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find('Header').length).toEqual(1);
  })
});
