import React from 'react';
import { Box, Tab, Tabs, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function DraftTabs({ drafts, selectedDraft, dispatch }) {
  const handleKeyDown = (event, index) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'SAVE_DRAFT_NAME', index });
    }
  };

  const handleTabChange = (event, newValue) => {
    dispatch({ type: 'SET_SELECTED_DRAFT', value: newValue });
  };

  const handleEditDraftName = (index) => {
    dispatch({ type: 'EDIT_DRAFT_NAME', index });
  };

  const handleSaveDraftName = (index) => {
    dispatch({ type: 'SAVE_DRAFT_NAME', index });
  };

  const handleDeleteDraft = (index) => {
    dispatch({ type: 'DELETE_DRAFT', index });
  };

  const handleOpenAddDialog = () => {
    dispatch({ type: 'SET_OPEN_DIALOG', value: true });
  };

  return (
    <Tabs value={selectedDraft} onChange={handleTabChange}>
      {drafts.map((draft, index) => (
        <Tab
          key={index}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {draft.isEditing ? (
                <TextField
                  value={draft.editedName}
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_EDITED_DRAFT_NAME',
                      value: e.target.value,
                      index,
                    })
                  }
                  onBlur={() => handleSaveDraftName(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  size="small"
                  autoFocus
                />
              ) : (
                draft.name || `Draft ${index + 1}`
              )}
              <IconButton
                onClick={() => handleEditDraftName(index)}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDeleteDraft(index)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          }
        />
      ))}
      <Tab icon={<AddIcon />} onClick={handleOpenAddDialog} />
    </Tabs>
  );
}

export default DraftTabs;
