import React from 'react';
import { Box, Tab, Tabs, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useMode from 'hooks/useMode';

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
    <Tabs
      value={selectedDraft}
      onChange={onTabChange}
      orientation="vertical"
      sx={{ borderRight: 1 }}
    >
      {drafts?.map((draft, index) => (
        <Tab
          key={index}
          sx={{
            color: 'text.contrastText',
            borderBottom: `1px solid ${theme.palette.text.contrastText}`,
          }}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                draft.name || `Draft ${index + 1}`
              )}
              <IconButton onClick={() => onEditDraftName(index)} color="info">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDeleteDraft(index)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        />
      ))}
      <Tab label={<AddIcon />} onClick={onOpenAddDialog} />
    </Tabs>
  );
}

export default DraftTabs;
