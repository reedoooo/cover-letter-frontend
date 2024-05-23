// components/CoverLetterForm.jsx
import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import 'react-quill/dist/quill.snow.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Grid, Box } from '@mui/material';

import { Formik } from 'formik';
import useFormSubmit from 'hooks/useFormSubmit';
import useMode from 'hooks/useMode';
import useFormikSchema from 'hooks/useFormikSchema';
import useFileUpload from 'hooks/useFileUpload';

import formFieldsConfigs from 'config/formFieldsConfigs';
import constants from '../config/constants';

import { ScrollablePaper } from './styled';

import FormContainerWithBackdrop from './layout/FormContainerWithBackdrop';
import FormFields from './layout/FormFields';

import CoverLetterFormLinkedInSection from './CoverLetterFormLinkedInSection';
import CoverLetterFormResumeUpload from './CoverLetterFormResumeUpload';
import CoverLetterFormResumeUploadPreview from './CoverLetterFormResumeUploadPreview';
import CoverLetterFormSubmitButton from './CoverLetterFormSubmitButton';
import ResultPreview from './ResultPreview';

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
  handleDeleteDraft,
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
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState(null);

  const { file, fileUrl, fileText, handleFileUpload } =
    useFileUpload(setFormValues);

  const handleSubmit = async (values) => {
    const result = await formSubmitHandler({
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

    if (result && result.content.pdf) {
      setGeneratedPdfUrl(result.content.pdf);
    }
  };

  const handleLinkedInSubmit = (e) => {
    e.preventDefault();
    console.log('LinkedIn URL submitted:', linkedInUrl);
  };

  return (
    <FormContainerWithBackdrop
      theme={theme}
      formDisabled={formDisabled}
      actionTypes={actionTypes}
      dispatch={dispatch}
    >
      <Grid container spacing={1}>
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
                resFormat={resFormat}
                setResFormat={setResFormat}
                resText={resText}
                setResText={setResText}
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
                    <CoverLetterFormLinkedInSection
                      linkedInUrl={linkedInUrl}
                      setLinkedInUrl={setLinkedInUrl}
                      handleLinkedInSubmit={handleLinkedInSubmit}
                      theme={theme}
                    />
                    <ScrollablePaper theme={theme}>
                      <FormFields
                        configs={coverLetterConfigs}
                        formikProps={formikProps}
                        formValues={formValues}
                        setFormValues={setFormValues}
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
            generatedPdfUrl={generatedPdfUrl}
            drafts={drafts}
            selectedDraft={selectedDraft}
            dispatch={dispatch}
            actionTypes={actionTypes}
            handleDeleteDraft={handleDeleteDraft}
          />
        </Grid>
      </Grid>
    </FormContainerWithBackdrop>
  );
}

export default CoverLetterForm;
