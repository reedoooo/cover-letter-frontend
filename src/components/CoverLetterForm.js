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
import SaveIcon from '@mui/icons-material/Save';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'; // Import conversion functions

import formFields from '../config/formFields';
import useFormikCoverLetter from '../hooks/useFormikCoverLetter';
import CoverLetterEditor from './CoverLetterEditor';
import DownloadButton from './DownloadButton';

function CoverLetterForm({
  editorState,
  selectedDraft,
  loading,
  dispatch,
  drafts,
  handleSaveDraft,
}) {
  const onSubmit = async (values) => {
    dispatch({ type: 'TOGGLE_LOADING' });
    try {
      const content = convertToRaw(editorState.getCurrentContent());
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/cover-letter/generate-cover-letter`,
        { ...values, content }
      );
      const updatedDrafts = [...drafts];
      updatedDrafts[selectedDraft] = {
        ...updatedDrafts[selectedDraft],
        content: EditorState.createWithContent(
          convertFromRaw(data.draftContentState)
        ),
      };
      dispatch({
        type: 'SET_DRAFTS',
        drafts: updatedDrafts,
        editorState: updatedDrafts[selectedDraft].content,
      });
      dispatch({ type: 'SET_FIELD', field: 'openSnackbar', value: true });
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
    } finally {
      dispatch({ type: 'TOGGLE_LOADING' });
    }
  };
  const formik = useFormikCoverLetter(onSubmit);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          {formFields.map((field) => (
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
              setEditorState={(state) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'editorState',
                  value: state,
                })
              }
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
              onClick={() =>
                dispatch({ type: 'UPDATE_DRAFT', index: selectedDraft })
              }
              sx={{ mt: 2, mb: 2, width: '33.3%' }}
              disabled={loading}
              startIcon={<EditIcon />}
            >
              Rename Draft
            </Button>
            {/* DELETE A DRAFT */}
            <Button
              variant="contained"
              color="error"
              onClick={() =>
                dispatch({ type: 'DELETE_DRAFT', index: selectedDraft })
              }
              sx={{ mt: 2, mb: 2, width: '33.3%' }}
              disabled={loading}
              startIcon={<DeleteIcon />}
            >
              Delete Draft
            </Button>
            {/* SAVE A DRAFT */}
            <Button
              variant="contained"
              color="info"
              onClick={() => handleSaveDraft(selectedDraft)}
              sx={{ mt: 2, mb: 2, width: '33.3%' }}
              disabled={loading}
              startIcon={<SaveIcon />}
            >
              Save Draft
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </form>
  );
}

export default CoverLetterForm;
