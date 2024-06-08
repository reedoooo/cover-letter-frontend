// src/variables/data.js
import { Icon } from '@mui/material';
import { uniqueId } from 'lodash';
import {
  DashboardIcon,
  EmojiEmotionsIcon,
  HomeIcon,
  LayersIcon,
  LoginIcon,
  MdAddTask,
  MdHome,
  PageviewIcon,
  PersonAddIcon,
  TextFieldsIcon,
} from 'assets/humanIcons';

const miniStatisticsData = {
  interviewsEarned: {
    name: 'Interviews Earned',
    value: 10,
    icon: <MdAddTask />,
  },
  responsesBack: { name: 'Responses Back', value: 15, icon: <MdAddTask /> },
  rejectionRatio: {
    name: 'Rejection Ratio',
    value: '3:1',
    icon: <MdAddTask />,
  },
  jobsAppliedThisWeek: {
    name: 'Jobs Applied This Week',
    value: 7,
    icon: <MdAddTask />,
  },
  followUpsSent: { name: 'Follow-ups Sent', value: 5, icon: <MdAddTask /> },
};

const tableColumnsCareerTracker = [
  { Header: 'COMPANY NAME', accessor: 'company_name' },
  { Header: 'APPLICATION DATA', accessor: 'application_data' },
  { Header: 'NOTES', accessor: 'notes' },
  { Header: 'SUBMITTED', accessor: 'submitted' },
  { Header: 'PROGRESS', accessor: 'progress' },
  { Header: 'STATUS', accessor: 'status' },
];

const tableDataCareerTracker = [
  {
    company_name: ['Company A', true],
    application_data: [
      { icon: '📄', text: 'Resume' },
      { icon: '📄', text: 'Cover Letter' },
    ],
    notes: ['Note 1', false],
    submitted: '2024-05-01',
    progress: 80,
    status: 'In Progress',
  },
  {
    company_name: ['Company B', false],
    application_data: [{ icon: '📄', text: 'Resume' }],
    notes: ['Note 2', true],
    submitted: '2024-05-03',
    progress: 100,
    status: 'Approved',
  },
  {
    company_name: ['Company C', true],
    application_data: [{ icon: '📄', text: 'Portfolio' }],
    notes: ['Note 3', true],
    submitted: '2024-05-05',
    progress: 50,
    status: 'Pending',
  },
  {
    company_name: ['Company D', false],
    notes: ['Note 4', false],
    submitted: '2024-05-07',
    progress: 25,
    status: 'Rejected',
  },
];

const careerTrackerTable = {
  columns: tableColumnsCareerTracker,
  data: tableDataCareerTracker,
};

const base = `${window.location.origin}`;
// const base2 = 'http://localhost:3000';

