import { Grid, Box } from '@mui/material';
import { Formik } from 'formik';
import React from 'react';
import { pdfjs } from 'react-pdf';
import 'react-quill/dist/quill.snow.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import formFieldsConfigs from 'config/formFieldsConfigs';
import useFileUpload from 'hooks/useFileUpload';
import useFormikSchema from 'hooks/useFormikSchema';
import useFormSubmit from 'hooks/useFormSubmit';
import useMode from 'hooks/useMode';
import useNotification from 'hooks/useNotification';

import constants from '../config/constants';
import {
  setFormValues,
  setLinkedInUrl,
  setResFormat,
  setResText,
  setGeneratedPdfUrl,
} from '../store/Reducers/draftSlice';
import CoverLetterFormLinkedInSection from './CoverLetterFormLinkedInSection';
import CoverLetterFormResumeUpload from './CoverLetterFormResumeUpload';
import CoverLetterFormResumeUploadPreview from './CoverLetterFormResumeUploadPreview';
import CoverLetterFormSubmitButton from './CoverLetterFormSubmitButton';
import FormContainerWithBackdrop from './layout/FormContainerWithBackdrop';
import FormFields from './layout/FormFields';
import ResultPreview from './ResultPreview';
import { ScrollablePaper } from './styled';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function CoverLetterForm({
  selectedDraftIndex,
  loading,
  drafts,
  dispatch,
  isAuthenticated,
  formDisabled,
  handleDeleteDraft,
  initAddContentVisible,
}) {
  const { theme } = useMode();
  const { coverLetterConfigs } = formFieldsConfigs;
  const { formSubmitHandler } = useFormSubmit();
  const { addNotification } = useNotification();
  const { file, fileUrl, fileText, handleFileUpload } = useFileUpload(
    (values) => {
      dispatch(setFormValues(values));
    },
  );

  const handleSubmit = async (values) => {
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

  const handleLinkedInSubmit = (e) => {
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
    <FormContainerWithBackdrop
      theme={theme}
      formDisabled={formDisabled}
      drafts={drafts}
      isAuthenticated={isAuthenticated}
      initAddContentVisible={initAddContentVisible}
    >
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
                setResFormat={(resFormat) =>
                  dispatch(setResFormat({ resFormat }))
                }
                resText={drafts[selectedDraftIndex]?.resText || ''}
                setResText={(resText) => dispatch(setResText({ resText }))}
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
                {(formikProps) => (
                  <Box component="form" onSubmit={formikProps.handleSubmit}>
                    <CoverLetterFormLinkedInSection
                      linkedInUrl={
                        drafts[selectedDraftIndex]?.linkedInUrl ||
                        constants.DEFAULT_LINKEDIN_URL
                      }
                      setLinkedInUrl={(linkedInUrl) =>
                        dispatch(setLinkedInUrl({ linkedInUrl }))
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
                        setFormValues={(values) =>
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

export default CoverLetterForm;
