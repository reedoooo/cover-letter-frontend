import { Box, Grid, Icon, Paper } from '@mui/material';

import React from 'react';
import { AddIcon } from 'assets/humanIcons';
import { IconBox, MiniStatistics, PaperCard } from 'components/index';
import { careerTrackerTable, miniStatisticsData } from 'config/data';
import useMode from 'hooks/useMode';
import {
  DashboardCalendar,
  JobStatusTracker,
  // MarkdownEditor,
  TaskTracker,
} from './components';

// ==============================|| DASHBOARD ||============================== //

const MainDashboard = () => {
  const { theme } = useMode();
  // const inputRef = React.useRef(null);
  const brandColor = theme.palette.secondary.main;
  const boxBg = theme.palette.grey[300];

  // const handleMarkdownChange = content => {
  //   console.log('Markdown content:', content);
  // };

  return (
    <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
      {/* <----- Mini Statistics Section -----> */}

      <Grid container spacing={2} mb={2}>
        {Object.values(miniStatisticsData).map((stat, index) => (
          <Grid item xs={12} md={6} lg={4} xl={2} key={index}>
            <MiniStatistics
              startContent={
                <IconBox
                  sx={{
                    width: 56,
                    height: 56,
                    backgroundColor: boxBg,
                  }}
                  icon={
                    <Icon
                      sx={{
                        width: 32,
                        height: 32,
                        color: brandColor,
                      }}
                      as={AddIcon}
                    />
                  }
                />
              }
              name={stat.name}
              value={stat.value}
            />
          </Grid>
        ))}
      </Grid>
      {/* <----- Job Status Tracker Section -----> */}

      <Grid container mb={2} spacing={2}>
        <PaperCard component={Grid} item xs={12} theme={theme}>
          <JobStatusTracker tableData={careerTrackerTable} />
        </PaperCard>
        {/* Placeholder for AI generated Text Editor Header */}
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%' }}>
            {/* Input the AI generated Text Editor HEADER HERE */}
          </Box>
        </Grid>
      </Grid>
      {/* <----- AI Generated Text Editor Section -----> */}

      <Grid container mb={2} spacing={2}>
        <PaperCard component={Grid} item xs={12} theme={theme}>
          <Box
            component={Paper}
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: '450px',
            }}
          >
            {/* <MarkdownEditor
              ref={inputRef}
              initialValue="Start writing your markdown..."
              onChange={handleMarkdownChange}
            /> */}
          </Box>
        </PaperCard>
      </Grid>
      {/* <----- Task Tracker Section -----> */}

      <Grid container mb={2} spacing={2}>
        <TaskTracker sx={{ height: '100%' }} />
      </Grid>
      {/* <----- Dashboard Calendar Section -----> */}

      <Grid container mb={2} spacing={2}>
        <Box sx={{ height: '100%' }}>
          <DashboardCalendar />
        </Box>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
