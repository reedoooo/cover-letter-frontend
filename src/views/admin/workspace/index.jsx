import { Box, Grid, Icon } from '@mui/material';
import { MdAddTask } from 'assets/humanIcons';
import { IconBox, MiniStatistics } from 'components/index';
import { miniStatisticsData } from 'config/data';
import useMode from 'hooks/useMode';

// ==============================|| WORKSPACE ||============================== //

export default function WorkSpace() {
  const { theme } = useMode();
  const brandColor = theme.palette.secondary.main;
  const boxBg =
    theme.palette.mode === 'light'
      ? theme.palette.grey[300]
      : theme.palette.grey[700];

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
                      as={MdAddTask}
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
        <Grid item xs={12}></Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Box>
  );
}
