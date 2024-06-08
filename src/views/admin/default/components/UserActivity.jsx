import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import React from 'react';
import BarChart from 'components/themedV2/charts/BarChart';
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from 'config/charts';

export default function UserActivity(props) {
  return (
    <Card sx={{ width: '100%' }} {...props}>
      <CardContent>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="15px"
          py="10px"
        >
          <Typography variant="h6" fontWeight="bold">
            User Activity
          </Typography>
          <Select defaultValue="Weekly">
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </Box>
        <Box height="240px" mt="auto">
          <BarChart
            chartData={barChartDataDailyTraffic}
            chartOptions={barChartOptionsDailyTraffic}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
