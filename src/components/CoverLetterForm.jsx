// components/CoverLetterForm.jsx
import React, { useState, Suspense } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-quill/dist/quill.snow.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {
  Typography,
  CircularProgress,
  TextField,
  Grid,
  Box,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Backdrop,
  Skeleton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Formik } from 'formik';
import useFormSubmit from 'hooks/useFormSubmit';
import useMode from 'hooks/useMode';
import EditorActions from './EditorActions';
import { DraftEditorSkeleton } from 'utils/SkeletonComponents';
import useFormikSchema from 'hooks/useFormikSchema';
import RCButton from './themed/RCButton';
import {
  EditorContainer,
  FormContainer,
  PdfPreviewContainer,
  ScrollablePaper,
  StyledIconContainer,
} from './styled';
import RCTypography from './themed/RCTypography';
import RCBox from './themed/RCBox';
import formFieldsConfigs from 'config/formFieldsConfigs';
import useFileUpload from 'hooks/useFileUpload';
import constants from '../config/constants';
// import * as pdfjsLib from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
function CoverLetterForm({
  selectedDraft,
  loading,
  actionTypes,
  drafts,
  dispatch,
  isAuthenticated,
  formDisabled,
}) {
  const { theme } = useMode();
  const { coverLetterConfigs } = formFieldsConfigs;
  const { formSubmitHandler } = useFormSubmit();

  const [linkedInUrl, setLinkedInUrl] = useState(
    constants.DEFAULT_LINKEDIN_URL
  );
  const [resFormat, setResFormat] = useState('Upload');
  const [resText, setResText] = useState('');
  const [formValues, setFormValues] = useState(
    coverLetterConfigs.reduce(
      (values, field) => ({ ...values, [field.name]: '' }),
      {}
    )
  );

  const { file, fileUrl, fileText, handleFileUpload } =
    useFileUpload(setFormValues);
  const handleSubmit = async (values) => {
    await formSubmitHandler({
      values,
      file,
      text: fileText,
      url: fileUrl,
      linkedInUrl,
      drafts,
      selectedDraft,
      dispatch,
      actionTypes,
    });
  };
  const handleLinkedInSubmit = (e) => {
    e.preventDefault();
    console.log('LinkedIn URL submitted:', linkedInUrl);
  };

  const renderFormFields = (formikProps) => {
    return coverLetterConfigs.map((field) => {
      const fieldProps = formikProps.getFieldProps(field.name);
      const fieldError = formikProps.errors[field.name];
      const fieldTouched = formikProps.touched[field.name];
      const fieldDirty = !!fieldProps.value;
      const successCondition = fieldDirty && !fieldError;
      const errorCondition = fieldTouched && fieldError;

      return (
        <TextField
          id={field.name}
          label={field.label}
          name={field.name}
          variant="outlined"
          fullWidth
          key={field.name}
          {...fieldProps}
          value={formValues[field.name]}
          error={fieldTouched && Boolean(fieldError)}
          helperText={fieldTouched && fieldError}
          // eslint-disable-next-line max-len
          className={`${fieldDirty && !fieldError ? 'dirty' : ''} ${successCondition ? 'success' : ''} ${errorCondition ? 'error' : ''}`}
          onBlur={() => formikProps.setFieldTouched(field.name, true)}
          onChange={(e) => {
            formikProps.handleChange(e);
            setFormValues({
              ...formValues,
              [e.target.name]: e.target.value,
            });
          }}
        />
      );
    });
  };

  return (
    <FormContainer theme={theme} maxwidth="lg">
      <Box sx={{ position: 'relative' }}>
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: formDisabled ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          open={formDisabled}
        >
          <Paper sx={{ padding: theme.spacing(4), textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Create a new cover letter to get started
            </Typography>
            <RCButton
              variant="contained"
              onClick={() =>
                dispatch({ type: actionTypes.TOGGLE_ADD_DRAFT_DIALOG })
              }
            >
              Create New Cover Letter
            </RCButton>
          </Paper>
        </Backdrop>

        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            {/* <RCBox>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Preview
              </Typography>
            </RCBox> */}
            <Grid
              container
              // spacing={1}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                padding: theme.spacing(2),
                marginRight: theme.spacing(2),
              }}
            >
              <Grid component={Box} item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Do you want to upload or paste your resume/key experience?
                  </FormLabel>
                  <RadioGroup
                    aria-label="resume format"
                    name="resFormat"
                    value={resFormat}
                    onChange={(e) => setResFormat(e.target.value)}
                    row
                  >
                    <FormControlLabel
                      value="Upload"
                      control={<Radio />}
                      label="Upload"
                    />
                    <FormControlLabel
                      value="Paste"
                      control={<Radio />}
                      label="Paste"
                    />
                  </RadioGroup>
                </FormControl>
                {resFormat === 'Upload' ? (
                  <RCBox
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      width: '100%',
                      alignItems: 'center',
                      mt: theme.spacing(12),
                    }}
                  >
                    <RCButton
                      variant="contained"
                      component="label"
                      color="primary"
                      // onClick={handleLinkedInSubmit}
                      sx={{
                        px: theme.spacing(1),
                        width: '100%',
                      }}
                    >
                      Upload Resume
                      <input
                        type="file"
                        hidden
                        onChange={handleFileUpload}
                        accept="application/pdf"
                      />
                      {/* </Typography> */}
                    </RCButton>
                  </RCBox>
                ) : (
                  <TextField
                    fullWidth
                    label="Pasted resume elements"
                    value={resText}
                    onChange={(e) => setResText(e.target.value)}
                    multiline
                    rows={4}
                    margin="normal"
                  />
                )}
              </Grid>

              <Grid
                component={Box}
                item
                xs={12}
                sm={12}
                md={6}
                sx={{
                  pl: theme.spacing(3),
                }}
              >
                {fileUrl ? (
                  <PdfPreviewContainer theme={theme}>
                    <Document file={fileUrl}>
                      <Page pageNumber={1} width={300} />
                    </Document>
                  </PdfPreviewContainer>
                ) : (
                  <Paper>
                    <Skeleton variant="rectangular" height={250} />
                  </Paper>
                )}
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Formik
                  initialValues={formValues}
                  enableReinitialize={true}
                  validationSchema={useFormikSchema('coverLetterConfigs')}
                  onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    console.log('Submitting...');
                    handleSubmit(values, file, fileText, fileUrl, linkedInUrl);
                    console.log('Submitted...');
                    actions.setSubmitting(false);
                    actions.resetForm();
                  }}
                >
                  {(formikProps) => (
                    <Box component="form" onSubmit={formikProps.handleSubmit}>
                      <RCBox
                        component={Grid}
                        container
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                          height: '100%',
                        }}
                      >
                        <Grid item xs={12} md={6}>
                          <RCButton
                            variant="contained"
                            color="primary"
                            onClick={handleLinkedInSubmit}
                            sx={{
                              mt: theme.spacing(4),
                              ml: theme.spacing(2),
                              p: theme.spacing(2),
                              width: '97.5%',
                            }}
                          >
                            <Typography
                              variant="button"
                              color="white"
                              sx={{
                                width: '100%',
                                py: theme.spacing(2),
                                fontWeight: 500,
                                fontSize: '1rem',
                                textTransform: 'none',
                                letterSpacing: '0.02rem',
                                lineHeight: '1.5rem',
                                textDecoration: 'none',
                                textShadow:
                                  '0 0.05rem 0.1rem rgba(0, 0, 0, 0.15)',
                              }}
                            >
                              Submit LinkedIn URL
                            </Typography>
                          </RCButton>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <RCBox
                            sx={{
                              mt: theme.spacing(1),
                              mr: theme.spacing(4),
                              p: theme.spacing(2),
                              width: '100%',
                            }}
                          >
                            <TextField
                              id="linkedInUrl"
                              label="LinkedIn URL"
                              name="linkedInUrl"
                              variant="outlined"
                              value={linkedInUrl}
                              onChange={(e) => setLinkedInUrl(e.target.value)}
                              sx={{
                                fontSize: '1rem',
                                width: '100%',
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'green',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'darkgreen',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: 'darkgreen',
                                  },
                                },
                              }}
                            />
                          </RCBox>
                        </Grid>
                      </RCBox>
                      <ScrollablePaper theme={theme}>
                        {renderFormFields(formikProps)}
                      </ScrollablePaper>
                      <RCButton
                        variant="gradient"
                        color="success"
                        type="submit"
                        sx={{ width: '100%', mt: 2 }}
                        disabled={loading}
                        startIcon={
                          <StyledIconContainer theme={theme}>
                            <AddIcon color="white" />
                          </StyledIconContainer>
                        }
                      >
                        <RCTypography variant="button" color="white">
                          Generate Cover Letter
                        </RCTypography>
                      </RCButton>
                    </Box>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
          {/* ================ PREVIEW OF RESPONSE DATA ================ */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(80vh - 96px)',
            }}
          >
            <RCBox>
              <Typography variant="h4" sx={{ mb: 2 }}>
                Preview
              </Typography>
            </RCBox>
            <Suspense fallback={<DraftEditorSkeleton />}>
              <EditorContainer
                theme={theme}
                sx={{
                  // width: '210mm',
                  height: '297mm',
                  // padding: theme.spacing(2),
                  boxSizing: 'border-box',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  overflowY: 'auto',
                  backgroundColor: 'white',
                }}
              >
                {loading ? (
                  <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />
                ) : (
                  <Typography
                    component="div"
                    dangerouslySetInnerHTML={{
                      __html: drafts[selectedDraft]?.resText,
                    }}
                  />
                )}
              </EditorContainer>
            </Suspense>
            <EditorActions
              loading={loading}
              handleDraftEdit={() =>
                dispatch({
                  type: actionTypes.EDIT_DRAFT,
                  index: selectedDraft,
                })
              }
              handleDraftDelete={() =>
                dispatch({
                  type: actionTypes.DELETE_DRAFT,
                  index: selectedDraft,
                })
              }
              handleDraftSave={() => {
                console.log('Saving draft');
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </FormContainer>
  );
}

export default CoverLetterForm;
