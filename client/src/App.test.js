import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('App', () => {
  it('should render a ProfilesScreen component if userInfo is in a redux store', () => {
    const store = mockStore({
      userLogin: {
        userInfo: { data: {
          isAdmin: false,
          id: 1
        }
      }
    },
      profilesList: {
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
        <App />
      </Provider>
    )
    expect(wrapper.find('ProfilesScreen').length).toEqual(1)
  })
});
