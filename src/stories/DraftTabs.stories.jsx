import React from 'react';
import DraftTabs from '../components/DraftTabs';

export default {
  title: 'DraftTabs',
  component: DraftTabs,
};

const Template = (args) => <DraftTabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
