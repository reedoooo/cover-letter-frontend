import React from 'react';
import {
  Box,
  Tab,
  Tabs,
  IconButton,
  TextField,
  Typography,
  Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useMode from 'hooks/useMode';
import DashboardBox from './common/DashboardBox';

function DraftTabs({
  drafts,
  selectedDraft,
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

  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      onSaveDraftName(index, event.target.value);
    }
  };

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
      <Box sx={{ width: '100%', mb: 2 }}>
        <Typography
          variant="h6"
          sx={{ mb: 1, textAlign: 'center', color: theme.palette.primary.main }}
        >
          Drafts
        </Typography>
        <Divider />
      </Box>
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
          value={selectedDraft}
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
          {drafts?.map((draft, index) => (
            <Tab
              key={index}
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
                    justifyContent: 'space-between',
                  }}
                >
                  {isEditing && selectedDraft === index ? (
                    <TextField
                      value={editedDraftName}
                      onChange={(e) => setEditedDraftName(e.target.value)}
                      onBlur={() => onSaveDraftName(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      size="small"
                      autoFocus
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
                      }}
                    />
                  ) : (
                    draft?.name || `Draft ${index + 1}`
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
            label={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  width: '100%',
                  justifyContent: 'space-between',
                }}
              >
                {' '}
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
                  }}
                >
                  Add New Draft
                </Typography>
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
              color: 'text.contrastText',
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
