import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import React from 'react';
import PaperCard from 'components/common/PaperCard';
import 'react-quill/dist/quill.snow.css';
import 'react-calendar/dist/Calendar.css';
import 'styles/MiniCalendar.css';
import { MiniCalendar } from 'components/index';
import useMode from 'hooks/useMode';

const CalendarComponent = props => {
  const { theme } = useMode();
  return (
    <Card
      h="100%"
      {...props}
      mode="dark"
      sx={{
        padding: theme.spacing(4),
        width: '100%',
      }}
    >
      <PaperCard theme={theme}>
        <Typography variant="h4" sx={{ color: 'white' }}>
          Calendar
        </Typography>
      </PaperCard>
      <CardContent>
        <Box display="flex" alignItems="center" mb="30px">
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardCalendar = () => {
  return (
    <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
      <CalendarComponent />
    </Box>
  );
};

export default DashboardCalendar;
