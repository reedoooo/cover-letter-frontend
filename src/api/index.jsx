import useApiService from 'hooks/useApiService';
import constants from 'config/constants';

const { API_URL } = constants;

export const saveDraft = async (draft, contentName, userId) => {
  const content = {
    name: draft.name,
    pdf: draft.pdfUrl,
    text: draft.text,
    html: draft.html,
    blocks: draft.blocks,
    metadata: draft.metadata,
  };

  try {
    const response = await useApiService.post('/cover-letter/save-draft', {
      content,
      contentName,
      userId,
    });
    console.log('Draft saved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving draft:', error);
  }
};

export const updateDraft = async (draftId, content, contentName, userId) => {
  const endpoint = `${API_URL}/cover-letter/${draftId}`;
  const req = { content, contentName, userId };
  const response = await useApiService.put(endpoint, req);
  return response.data;
};

export const deleteDraft = async (draftId) => {
  const endpoint = `${API_URL}/cover-letter/${draftId}`;
  const response = await useApiService.delete(endpoint);
  return response.data;
};
