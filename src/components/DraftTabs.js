import React from 'react';
import { Box, Tab, Tabs, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
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
  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      onSaveDraftName(index);
    }
  };
  return (
    <Tabs value={selectedDraft} onChange={onTabChange}>
      {drafts.map((draft, index) => (
        <Tab
          key={index}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isEditing && selectedDraft === index ? (
                <TextField
                  value={editedDraftName}
                  onChange={e => setEditedDraftName(e.target.value)}
                  onBlur={() => onSaveDraftName(index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  size="small"
                  autoFocus
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
