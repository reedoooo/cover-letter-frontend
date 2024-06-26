// hooks/useFileUpload.js
import formFieldsConfigs from 'config/formFieldsConfigs';
import { useState, useCallback } from 'react';
import { pdfjs } from 'react-pdf';

const useFileUpload = (setFormValues) => {
  const { coverLetterConfigs } = formFieldsConfigs;
  const [file, setFile] = useState({ preview: '', data: null });
  const [fileUrl, setFileUrl] = useState(null);
  const [fileText, setFileText] = useState('');

  const handleFileUpload = useCallback((e) => {
    const uploadedFile = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    if (uploadedFile) {
      console.log(`[FILE UPLOADED]: ${uploadedFile}`);
      setFile(uploadedFile);
      setFileUrl(uploadedFile.preview);
      extractTextFromPdf(uploadedFile.preview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extractTextFromPdf = useCallback(async (url) => {
    try {
      const loadingTask = pdfjs.getDocument(url);
      const pdf = await loadingTask.promise;
      let textContent = '';

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const text = await page.getTextContent();
        const strings = text.items.map((item) => item.str);
        textContent += strings.join(' ');
      }

      console.log('[PDF TEXT CONTENT]:', textContent);
      setFileText(textContent);
      autoFillFormFields(textContent);
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extractCoverLetterData = (textContent) => {
    const dataMap = {};

    coverLetterConfigs.forEach((field) => {
      const match = textContent.match(field.regex);
      if (match) {
        dataMap[field.name] = match[1] ? match[1].trim() : match[0].trim();
      } else {
        dataMap[field.name] = '';
      }
    });

    return dataMap;
  };

  const autoFillFormFields = useCallback(
    (text) => {
      const newValues = extractCoverLetterData(text);
      console.log('[NEW VALUES]:', newValues);
      setFormValues(newValues);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFormValues]
  );

  return { file, fileUrl, fileText, handleFileUpload };
};

export default useFileUpload;
