// // useDraft.js
// import { useEffect } from 'react';
// import { useLocalStorage } from 'react-use';
// import { useDispatch } from 'react-redux';

// import { setDrafts } from '../store/Reducers/draftSlice';

// const useDraft = () => {
//   const dispatch = useDispatch();
//   const [storedDrafts, setStoredDrafts] = useLocalStorage(
//     'coverLetterDrafts',
//     []
//   );
//   const userDrafts =
//     JSON.parse(localStorage.getItem('user'))?.coverLetters || [];

//   useEffect(() => {
//     if (storedDrafts) {
//       const allDrafts = Array.from(new Set([...userDrafts, ...storedDrafts]));
//       const loadedDrafts = allDrafts.map((draft) => ({
//         ...draft,
//         title: draft.content.name || draft.title || 'Untitled Draft',
//         content: {
//           name: draft.content.name || draft.title || 'Untitled Draft',
//           pdf: draft.content.pdf || '',
//           text: draft.content.text || '',
//           html: draft.content.html || '',
//           blocks: draft.content.blocks || [],
//           metadata: draft.content.metadata || {},
//         },
//       }));
//       dispatch(setDrafts(loadedDrafts));
//     }
//   }, [dispatch, storedDrafts, userDrafts]);

//   const saveDraftsToLocalStorage = (drafts) => {
//     const rawDrafts = drafts.map((draft) => ({
//       ...draft,
//       title: draft.content.name || draft.title || 'Untitled Draft',
//       content: {
//         name: draft.content.name || draft.title || 'Untitled Draft',
//         pdf: draft.content.pdf || '',
//         text: draft.content.text || '',
//         html: draft.content.html || '',
//         blocks: draft.content.blocks || [],
//         metadata: draft.content.metadata || {},
//       },
//     }));
//     setStoredDrafts(rawDrafts);
//   };

//   return {
//     saveDraftsToLocalStorage,
//   };
// };

// export default useDraft;

// // import { actionTypes } from './useDraftReducer';

// // const useDraft = () => {
// //   /**
// //    * Loads drafts from local storage and dispatches an action to set the drafts.
// //    * @param {function} dispatch - The dispatch function from the Redux store.
// //    */
// //   const loadDraftsFromLocalStorage = (dispatch) => {
// //     const savedDrafts = JSON.parse(localStorage.getItem('coverLetterDrafts'));
// //     const draftsLoadedFromUser =
// //       JSON.parse(localStorage.getItem('user'))?.coverLetters || [];
// //     if (savedDrafts) {
// //       const allDrafts = Array.from(
// //         new Set([...draftsLoadedFromUser, ...savedDrafts])
// //       );
// //       const loadedDrafts = allDrafts.map((draft) => ({
// //         ...draft,
// //         title: draft.content.name || draft.title || 'Untitled Draft',
// //         content: {
// //           name: draft.content.name || draft.title || 'Untitled Draft',
// //           pdf: draft.content.pdf || '', // Raw HTML content
// //           text: draft.content.text || '', // Raw HTML content
// //           html: draft.content.html || '', // Raw HTML content
// //           blocks: draft.content.blocks || [], // Raw HTML content
// //           metadata: draft.content.metadata || {}, // Raw HTML content
// //         },
// //       }));
// //       dispatch({ type: actionTypes.SET_DRAFTS, drafts: loadedDrafts });
// //     }
// //   };

// //   /**
// //    * Saves the drafts to local storage.
// //    *
// //    * @param {Array} drafts - The array of drafts to be saved.
// //    */
// //   const saveDraftsToLocalStorage = (drafts) => {
// //     const rawDrafts = drafts?.map((draft) => ({
// //       ...draft,
// //       title: draft.content.name || draft.title || 'Untitled Draft',
// //       content: {
// //         name: draft.content.name || draft.title || 'Untitled Draft',
// //         pdf: draft.content.pdf || '', // Raw HTML content
// //         text: draft.content.text || '', // Raw HTML content
// //         html: draft.content.html || '', // Raw HTML content
// //         blocks: draft.content.blocks || [], // Raw HTML content
// //         metadata: draft.content.metadata || {}, // Raw HTML content
// //       },
// //     }));
// //     localStorage.setItem('coverLetterDrafts', JSON.stringify(rawDrafts));
// //   };

// //   return {
// //     loadDraftsFromLocalStorage,
// //     saveDraftsToLocalStorage,
// //   };
// // };

// // export default useDraft;
