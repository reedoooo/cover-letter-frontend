import React, { useState, Suspense, useEffect } from 'react';
import { Typography, CircularProgress, Paper } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { DraftEditorSkeleton } from 'utils/SkeletonComponents';
import RCBox from './themed/RCBox';
import { EditorContainer } from './styled';
import useMode from 'hooks/useMode';
import ResultActions from './ResultAction';
import axios from 'axios';
import { deleteDraft, saveDraft, updateDraft } from 'api';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ResultPreview = ({
  loading,
  generatedPdfUrl,
  drafts,
  selectedDraft,
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
  const userId = user?._id;
  const handleSaveDraft = async (content, contentName) => {
    try {
      const data = await saveDraft(content, contentName, userId);
      console.log('Draft saved successfully:', data.draft);
      dispatch({
        type: actionTypes.SAVE_DRAFT,
        draft: data.draft,
      });
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  };

  const handleUpdateDraft = async (draftId, content, contentName) => {
    try {
      const data = await updateDraft(draftId, content, contentName, userId);
      dispatch({
        type: actionTypes.UPDATE_DRAFT,
        draft: data,
        index: selectedDraft,
      });
    } catch (error) {
      console.error('Error updating draft:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(80vh - 96px)',
      }}
    >
      <RCBox>
        <Paper>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Preview
          </Typography>
        </Paper>
      </RCBox>
      <Suspense fallback={<DraftEditorSkeleton />}>
        <EditorContainer sx={{ overflowY: 'auto' }} theme={theme}>
          {loading ? (
            <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />
          ) : (
            generatedPdfUrl && (
              <Document
                file={drafts[selectedDraft]?.content?.pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                options={{ workerSrc: pdfjs.GlobalWorkerOptions.workerSrc }}
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
        draftContent={drafts[selectedDraft]}
        handleDraftEdit={() =>
          handleUpdateDraft(
            drafts[selectedDraft]?._id,
            drafts[selectedDraft]?.content,
            drafts[selectedDraft]?.name
          )
        }
        handleDraftDelete={() => handleDeleteDraft(drafts[selectedDraft]?._id)}
        handleDraftSave={() =>
          handleSaveDraft(
            drafts[selectedDraft]?.content,
            drafts[selectedDraft]?.name
          )
        }
      />
    </div>
  );
};

export default ResultPreview;
