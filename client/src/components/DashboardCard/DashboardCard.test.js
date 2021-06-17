import React from 'react';
import { mount, configure } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DashboardCard from './DashboardCard';
import { MemoryRouter } from 'react-router';

const mockStore = configureMockStore([thunk]);
configure({ adapter: new Adapter() });

describe('DashboardCard', () => {
  it('should render a DashboardCard component', () => {

    const wrapper = mount(
          <MemoryRouter
                initialEntries={['./']}
                initialIndex={0}>
            <DashboardCard cardInfo={{
                title: '',
                count:2
                }}/>
        </MemoryRouter>
    )

    expect(wrapper.find('DashboardCard').length).toEqual(1);
  })
});
