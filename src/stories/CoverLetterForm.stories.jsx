import React from 'react';
import CoverLetterForm from '../components/CoverLetterForm';

export default {
  title: 'CoverLetterForm',
  component: CoverLetterForm,
};

const Template = (args) => <CoverLetterForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
