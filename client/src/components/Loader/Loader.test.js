import React from 'react';
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Loader from './Loader';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('Loader', () => {
  it('should render a Loader component', () => {
    const wrapper = mount(
        <Loader/>
    )

    expect(wrapper.find('Loader').length).toEqual(1);
  })
});
