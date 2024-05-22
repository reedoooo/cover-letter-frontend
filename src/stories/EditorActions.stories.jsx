import React from 'react';
import EditorActions from '../components/EditorActions';

export default {
  title: 'EditorActions',
  component: EditorActions,
};

const Template = (args) => <EditorActions {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
