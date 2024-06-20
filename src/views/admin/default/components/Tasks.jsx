/* eslint-disable no-unused-vars */
import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Icon,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import { MdCheckBox, MdDragIndicator } from 'react-icons/md';
import IconBox from 'components/themedV2/icons/IconBox';
import useMode from 'hooks/useMode';
import Menu from 'layouts/navigation/menu/MainMenu.jsx';

const Conversion = props => {
  const textColor = '#1B2559';
  const boxBg = '#F4F7FE';
  const brandColor = '#422AFB';
  return (
    <Card
      sx={{
        p: '20px',
        align: 'center',
        direction: 'column',
        width: '100%',
      }}
      {...props}
    >
      <CardContent>
        <Box display="flex" alignItems="center" mb="30px">
          <IconBox
            bg={boxBg}
            icon={<Icon as={MdCheckBox} color={brandColor} w={24} h={24} />}
            sx={{ mr: '12px', width: '38px', height: '38px' }}
          />
          <Typography variant="h6" fontWeight="bold" color={textColor}>
            Tasks
          </Typography>
          <Menu sx={{ marginLeft: 'auto' }} />
        </Box>
        <List sx={{ px: '11px' }}>
          {[
            { label: 'Landing Page Design' },
            { label: 'Dashboard Builder', checked: true },
            { label: 'Mobile App Design', checked: true },
            { label: 'Illustrations' },
            { label: 'Promotional LP', checked: true },
          ].map((task, index) => (
            <ListItem
              key={index}
              disableGutters
              sx={{
                mb: '20px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Checkbox defaultChecked={task.checked} />
              <Typography fontWeight="bold" sx={{ flex: 1 }}>
                {task.label}
              </Typography>
              <IconButton>
                <MdDragIndicator />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export function Tasks() {
  <Box paddingTop={{ xs: '130px', md: '80px', xl: '80px' }}>
    <Conversion />
  </Box>;
}

export default Tasks;
