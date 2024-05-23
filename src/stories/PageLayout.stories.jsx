import React from 'react';

import PageLayout from '../components/common/PageLayout';

export default {
  title: 'PageLayout',
  component: PageLayout,
};

const Template = (args) => <PageLayout {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
