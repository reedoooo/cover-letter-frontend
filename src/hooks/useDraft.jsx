import { actionTypes } from './useDraftReducer';

const useDraft = () => {
  /**
   * Loads drafts from local storage and dispatches an action to set the drafts.
   * @param {function} dispatch - The dispatch function from the Redux store.
   */
  const loadDraftsFromLocalStorage = (dispatch) => {
    const savedDrafts = localStorage.getItem('coverLetterDrafts');
    if (savedDrafts) {
      const loadedDrafts = JSON.parse(savedDrafts).map((draft) => ({
        ...draft,
        name: draft.name || 'Untitled Draft',
        content: draft.content || '', // Raw HTML content
        pdfUrl: draft.pdfUrl || '', // PDF URL
      }));
      dispatch({ type: actionTypes.SET_DRAFTS, drafts: loadedDrafts });
    }
  };

  /**
   * Saves the drafts to local storage.
   *
   * @param {Array} drafts - The array of drafts to be saved.
   */
  const saveDraftsToLocalStorage = (drafts) => {
    const rawDrafts = drafts?.map((draft) => ({
      ...draft,
      content: draft.content || '', // Raw HTML content
      pdfUrl: draft.pdfUrl || '', // PDF URL
    }));
    localStorage.setItem('coverLetterDrafts', JSON.stringify(rawDrafts));
  };

  return {
    loadDraftsFromLocalStorage,
    saveDraftsToLocalStorage,
  };
};

export default useDraft;
