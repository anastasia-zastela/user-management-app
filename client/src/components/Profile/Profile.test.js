import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Profile from './Profile';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('Profile', () => {
  it('should render a Profile component', () => {
    const store = mockStore({
      userLogin: {
        userInfo: { 
            data: {
                id: 1
            }
          }
        },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Profile 
            profile=
            { {
                id: 1 ,
                name: '',
                gender: '',
                city: '',
                birthdate: '',
                userId: 1
              } }
                />
      </Provider>
    )

    expect(wrapper.find('Profile').length).toEqual(1);
  })
});
