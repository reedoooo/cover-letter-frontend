import React from 'react';

import DashboardBox from '../components/common/DashboardBox';

export default {
  title: 'DashboardBox',
  component: DashboardBox,
};

const Template = (args) => <DashboardBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
