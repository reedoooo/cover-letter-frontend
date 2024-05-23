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
        content: {
          name: draft.name || 'Untitled Draft',
          pdf: draft.content.pdf || '', // Raw HTML content
          text: draft.content.text || '', // Raw HTML content
          html: draft.content.html || '', // Raw HTML content
          blocks: draft.content.blocks || '', // Raw HTML content
        },
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
      content: {
        name: draft.name || 'Untitled Draft',
        pdf: draft.content.pdf || '', // Raw HTML content
        text: draft.content.text || '', // Raw HTML content
        html: draft.content.html || '', // Raw HTML content
        blocks: draft.content.blocks || '', // Raw HTML content
      },
    }));
    localStorage.setItem('coverLetterDrafts', JSON.stringify(rawDrafts));
  };

  return {
    loadDraftsFromLocalStorage,
    saveDraftsToLocalStorage,
  };
};

export default useDraft;
