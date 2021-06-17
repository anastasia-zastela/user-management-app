import React from 'react';
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Message from './Message';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('Message', () => {
  it('should render a Message component', () => {
    const wrapper = mount(
        <Message 
            variant=''
            children=''
                />
    )

    expect(wrapper.find('Message').length).toEqual(1);
  })
});
