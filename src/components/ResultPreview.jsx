import { Box, CircularProgress, Paper } from '@mui/material';
import React, { Suspense, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveDraft } from 'api/index';
import useMode from 'hooks/useMode';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { updateDraft } from 'store/Reducers/draftSlice';
import { DraftEditorSkeleton } from 'utils/SkeletonComponents';
import ResultActions from './ResultAction';
import { EditorContainer } from './styled';
import RCBox from './themed/RCBox';
import RCTypography from './themed/RCTypography';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResultPreview = ({
  loading,
  generatedPdfUrl,
  drafts,
  selectedDraftIndex,
  dispatch,
  actionTypes,
  handleDeleteDraft,
}) => {
  const { theme } = useMode();
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const selectedDraftFromStorage = JSON.parse(
    localStorage.getItem('selectedDraft')
  );
  const userId = user?._id;
  const handleSaveDraft = async (content, contentName) => {
    try {
      const { draft } = await saveDraft(content, contentName, userId);
      dispatch({ type: actionTypes.SAVE_DRAFT, draft });
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };
  const handleUpdateDraft = async (draftId, content, contentName) => {
    try {
      const draft = await updateDraft(draftId, content, contentName, userId);
      dispatch({
        type: actionTypes.UPDATE_DRAFT,
        draft,
        index: selectedDraftIndex,
      });
    } catch (error) {
      console.error('Error updating draft:', error);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(80vh - 96px)',
      }}
    >
      <RCBox variant="contained" sx={{ mb: 2 }}>
        <Paper
          sx={{
            p: theme.spacing(2),
            m: theme.spacing(0.5),
            mt: theme.spacing(3),
            pb: theme.spacing(1),
            backgroundColor: theme.palette.grey[200],
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <RCTypography variant="h3" color="textSecondary" sx={{ mb: 2 }}>
            Preview:
          </RCTypography>
          <Box>
            {drafts[selectedDraftIndex]?.title ||
              selectedDraftFromStorage?.content?.name ||
              'Untitled'}
          </Box>
        </Paper>
      </RCBox>
      <Suspense fallback={<DraftEditorSkeleton />}>
        <EditorContainer sx={{ overflowY: 'auto' }} theme={theme}>
          {loading ? (
            <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />
          ) : (
            generatedPdfUrl && (
              <Document
                file={drafts[selectedDraftIndex]?.content?.pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                options={{
                  workerSrc: pdfjs.GlobalWorkerOptions.workerSrc,
                }}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            )
          )}
        </EditorContainer>
      </Suspense>
      <ResultActions
        loading={loading}
        draftContent={drafts[selectedDraftIndex]}
        handleDraftEdit={() =>
          handleUpdateDraft(
            drafts[selectedDraftIndex]?._id,
            drafts[selectedDraftIndex]?.content,
            drafts[selectedDraftIndex]?.title
          )
        }
        handleDraftDelete={() =>
          handleDeleteDraft(drafts[selectedDraftIndex]?._id)
        }
        handleDraftSave={() =>
          handleSaveDraft(
            drafts[selectedDraftIndex]?.content,
            drafts[selectedDraftIndex]?.title
          )
        }
      />
    </Box>
  );
};

export default ResultPreview;
