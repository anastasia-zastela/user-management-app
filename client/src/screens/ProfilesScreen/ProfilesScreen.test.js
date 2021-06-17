import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ProfilesScreen from './ProfilesScreen';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('ProfilesScreen', () => {
  it('should render an ProfilesScreen component if user is authenticated', () => {
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
                initialEntries={['./']}
                initialIndex={0}>
                <ProfilesScreen 
                    location=
                    { {push: () => 1} }
                    history=
                    { {push: () => 1} }
                      />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find('ProfilesScreen').length).toEqual(1);
  })
});
