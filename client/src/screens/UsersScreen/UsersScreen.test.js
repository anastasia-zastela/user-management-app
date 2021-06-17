import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UsersScreen from './UsersScreen';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('UsersScreen', () => {
  it('should render an UsersScreen component if user is an admin', () => {
    const store = mockStore({
      userLogin: {
        userInfo: { data: {
          isAdmin: true,
          id: 1 
        }
      }
    },
      usersList: {
        users: [
          {
            id: 1 ,
            username: '',
            email: '',
            password: ''
          }
        ],
        error: '',
        loading: ''
      },
      allProfilesList: {
        profiles: [
          {
            id: 1 ,
            userId: 1,
            name: '',
            gender: '',
            birthdate: '',
            city: ''
          }
        ],
        error: '',
        loading: ''
      }
    });
    const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter
                initialEntries={['./users']}
                initialIndex={0}>
                <UsersScreen />
        </MemoryRouter>,
      </Provider>
    )

    expect(wrapper.find('UsersScreen').length).toEqual(1);
  })
});
