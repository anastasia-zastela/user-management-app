import React from 'react';
import { mount } from 'enzyme'
import DashboardCard from './DashboardCard';
import { MemoryRouter } from 'react-router';

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
