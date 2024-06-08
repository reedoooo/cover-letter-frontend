import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import { useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDraft } from 'api';
import { AddIcon, LinkedInIcon, UploadFileIcon } from 'assets/humanIcons';
import formFieldsConfigs from 'config/formFieldsConfigs';
import useFileUpload from 'hooks/useFileUpload';
import useFormikSchema from 'hooks/useFormikSchema';
import useFormSubmit from 'hooks/useFormSubmit';
import useMode from 'hooks/useMode';
import useNotification from 'hooks/useNotification';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-quill/dist/quill.snow.css';
import constants from '../config/constants';
import {
  removeDraft,
  setFormValues,
  setGeneratedPdfUrl,
  setLinkedInUrl,
  setResFormat,
  setResText,
} from '../store/Reducers/draftSlice';
// import CoverLetterFormLinkedInSection from './CoverLetterFormLinkedInSection';
// import CoverLetterFormResumeUpload from './CoverLetterFormResumeUpload';
// import CoverLetterFormResumeUploadPreview from './CoverLetterFormResumeUploadPreview';
// import CoverLetterFormSubmitButton from './CoverLetterFormSubmitButton';
import FormContainerWithBackdrop from './layout/FormContainerWithBackdrop';
import FormFields from './layout/FormFields';
import ResultPreview from './ResultPreview';
import {
  PdfPreviewContainer,
  ScrollablePaper,
  StyledIconContainer,
} from './styled';
import { RCBox, RCButton } from './themed';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function CoverLetterForm() {
  const dispatch = useDispatch();
  const {
    selectedDraftIndex,
    loading,
    drafts,
    isAuthenticated,
    formDisabled,
    initAddContentVisible,
  } = useSelector(state => state.drafts);
  const { theme } = useMode();
  const { coverLetterConfigs } = formFieldsConfigs;
  const { formSubmitHandler } = useFormSubmit();
  const { addNotification } = useNotification();
  const { file, fileUrl, fileText, handleFileUpload } = useFileUpload(
    values => {
      dispatch(setFormValues(values));
    }
  );
  const handleSubmit = async values => {
    const result = await formSubmitHandler({
      values,
      file,
      text: fileText,
      url: fileUrl,
      linkedInUrl:
        drafts[selectedDraftIndex]?.linkedInUrl ||
        constants.DEFAULT_LINKEDIN_URL,
      drafts,
      selectedDraftIndex,
      dispatch,
    });
    if (result && result.content.pdf) {
      dispatch(setGeneratedPdfUrl({ pdfUrl: result.content.pdf }));
    }
  };

  const handleDeleteDraft = useCallback(
    async draftId => {
      try {
        await deleteDraft(draftId);
        dispatch(removeDraft(draftId));
      } catch (error) {
        console.error('Error deleting draft:', error);
      }
    },
    [dispatch]
  );

  const handleLinkedInSubmit = e => {
    e.preventDefault();
    const linkedInUrl =
      drafts[selectedDraftIndex]?.linkedInUrl || constants.DEFAULT_LINKEDIN_URL;
    dispatch(setLinkedInUrl({ linkedInUrl }));
    addNotification({
      color: 'info',
      icon: 'link',
      title: 'LinkedIn URL Submitted',
      dateTime: 'Just now',
      content: 'Your LinkedIn URL has been successfully submitted.',
    });
  };

  return (
    <FormContainerWithBackdrop theme={theme}>
      <Grid container spacing={1}>
        {/* ================== Form Container ================== */}
        <Grid item xs={12} md={6}>
          <Grid
            container
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
              <CoverLetterFormResumeUpload
                resFormat={drafts[selectedDraftIndex]?.resFormat || 'Upload'}
                setResFormat={resFormat =>
                  dispatch(setResFormat({ resFormat }))
                }
                resText={drafts[selectedDraftIndex]?.resText || ''}
                setResText={resText => dispatch(setResText({ resText }))}
                handleFileUpload={handleFileUpload}
                theme={theme}
              />
            </Grid>
            <Grid
              component={Box}
              item
              xs={12}
              sm={12}
              md={6}
              sx={{ pl: theme.spacing(3) }}
            >
              <CoverLetterFormResumeUploadPreview
                fileUrl={fileUrl}
                theme={theme}
              />
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Formik
                  initialValues={drafts[selectedDraftIndex]?.formValues || {}}
                  enableReinitialize={true}
                  validationSchema={useFormikSchema('coverLetterConfigs')}
                  onSubmit={(values, actions) => {
                    actions.setSubmitting(true);
                    handleSubmit(values);
                    actions.setSubmitting(false);
                    actions.resetForm();
                  }}
                >
                  {formikProps => (
                    <Box component="form" onSubmit={formikProps.handleSubmit}>
                      <CoverLetterFormLinkedInSection
                        linkedInUrl={
                          drafts[selectedDraftIndex]?.linkedInUrl ||
                          constants.DEFAULT_LINKEDIN_URL
                        }
                        setLinkedInUrl={linkedInUrl =>
                          dispatch(
                            setLinkedInUrl({
                              linkedInUrl,
                            })
                          )
                        }
                        handleLinkedInSubmit={handleLinkedInSubmit}
                        theme={theme}
                      />
                      <ScrollablePaper theme={theme}>
                        <FormFields
                          configs={coverLetterConfigs}
                          formikProps={formikProps}
                          formValues={
                            drafts[selectedDraftIndex]?.formValues || {}
                          }
                          setFormValues={values =>
                            dispatch(setFormValues(values))
                          }
                        />
                      </ScrollablePaper>
                      <CoverLetterFormSubmitButton
                        loading={loading}
                        theme={theme}
                      />
                    </Box>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* ================== Preview Container ================== */}
        <Grid item xs={12} md={6}>
          <ResultPreview
            loading={loading}
            generatedPdfUrl={drafts[selectedDraftIndex]?.generatedPdfUrl}
            drafts={drafts}
            selectedDraftIndex={selectedDraftIndex}
            dispatch={dispatch}
            handleDeleteDraft={handleDeleteDraft}
          />
        </Grid>
      </Grid>
    </FormContainerWithBackdrop>
  );
}

const CoverLetterFormResumeUpload = ({
  resFormat,
  resText,
  handleFileUpload,
  theme,
}) => (
  <>
    <FormControl component="fieldset">
      <FormLabel component="legend">
        Do you want to upload or paste your resume/key experience?
      </FormLabel>
      <RadioGroup
        aria-label="resume format"
        name="resFormat"
        value={resFormat}
        onChange={e => setResFormat(e.target.value)}
        row
      >
        <FormControlLabel value="Upload" control={<Radio />} label="Upload" />
        <FormControlLabel value="Paste" control={<Radio />} label="Paste" />
      </RadioGroup>
    </FormControl>
    {resFormat === 'Upload' ? (
      <RCBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
          mt: 4,
          mb: 6, // Add margin bottom to create space
        }}
      >
        <RCButton
          variant="contained"
          component="label"
          color="primary"
          textSizeVariant="button"
          textWeightVariant="bold"
          withContainer={false}
          startIcon={
            <StyledIconContainer
              theme={theme}
              sx={{
                borderRadius: `${theme.spacing(2)} !important`,
              }}
            >
              <UploadFileIcon />
            </StyledIconContainer>
          }
          sx={{
            p: 2,
            width: '100%',
            justifyContent: 'flex-start',
            mx: '1rem',
            '& .MuiButton-startIcon': {
              marginLeft: 0,
              marginRight: '1rem',
            },
          }}
        >
          Upload Resume
          <input
            type="file"
            hidden
            onChange={handleFileUpload}
            accept="application/pdf"
          />
        </RCButton>
      </RCBox>
    ) : (
      <TextField
        fullWidth
        label="Pasted resume elements"
        value={resText}
        onChange={e => setResText(e.target.value)}
        multiline
        rows={4}
        margin="normal"
      />
    )}
  </>
);

