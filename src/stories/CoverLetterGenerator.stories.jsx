import React from 'react';
import CoverLetterGenerator from '../components/CoverLetterGenerator';

export default {
  title: 'CoverLetterGenerator',
  component: CoverLetterGenerator,
};

const Template = (args) => <CoverLetterGenerator {...args} />;

export const Default = Template.bind({});
Default.args = {
  // Add default args here
};
