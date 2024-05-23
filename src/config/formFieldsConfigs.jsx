// src/config/formFieldsConfigs.js
const coverLetter = [
  {
    name: 'yourName',
    label: 'Your Name',
    type: 'text',
    regex: /([A-Za-z]+\s[A-Za-z]+)/,
  },
  {
    name: 'yourAddress',
    label: 'Address',
    type: 'text',
    regex: /(?:Address|Location|Addr):?\s*([\dA-Za-z.,'/-\s]+)/i,
  },
  {
    name: 'cityStateZip',
    label: 'City, State, Zip',
    type: 'text',
    regex:
      /(?:City|State|Zip|CSZ):?\s*([A-Za-z\s]+),\s*([A-Za-z\s]{2}),?\s*(\d{5}(?:-\d{4})?)/i,
  },
  {
    name: 'emailAddress',
    label: 'Email Address',
    type: 'email',
    regex: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/,
  },
  {
    name: 'phoneNumber',
    label: 'Phone Number',
    type: 'text',
    regex:
      /(\+?\d{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?){1,4}\d{1,4}[-.\s]?(\d{1,9})?)/,
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    regex: /(?:Company|Employer|Organization):?\s*([^\n]+)/i,
  },
  {
    name: 'companyAddress',
    label: 'Company Address',
    type: 'text',
    regex: /(?:Address|Location|Addr):?\s*([\dA-Za-z.,'/-\s]+)/i,
  },
  {
    name: 'companyCityStateZip',
    label: 'City, State, Zip',
    type: 'text',
    regex:
      /(?:City|State|Zip|CSZ):?\s*([A-Za-z\s]+),\s*([A-Za-z\s]{2}),?\s*(\d{5}(?:-\d{4})?)/i,
  },
  {
    name: 'employerName',
    label: "Employer's Name",
    type: 'text',
    regex: /(?:Employer's Name|Manager|Director):?\s*([^\n]+)/i,
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    type: 'text',
    regex: /(?:Job Title|Position):?\s*([^\n]+)/i,
  },
  {
    name: 'skills',
    label: 'Skills',
    type: 'text',
    regex: /(?:Skills|TECHNICAL SKILLS):?\s*([\s\S]+?)(?=\n\n|PROJECTS)/i,
  },
  {
    name: 'projects',
    label: 'Projects',
    type: 'text',
    regex: /(?:Projects|PROJECTS):?\s*([\s\S]+?)(?=\n\n|EDUCATION)/i,
  },
];
const auth = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
    required: true,
    fullWidth: true,
    margin: 'dense',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
    required: true,
    fullWidth: true,
    margin: 'dense',
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    required: false,
    fullWidth: true,
    margin: 'dense',
    conditional: 'isSignup', // Only show this field if isSignup is true
  },
];

const formFieldsConfigs = {
  coverLetterConfigs: coverLetter,
  authConfigs: auth,
};

export default formFieldsConfigs;
