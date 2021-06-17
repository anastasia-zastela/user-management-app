import React from 'react';
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import FormContainer from './FormContainer';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('FormContainer', () => {
  it('should render a FormContainer component', () => {

    const wrapper = mount(
          <MemoryRouter
                initialEntries={['./']}
                initialIndex={0}>
            <FormContainer props={"jknk"}/>
        </MemoryRouter>
    )

    expect(wrapper.find('FormContainer').length).toEqual(1);
  })
});
