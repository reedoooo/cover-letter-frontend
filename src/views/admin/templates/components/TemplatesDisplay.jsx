import {
  Box,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
// const { UploadFileIcon, FilterListIcon } = reedThaHumansIconLibrary;

import { styled as styledDefault } from 'styled-components';
import { FilterListIcon, UploadFileIcon } from 'assets/humanIcons';
import PaperCard from 'components/common/PaperCard';
import useMode from 'hooks/useMode';

const RatioBox = styledDefault(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingBottom: '141.4%', // A4 ratio
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  overflow: 'hidden',
  '& .content': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  '& .icon-container': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    width: '50%',
    margin: 'auto',
  },
}));

const A4Paper = ({ icon, date, title, description }) => {
  const { theme } = useMode();
  return (
    <RatioBox theme={theme}>
      <div className="content">
        <div className="icon-container">
          <PaperCard theme={theme} icon={icon} />
        </div>
        <Box alignItems="center" display="flex" flexDirection="column">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px',
            }}
          >
            <div>{title}</div>
            <div>{date}</div>
          </div>
          <div>{description}</div>
        </Box>
      </div>
    </RatioBox>
  );
};

const GridContainer = styledDefault(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
}));

const TemplatesDisplay = ({ templates }) => {
  const { theme } = useMode();
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
          Templates Display
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        />
        <IconButton>
          <FilterListIcon />
        </IconButton>
        <IconButton>
          <UploadFileIcon />
        </IconButton>
      </Toolbar>
      <GridContainer theme={theme}>
        {templates?.map((template, index) => (
          <A4Paper
            key={index}
            icon={template.icon}
            date={template.templateData.route}
            title={template.title}
            description={template.description}
          />
        ))}
      </GridContainer>
    </Paper>
  );
};

export default TemplatesDisplay;
