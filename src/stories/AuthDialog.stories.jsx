import React from 'react';
import AuthDialog from '../components/AuthDialog';

export default {
  title: 'AuthDialog',
  component: AuthDialog,
};

const Template = (args) => <AuthDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