const templateData = [
  {
    id: uniqueId('templates-'),
    title: 'Chat Test',
    description: 'Chat Test Description',
    functionalStatus: true,
    icon: <Icon as={MdAddTask} color="#7551FF" />,
    path: '/test/chat-test',
    route: `${base}/test/chat-test`,
    link: `${base}/test/chat-test`,
  },
  {
    id: uniqueId('templates-'),
    title: 'Original Chat Ai',
    description: 'Original Chat Ai Description',
    functionalStatus: true,
    icon: <Icon as={MdAddTask} color="#7551FF" />,
    path: '/templates/original-chat-ai',
    route: `${base}/template/original-chat-ai`,
    link: `${base}/template/original-chat-ai`,
  },
  {
    id: uniqueId('templates-'),
    title: 'Blog Post Generator',
    description: 'Blog Post Generator Description',
    functionalStatus: false,
    icon: <Icon as={MdAddTask} color="#7551FF" />,
    path: '/template/blog-post',
    route: `${base}/template/blog-post`,
    link: `${base}/template/blog-post`,
  },
  {
    id: uniqueId('templates-'),
    title: 'Code Converter',
    description: 'Code Converter Description',
    icon: <Icon as={MdAddTask} color="#7551FF" />,
    path: '/template/code-converter',
    route: `${base}/template/code-converter`,
    link: `${base}/template/code-converter`,
  },
  {
    id: uniqueId('templates-'),
    title: 'Theme Generator',
    description: 'Theme Generator Description',
    icon: <Icon as={MdAddTask} color="#7551FF" />,
    path: '/template/theme-generator',
    route: `${base}/template/theme-generator`,
    link: `${base}/template/theme-generator`,
  },
  {
    id: uniqueId('templates-'),
    title: 'Template Generator',
    description: 'Template Generator Description',
    icon: <Icon as={MdAddTask} color="#7551FF" />,
    path: '/template/generate-template',
    route: `${base}/template/generate-template`,
    link: `${base}/template/generate-template`,
  },
  {
    id: uniqueId('land-'),
    title: 'Landing',
    description: 'Landing Page',
    icon: <HomeIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
    path: '/hero-docs',
    route: `${base}/hero-docs`,
    link: `${base}/hero-docs`,
  },
  {
    id: uniqueId('admin-'),
    title: 'Main Dashboard',
    description: 'Main Dashboard Description',
    icon: <Icon as={MdHome} color="#7551FF" />,
    path: '/admin/default',
    route: `${base}/admin/default`,
    link: `${base}/admin/default`,
  },
  {
    id: uniqueId('admin-'),
    title: 'Work Space',
    description: 'Work Space Description',

    icon: <Icon as={MdAddTask} color="#7551FF" />,
    path: '/admin/workspace',
    route: `${base}/admin/workspace`,
    link: `${base}/admin/workspace`,
  },
  {
    id: uniqueId('admin-'),
    title: 'Templates',
    description: 'Templates Description',
    icon: <Icon as={MdAddTask} color="#7551FF" />,
    path: '/admin/templates',
    route: `${base}/admin/templates`,
    link: `${base}/admin/templates`,
  },
  {
    id: uniqueId('auth-'),
    title: 'Sign In',
    description: 'Sign In Page',
    icon: <HomeIcon sx={{ width: 20, height: 20 }} />,
    // icon: <LockIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
    path: '/auth/sign-in',
    route: `${base}/auth/sign-in`,
    link: `${base}/auth/sign-in`,
  },
  {
    id: uniqueId('admin-'),
    title: 'Data Tables',
    description: 'Data Tables Description',
    icon: <HomeIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
    // icon: <BarChartIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
    path: '/admin/data-tables',
    route: `${base}/admin/data-tables`,
    link: `${base}/admin/data-tables`,
  },
  {
    id: uniqueId('template-'),
    title: 'Profile',
    description: 'Profile Description',
    icon: <HomeIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,

    // icon: <PersonIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
    path: '/admin/profile',
    route: `${base}/admin/profile`,
    link: `${base}/admin/profile`,
  },
  {
    id: uniqueId('template-'),
    title: 'Not Found',
    description: 'Page Not Found',
    icon: <HomeIcon sx={{ width: 20, height: 20, color: 'inherit' }} />,
    path: '*',
    route: `${base}/*`,
    link: `${base}/*`,
  },
];

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
    id: uniqueId(),
  },
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    href: '/dashboard',
  },
  {
    subheader: 'Utilities',
    title: 'Typography',
    icon: <TextFieldsIcon />,
    href: '/ui/typography',
  },
  {
    title: 'Shadow',
    icon: <LayersIcon />,
    href: '/ui/shadow',
  },
  {
    subheader: 'Auth',
    title: 'Login',
    icon: <LoginIcon />,
    href: '/auth/login',
  },
  {
    title: 'Register',
    icon: <PersonAddIcon />,
    href: '/auth/register',
  },
  {
    subheader: 'Extra',
    title: 'Icons',
    icon: <EmojiEmotionsIcon />,
    href: '/icons',
  },
  {
    title: 'Sample Page',
    icon: <PageviewIcon />,
    href: '/sample-page',
  },
];

export { Menuitems, careerTrackerTable, miniStatisticsData, templateData };
