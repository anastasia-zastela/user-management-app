import React from 'react';
import {Provider} from 'react-redux'
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import UpdateUserInfoForm from './UpdateUserInfoForm';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('UpdateUserInfoForm', () => {
  it('should render a UpdateUserInfoForm component', () => {
    const store = mockStore({
      userUpdate: {
          loading: '',
            error: ''
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <UpdateUserInfoForm 
            userId={1} userUsername='sd' userEmail='sd' userIsAdmin={false}
                />
      </Provider>
    )

    expect(wrapper.find('UpdateUserInfoForm').length).toEqual(1);
  })
});
