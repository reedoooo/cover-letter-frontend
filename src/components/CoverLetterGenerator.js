import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'; // include styles
import { Box, Typography, Container, Snackbar, Paper } from '@mui/material';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'; // Import conversion functions

import DraftTabs from './DraftTabs';
import AddDraftDialog from './AddDraftDialog';
import CoverLetterForm from './CoverLetterForm';

function CoverLetterGenerator() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(0); // Managing selected draft
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [newDraftName, setNewDraftName] = useState('');
  const [editedDraftName, setEditedDraftName] = useState('');

  useEffect(() => {
    const savedDrafts = localStorage.getItem('coverLetterDrafts');
    if (savedDrafts) {
      try {
        const parsedDrafts = JSON.parse(savedDrafts).map(draft => ({
          ...draft,
          content: EditorState.createWithContent(convertFromRaw(draft.content)),
        }));
        setDrafts(parsedDrafts);
      } catch (error) {
        console.error('Failed to load drafts:', error);
        setDrafts([]);
      }
    }
  }, []);

  useEffect(() => {
    if (drafts.length > 0 && drafts[selectedDraft]) {
      setEditorState(drafts[selectedDraft].content);
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [selectedDraft, drafts]);

  useEffect(() => {
    const rawDrafts = drafts.map(draft => ({
      ...draft,
      content: convertToRaw(draft.content.getCurrentContent()),
    }));
    localStorage.setItem('coverLetterDrafts', JSON.stringify(rawDrafts));
  }, [drafts]);
  const handleDraftUpdate = (draftIndex, updatedDraft) => {
    setDrafts(
      drafts.map((draft, idx) => (idx === draftIndex ? updatedDraft : draft)),
    );
  };
  const handleDialogToggle = isOpen => () => {
    setDialogOpen(isOpen);
  };

  const handleAddDraft = () => {
    const newDraft = {
      name: newDraftName || `Draft ${drafts.length + 1}`,
      content: EditorState.createEmpty(),
    };
    const updatedDrafts = [...drafts, newDraft];
    setDrafts(updatedDrafts);
    setSelectedDraft(updatedDrafts.length - 1);
    setNewDraftName('');
    handleDialogToggle(false)();
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            width: 'auto',
            alignItems: 'baseline',
            marginBottom: '8px',
          }}
          component={Paper}
        >
          <Typography
            level="title-lg"
            variant="h3"
            gutterBottom
            elevation={3}
            sx={{ p: 2 }}
          >
            Cover Letter Generator
          </Typography>
          <Typography
            level="title-sm"
            color="text"
            fontWeight="bold"
            sx={{
              opacity: '50%',
            }}
            variant="h6"
          >
            ReedVogt &copy; 2021
          </Typography>
        </Box>
        <DraftTabs
          drafts={drafts}
          selectedDraft={selectedDraft}
          isEditing={isEditing}
          editedDraftName={editedDraftName}
          onTabChange={(event, newValue) => {
            console.log('event', event);
            console.log('newValue', newValue);
            setSelectedDraft(newValue);
          }}
          onEditDraftName={index => {
            setIsEditing(true);
            setEditedDraftName(drafts[index].name);
            setSelectedDraft(index);
          }}
          onSaveDraftName={index => {
            handleDraftUpdate(index, {
              ...drafts[index],
              name: editedDraftName,
            });
            setIsEditing(false);
          }}
          setEditedDraftName={setEditedDraftName}
          onDeleteDraft={index => {
            setDrafts(drafts.filter((_, idx) => idx !== index));
            setSelectedDraft(0); // Reset to first draft or handle empty state
          }}
          onOpenAddDialog={handleDialogToggle(true)}
        />
        <AddDraftDialog
          open={dialogOpen}
          onClose={handleDialogToggle(false)}
          onSubmit={handleAddDraft}
          draftName={newDraftName}
          setDraftName={setNewDraftName}
        />
        <CoverLetterForm
          editorState={editorState}
          selectedDraft={selectedDraft}
          loading={loading}
          drafts={drafts}
          setEditorState={setEditorState}
          setLoading={setLoading}
          setDrafts={setDrafts}
          setOpen={setOpen}
          onEditDraftName={index => {
            setIsEditing(true);
            setEditedDraftName(drafts[index].name);
            setSelectedDraft(index);
          }}
          onDeleteDraft={index =>
            setDrafts(drafts.filter((_, idx) => idx !== index))
          }
        />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Cover letter generated"
        />
      </Box>
    </Container>
  );
}

export default CoverLetterGenerator;
