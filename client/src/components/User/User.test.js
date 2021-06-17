import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import User from './User';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('User', () => {
  it('should render a User component', () => {
    const store = mockStore({
      allProfilesList: {
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
     
    });
    const wrapper = mount(
      <Provider store={store}>
        <User 
          user=
            { {
                id: 1 ,
                username: '',
                email: '',
                password: ''
              } }
              profilesCount={ 12 }
                />
      </Provider>
    )

    expect(wrapper.find('User').length).toEqual(1);
  })
});
