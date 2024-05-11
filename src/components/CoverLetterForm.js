import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css'; // include styles
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Box,
  Typography,
  Container,
  CircularProgress,
  TextField,
  Snackbar,
  Grid,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Editor,
  RichUtils,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from 'draft-js'; // Import conversion functions
const formFields = [
  { name: 'url', label: 'URL', type: 'text', message: 'URL is required' },
  {
    name: 'yourName',
    label: 'Your Name',
    type: 'text',
    message: 'Your name is required',
  },
  {
    name: 'address',
    label: 'Address',
    type: 'text',
    message: 'Address is required',
  },
  {
    name: 'cityStateZip',
    label: 'City, State, ZIP',
    type: 'text',
    message: 'City, State, ZIP is required',
  },
  {
    name: 'emailAddress',
    label: 'Email Address',
    type: 'email',
    message: 'Email is required',
  },
  {
    name: 'todayDate',
    label: "Today's Date",
    type: 'date',
    message: "Today's date is required",
  },
  {
    name: 'employerName',
    label: "Employer's Name",
    type: 'text',
    message: "Employer's name is required",
  },
  {
    name: 'companyName',
    label: 'Company Name',
    type: 'text',
    message: 'Company name is required',
  },
  {
    name: 'companyAddress',
    label: 'Company Address',
    type: 'text',
    message: 'Company address is required',
  },
  {
    name: 'companyCityStateZip',
    label: 'Company City, State, ZIP',
    type: 'text',
    message: 'Company city, state, ZIP is required',
  },
  {
    name: 'previousPosition',
    label: 'Previous Position',
    type: 'text',
    message: 'Previous position is required',
  },
  {
    name: 'previousCompany',
    label: 'Previous Company',
    type: 'text',
    message: 'Previous company is required',
  },
  {
    name: 'softwarePrograms',
    label: 'Software Programs',
    type: 'text',
    message: 'Software programs are required',
  },
  {
    name: 'jobTitle',
    label: 'Job Title',
    type: 'text',
    message: 'Job title is required',
  },
  {
    name: 'skills',
    label: 'Skills',
    type: 'text',
    message: 'Skills are required',
  },
  {
    name: 'reasons',
    label: 'Reasons',
    type: 'text',
    message: 'Reasons are required',
  },
];
const validationSchema = Yup.object(
  formFields.reduce(
    (schema, field) => ({
      ...schema,
      [field.name]: Yup.string().required(`${field.label} is required`),
    }),
    {},
  ),
);
function CoverLetterForm() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [drafts, setDrafts] = useState([]);
  const [selectedDraft, setSelectedDraft] = useState(0); // Managing selected draft
  const [coverLetter, setCoverLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: formFields.reduce(
      (values, field) => ({ ...values, [field.name]: '' }),
      {},
    ),
    validationSchema: validationSchema,
    onSubmit: async values => {
      setLoading(true);
      try {
        const content = convertToRaw(editorState.getCurrentContent());
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/generate-cover-letter`,
          { ...values, content },
        );
        setCoverLetter(data.coverLetter);
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
        setCoverLetter(
          'Failed to generate cover letter. Please try again later.',
        );
      } finally {
        setLoading(false);
      }
    },
  });
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
  const handleTabChange = (event, newValue) => {
    setSelectedDraft(newValue);
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Cover Letter Generator
        </Typography>
        <Tabs value={selectedDraft} onChange={handleTabChange}>
          {drafts.map((draft, index) => (
            <Tab key={index} label={`Draft ${index + 1}`} />
          ))}
          <Tab
            label="+"
            onClick={() => {
              const newDraft = {
                content: convertToRaw(
                  EditorState.createEmpty().getCurrentContent(),
                ),
              };
              const updatedDrafts = [...drafts, newDraft];
              setDrafts(updatedDrafts);
              setSelectedDraft(updatedDrafts.length - 1);
            }}
          />
        </Tabs>
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
              <Paper style={{ padding: 16 }}>
                <Typography variant="h6">Preview</Typography>
                {loading && <CircularProgress />}
                <Editor
                  editorState={editorState}
                  onChange={setEditorState}
                  handleKeyCommand={(command, state) => {
                    const newState = RichUtils.handleKeyCommand(state, command);
                    if (newState) {
                      setEditorState(newState);
                      return 'handled';
                    }
                    return 'not-handled';
                  }}
                />
              </Paper>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2, mb: 2 }}
              >
                Generate Cover Letter
              </Button>
            </Grid>
          </Grid>
        </form>
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

export default CoverLetterForm;
