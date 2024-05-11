import React from 'react';
import 'react-quill/dist/quill.snow.css'; // include styles
import axios from 'axios';
import {
  Button,
  Typography,
  CircularProgress,
  TextField,
  Grid,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'; // Import conversion functions

import formFields from '../config/formFields';
import useFormikCoverLetter from '../hooks/useFormikCoverLetter';
import CoverLetterEditor from './CoverLetterEditor';
import DownloadButton from './DownloadButton';

function CoverLetterForm({
  editorState,
  loading,
  drafts,
  selectedDraft,

  setEditorState,
  setLoading,
  setDrafts,
  setOpen,
  onDeleteDraft,
  onEditDraftName,
}) {
  const onSubmit = async values => {
    setLoading(true);
    try {
      const content = convertToRaw(editorState.getCurrentContent());
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/generate-cover-letter`,
        { ...values, content },
      );
      const updatedDrafts = [...drafts];
      updatedDrafts[selectedDraft] = {
        ...updatedDrafts[selectedDraft],
        content: EditorState.createWithContent(
          convertFromRaw(data.draftContentState),
        ),
      };
      setDrafts(updatedDrafts);
      setOpen(true);
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormikCoverLetter(onSubmit);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          {formFields.map(field => (
            <Grid item xs={12} key={field.name}>
              <TextField
                label={field.label}
                variant="outlined"
                fullWidth
                {...formik.getFieldProps(field.name)}
                error={
                  formik.touched[field.name] &&
                  Boolean(formik.errors[field.name])
                }
                helperText={
                  formik.touched[field.name] && formik.errors[field.name]
                }
                sx={{ mt: 2 }}
              />
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ mb: 5, padding: 16 }}>
            <Typography variant="h6">Preview</Typography>
            {loading && <CircularProgress />}
            <CoverLetterEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </Paper>
          <Paper style={{ mt: 5, padding: 16 }}>
            {/* GENERATE A COVER LETTER */}
            <Button
              variant="contained"
              color="success"
              type="submit"
              sx={{ mt: 2, mb: 2, width: '50%' }}
              disabled={loading}
              startIcon={<AddIcon />}
            >
              Generate Cover Letter
            </Button>
            {/* DOWNLOAD A DRAFT */}
            <DownloadButton editorState={editorState} label="Download Draft" />
            {/* RENAME A DRAFT */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => onEditDraftName(selectedDraft)}
              // onClick={() => {
              //   const updatedDrafts = [...drafts];
              //   updatedDrafts[selectedDraft] = {
              //     ...updatedDrafts[selectedDraft],
              //     name: `Draft ${selectedDraft + 1}`,
              //   };
              //   setDrafts(updatedDrafts);
              // }}
              sx={{ mt: 2, mb: 2, width: '50%' }}
              disabled={loading}
              startIcon={<EditIcon />}
            >
              Rename Draft
            </Button>
            {/* DELETE A DRAFT */}
            <Button
              variant="contained"
              color="error"
              onClick={() => onDeleteDraft(selectedDraft)}
              // onClick={() => {
              //   const updatedDrafts = drafts.filter(
              //     (draft, index) => index !== selectedDraft,
              //   );
              //   setDrafts(updatedDrafts);
              //   setSelectedDraft(0);
              // }}
              sx={{ mt: 2, mb: 2, width: '50%' }}
              disabled={loading}
              startIcon={<DeleteIcon />}
            >
              Delete Draft
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export default CoverLetterForm;
