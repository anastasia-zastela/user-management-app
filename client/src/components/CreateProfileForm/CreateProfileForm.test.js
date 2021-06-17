import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import CreateProfileForm from './CreateProfileForm';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('CreateProfileForm', () => {
  it('should render a CreateProfileForm component', () => {
    const store = mockStore({
      userLogin: {
        userInfo: { 
            data: {
                id: 1
            }
        }
      },
      profileCreate: {
          loading: '',
          error: '',
          success: ''
      },
    });
    const wrapper = mount(
        <BrowserRouter>
          <Provider store={store}>
            <CreateProfileForm 
                profileId={1} profileName={'sd'} profileGender={'sd'} profileBirthdate={false} profileCity={'sdn'}
                    />
          </Provider>
        </BrowserRouter>
    )

    expect(wrapper.find('CreateProfileForm').length).toEqual(1);
  })
});
