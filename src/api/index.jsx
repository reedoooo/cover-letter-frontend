import constants from 'config/constants';
import useApiService from 'hooks/useApiService';

const { API_URL } = constants;

export const saveDraft = async (draftData, contentName, userId) => {
  const data = {
    name: draftData.title,
    pdf: draftData.pdf,
    text: draftData.text,
    html: draftData.html,
    blocks: draftData.blocks,
    metadata: draftData.metadata,
  };
  const draft = {
    title: contentName,
    content: data,
  };

  try {
    const response = await useApiService.post('/cover-letter/save-draft', {
      draft,
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
