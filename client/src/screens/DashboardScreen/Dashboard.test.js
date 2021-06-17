import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DashboardScreen from './DashboardScreen';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('DashboardScreen', () => {
  it('should render an DashboardScreen component if user is admin', () => {
    const store = mockStore({
      userLogin: {
        userInfo: { 
            data: {
                isAdmin: true
            }
        }
    },
    userRegister: {
        loading: '',
          error: ''
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
                initialEntries={['./']}
                initialIndex={0}>
                <DashboardScreen 
                    location=
                    { {push: () => 1} }
                    history=
                    { {push: () => 1} }
                      />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find('DashboardScreen').length).toEqual(1);
  })
});