const CoverLetterFormResumeUploadPreview = ({ fileUrl, theme }) =>
  fileUrl ? (
    <PdfPreviewContainer theme={theme}>
      <Document file={fileUrl}>
        <Page pageNumber={1} width={300} />
      </Document>
    </PdfPreviewContainer>
  ) : (
    <Paper>
      <Skeleton variant="rectangular" height={250} />
    </Paper>
  );

const CoverLetterFormLinkedInSection = ({
  linkedInUrl,
  handleLinkedInSubmit,
  setLinkedInUrl,
  theme,
}) => (
  <Grid container>
    <Grid item xs={12} md={6}>
      <RCButton
        variant="contained"
        color="primary"
        onClick={handleLinkedInSubmit}
        textSizeVariant="button"
        textWeightVariant="bold"
        startIcon={
          <StyledIconContainer
            theme={theme}
            sx={{ borderRadius: `${theme.spacing(2)} !important` }}
          >
            <LinkedInIcon />
          </StyledIconContainer>
        }
        sx={{
          ml: 2,
          p: 2,
          width: '97.5%',
          justifyContent: 'flex-start',
          // mx: '1rem',
          '& .MuiButton-startIcon': {
            marginLeft: 0,
            marginRight: '1rem',
          },
        }}
      >
        LinkedIn URL
      </RCButton>
    </Grid>
    <Grid item xs={12} md={6}>
      <RCBox sx={{ mt: 1, mr: 4, p: 2, width: '100%' }}>
        <TextField
          id="linkedInUrl"
          label="LinkedIn URL"
          name="linkedInUrl"
          variant="outlined"
          value={linkedInUrl}
          onChange={e => setLinkedInUrl(e.target.value)}
          sx={{
            fontSize: '1rem',
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'green' },
              '&:hover fieldset': { borderColor: 'darkgreen' },
              '&.Mui-focused fieldset': {
                borderColor: 'darkgreen',
              },
            },
          }}
        />
      </RCBox>
    </Grid>
  </Grid>
);

const CoverLetterFormSubmitButton = ({ loading, theme }) => (
  <RCButton
    variant="contained"
    color="primary"
    type="submit"
    textSizeVariant="header"
    textWeightVariant="bold"
    size="large"
    sx={{ width: '100%', mt: 2 }}
    disabled={loading}
    startIcon={
      <StyledIconContainer
        theme={theme}
        sx={{ borderRadius: `${theme.spacing(2)} !important` }}
      >
        <AddIcon color="white" />
      </StyledIconContainer>
    }
  >
    Generate Cover Letter
  </RCButton>
);

export default CoverLetterForm;
