import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddBoxIcon from '@mui/icons-material/AddBox';

function AddDraftDialog({ open, onClose, draftName, onSubmit, setDraftName }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a New Draft</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Draft Name"
          type="text"
          fullWidth
          variant="outlined"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          startIcon={<CancelIcon />}
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          startIcon={<AddBoxIcon />}
          variant="outlined"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddDraftDialog;
