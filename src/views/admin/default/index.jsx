import { Box, Card, Grid, Icon, Paper } from '@mui/material';

import { AddIcon } from 'assets/humanIcons';
import {
  IconBox,
  MarkdownEditor,
  MiniStatistics,
  PaperCard,
} from 'components/index';
import { careerTrackerTable, miniStatisticsData } from 'config/data';
import useMode from 'hooks/useMode';
import { DashboardCalendar, JobStatusTracker, Tasks } from './components';

// ==============================|| DASHBOARD ||============================== //

const MainDashboard = () => {
  const { theme } = useMode();
  const brandColor = theme.palette.secondary.main;
  const boxBg =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[700];

  const handleMarkdownChange = content => {
    console.log('Markdown content:', content);
  };

  return (
    <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
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
      <Grid container mb={2} spacing={2}>
        <PaperCard component={Grid} item xs={12} theme={theme}>
          <JobStatusTracker tableData={careerTrackerTable} />
        </PaperCard>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: '100%' }}>
            {/* Input the AI generated Text Editor HEADER HERE */}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <Box
              component={Paper}
              sx={{
                width: '100%',
                height: '100%',
                maxHeight: '450px',
              }}
            >
              <MarkdownEditor
                initialValue="Start writing your markdown..."
                onChange={handleMarkdownChange}
              />
            </Box>
          </Card>
        </Grid>
        <Tasks sx={{ height: '100%' }} />
        <Box sx={{ height: '100%' }}>
          <DashboardCalendar />
        </Box>
      </Grid>
    </Box>
  );
};

export default MainDashboard;
