import React from 'react';
import AddDraftDialog from '../components/AddDraftDialog';

export default {
  title: 'AddDraftDialog',
  component: AddDraftDialog,
};

const Template = (args) => <AddDraftDialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
