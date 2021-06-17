import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UserScreen from './UserScreen';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('UserScreen', () => {
  it('should render an UserScreen component if user is an admin', () => {
    const store = mockStore({
      userLogin: {
        userInfo: {
          data: {
            id: 1
          }
        }
      },
      profilesList: {
          loading: '',
          error: '',
          profiles: [
            {
              id: 1 ,
              userId: 1,
              name: '',
              gender: '',
              birthdate: '',
              city: ''
            }
          ]
      }
    });
    const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter
                initialEntries={['./users']}
                initialIndex={0}>
                <UserScreen />
        </MemoryRouter>,
      </Provider>
    )

    expect(wrapper.find('UserScreen').length).toEqual(1);
  })
});
