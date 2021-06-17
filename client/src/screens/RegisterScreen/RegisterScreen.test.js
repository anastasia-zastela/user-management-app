import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import RegisterScreen from './RegisterScreen';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('RegisterScreen', () => {
  it('should render an RegisterScreen component if user is unauthenticated', () => {
    const store = mockStore({
      userLogin: {
        userInfo: { 
      }
    },
    userRegister: {
        loading: '',
          error: ''
    },
    });
    const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter
                initialEntries={['./']}
                initialIndex={0}>
                <RegisterScreen 
                    location=
                    { {push: () => 1} }
                    history=
                    { {push: () => 1} }
                      />
        </MemoryRouter>,
      </Provider>
    )

    expect(wrapper.find('RegisterScreen').length).toEqual(1);
  })
});
