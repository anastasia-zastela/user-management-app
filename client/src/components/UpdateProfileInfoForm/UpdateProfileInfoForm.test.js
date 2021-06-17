import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UpdateProfileInfoForm from './UpdateProfileInfoForm';
import { BrowserRouter } from 'react-router-dom';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('UpdateProfileInfoForm', () => {
  it('should render a UpdateProfileInfoForm component', () => {
    const store = mockStore({
      profileUpdate: {
          loading: '',
          error: '',
          success: ''
      }
    });
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <UpdateProfileInfoForm 
              profileId={1} profileName={'sd'} profileGender={'sd'} profileBirthdate={false} profileCity={'sdn'}
                  />
        </Provider>
      </BrowserRouter>
    )

    expect(wrapper.find('UpdateProfileInfoForm').length).toEqual(1);
  })
});
