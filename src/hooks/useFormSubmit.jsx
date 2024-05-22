import axios from 'axios';
import { useState, useCallback } from 'react';
import { useApiService } from './useApiService';

const useFormSubmit = () => {
  const formSubmitHandler = async ({
    values,
    file,
    text,
    url,
    linkedInUrl,
    drafts,
    selectedDraft,
    dispatch,
    actionTypes,
  }) => {
    if (!drafts[selectedDraft]?.name) {
      return alert('Please name your draft first');
    }

    dispatch({ type: actionTypes.TOGGLE_LOADING });

    try {
      const formData = new FormData();
      const keys = Object.keys(values);

      const rawInputValues = keys.map((key) => {
        return {
          key,
          value: values[key],
        };
      });
      console.log(`[RAW INPUT VALUES IS TYPE]: ${typeof rawInputValues}`);
      console.log(`[RAW INPUT VALUES]: ${JSON.stringify(rawInputValues)}`);
      formData.append('rawInputValues', JSON.stringify(rawInputValues));
      if (file) {
        console.log(`[FILE IS TYPE]: ${typeof file}`);
        formData.append('pdfFile', file);
      }
      if (text) {
        console.log(`[TEXT IS TYPE]: ${typeof text}`);
        formData.append('pdfText', text);
      }
      if (url) {
        console.log(`[URL IS TYPE]: ${typeof url}`);
        formData.append('pdfUrl', url);
      }
      console.log(`[LINKEDIN URL IS TYPE]: ${typeof linkedInUrl}`);
      formData.append('linkedInUrl', linkedInUrl);

      const { data } = await useApiService.post(
        '/cover-letter/generate-cover-letter',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { message, resPdfUrl, resText, resHTML, resBlock, metadata } = data;

      const updatedDrafts = [...drafts];
      updatedDrafts[selectedDraft] = {
        ...updatedDrafts[selectedDraft],
        name: drafts[selectedDraft]?.name || values?.name,
        rawInputValues: values,
        pdfUrl: url,
        // SERVER RESPONSE DATA
        content: resHTML,
        pdfText: resText,
        resSuccess: true,
        resError: false,
        resMessage: message,
        resText: resText,
        resPdfUrl: resPdfUrl,
        resHtml: resHTML,
        resBlock: resBlock,
        resMetadata: metadata,
      };
      localStorage.setItem(
        'selectedDraft',
        JSON.stringify(updatedDrafts[selectedDraft])
      );
      dispatch({ type: actionTypes.SET_DRAFTS, drafts: updatedDrafts });
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
    } finally {
      dispatch({ type: actionTypes.TOGGLE_LOADING });
    }
  };
  return { formSubmitHandler };
};

export default useFormSubmit;
// const newDraft = {
//   // SET DATA FOR SERVER REQUEST
//   name: drafts[selectedDraft]?.name,
//   linkedInUrl: linkedInUrl,
//   pdfFile: '', // Raw HTML content
//   pdfText: '', //
//   pdfUrl: '', // PDF URL
//   rawInputValues: {}, // Raw input values
//   // FIELDS FOR SERVER RESPONSE
//   resSuccess: false,
//   resError: false,
//   resMessage: '',
//   resText: '',
//   resPdfUrl: '',
//   resHtml: '',
// };

//       if (file) {
//         formData.append('pdfFile', file);
//       }
//       if (text) {
//         formData.append('pdfText', text);
//       } else if (url) {
//         formData.append('pdfUrl', url);
//       }
//       console.log(
//         `[CHECKING DATA BEFORE SENDING TO API]: ${formData.get('pdfFile')}`
//       );
//       console.log(
//         `[CHECKING DATA BEFORE SENDING TO API]: ${formData.get('pdfText')}`
//       );
//       console.log(
//         `[CHECKING DATA BEFORE SENDING TO API]: ${formData.get('name')}`
//       );
//       const { data } = await axios.post(
//         `${process.env.REACT_APP_API_URL}/cover-letter/generate-cover-letter`,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       const updatedDrafts = [...drafts];
//       updatedDrafts[selectedDraft] = {
//         ...updatedDrafts[selectedDraft],
//         name: drafts[selectedDraft]?.name || values?.name,
//         content: data.coverLetterHtml, // Raw HTML content
//         pdfUrl: data.pdfUrl, // PDF URL
//         rawInputValues: values, // Raw input values
//       };

//       dispatch({ type: actionTypes.SET_DRAFTS, drafts: updatedDrafts });
//     } catch (error) {
//       console.error('Failed to generate cover letter:', error);
//     } finally {
//       setLoading(false);
//       dispatch({ type: actionTypes.TOGGLE_LOADING });
//     }
//   },
//   [dispatch, actionTypes, drafts, selectedDraft]
// );
