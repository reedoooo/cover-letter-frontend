import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Tab,
  Tabs,
  IconButton,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import React from 'react';

import useMode from 'hooks/useMode';

import DashboardBox from './common/DashboardBox';
import RCBox from './themed/RCBox';

function DraftTabs({
  drafts,
  selectedDraftIndex,
  isEditing,
  editedDraftName,
  onTabChange,
  onEditDraftName,
  onSaveDraftName,
  onDeleteDraft,
  onOpenAddDialog,
  setEditedDraftName,
}) {
  const { theme } = useMode();
  const [hovered, setHovered] = React.useState(false);

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      onSaveDraftName(index, event.target.value);
    }
  };
  const getUniqueDrafts = (drafts) => {
    const seen = new Set();
    return drafts.filter((draft) => {
      const duplicate = seen.has(draft.title);
      seen.add(draft.title);
      return !duplicate;
    });
  };

  const uniqueDrafts = getUniqueDrafts(drafts);

  return (
    <DashboardBox
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        width: '100%',
        height: '100%',
      }}
    >
      <RCBox sx={{ width: '100%', my: 2 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, textAlign: 'center', color: theme.palette.primary.main }}
        >
          Drafts
        </Typography>
        <Divider
          theme={theme}
          sx={{
            width: '100%',
            height: '2px',
            backgroundColor: theme.palette.primary.main,
          }}
        />
      </RCBox>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          mt: 1,
          flexGrow: 1,
        }}
      >
        <Tabs
          value={selectedDraftIndex}
          onChange={onTabChange}
          orientation="vertical"
          sx={{
            borderRight: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            padding: 0, // Remove padding
            margin: 0, // Remove margin
          }}
        >
          {uniqueDrafts?.map((draft, index) => (
            <Tab
              key={index}
              component={Box}
              sx={{
                color: 'text.contrastText',
                borderBottom: `1px solid ${theme.palette.text.contrastText}`,
                justifyContent: 'flex-start',
                textAlign: 'left',
                width: '100%',
                minHeight: 'auto', // Override minHeight to reduce space
                padding: theme.spacing(0.5), // Reduce padding
              }}
              label={
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    width: '100%',
                    height: '100%',
                    padding: theme.spacing(0.5),
                    borderRadius: 1,
                    fontWeight: 500,
                    justifyContent: 'space-between',
                    '&:hover': {
                      color: theme.palette.primary.light,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      transition: 'background-color 0.3s ease-in-out',
                    },
                  }}
                >
                  {isEditing && selectedDraftIndex === index ? (
                    <TextField
                      value={editedDraftName}
                      onChange={(e) => setEditedDraftName(e.target.value)}
                      onBlur={() => onSaveDraftName(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      size="small"
                      // ! autoFocus <-- ESLINT: autoFocus is not allowed
                      variant="outlined"
                      sx={{
                        width: '100%',
                        height: '100%',
                        padding: 1,
                        borderRadius: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:focus': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:active': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                        '&:disabled': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    />
                  ) : (
                    draft?.title || `Draft ${index + 1}`
                  )}
                  <Box>
                    <IconButton
                      onClick={() => onEditDraftName(index)}
                      color="info"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onDeleteDraft(index)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              }
            />
          ))}
          <Tab
            component={Box}
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: theme.spacing(1),
                  width: '100%',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.primary.contrastText,
                    fontWeight: 500,
                    fontSize: 14,
                    textAlign: 'flex-start',
                    width: '100%',
                    height: '100%',
                    padding: theme.spacing(1),
                    opacity: hovered ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out',
                  }}
                >
                  Add New Draft
                </Typography>
                {hovered && (
                  <ArrowForwardIcon
                    sx={{
                      position: 'absolute',
                      left: '10%',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      opacity: 1,
                      transition: 'opacity 0.3s ease-in-out',
                      color: theme.palette.primary.contrastText,
                    }}
                  />
                )}
                <IconButton
                  onClick={onOpenAddDialog}
                  sx={{
                    mt: 1,
                    m: theme.spacing(0.5),
                    alignSelf: 'center',
                    borderRadius: '50%',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            }
            sx={{
              color: theme.palette.text.contrastText,
              borderBottom: `1px solid ${theme.palette.text.contrastText}`,
              justifyContent: 'flex-start',
              textAlign: 'left',
              width: '100%',
              minHeight: 'auto', // Override minHeight to reduce space
              padding: theme.spacing(0.5), // Reduce padding
            }}
          />
        </Tabs>
      </Box>
    </DashboardBox>
  );
}

export default DraftTabs;
