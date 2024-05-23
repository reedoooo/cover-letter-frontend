import React from 'react';
import { Document, Page } from 'react-pdf';
import { Paper, Skeleton } from '@mui/material';

import { PdfPreviewContainer } from './styled';

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

export default CoverLetterFormResumeUploadPreview;
