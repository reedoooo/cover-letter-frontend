import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import ReactQuill from 'react-quill';
import PaperCard from 'components/common/PaperCard';
import 'react-quill/dist/quill.snow.css';
import 'react-calendar/dist/Calendar.css';

const AdditionalConfigs = {
  default: {
    clipboard: {
      matchVisual: false,
    },
  },
  markdown: {
    QuillMarkdown: {
      ignoreTags: ['pre', 'strikethrough'],
      tags: {
        blockquote: {
          pattern: /^(\|){1,6}\s/g,
        },
        bold: {},
        italic: {
          pattern: /(_){1}(.+?)(?:\1){1}/g,
        },
      },
    },
  },
  custom: {},
};

const ToolbarOptions = {
  default: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  markdown: [
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image'],
  ],
  custom: [[{ list: 'ordered' }, { list: 'bullet' }], ['link']],
};

const TextEditorVariants = {
  default: {},
  markdown: {},
  custom: {},
};

const TextEditor = ({ variant = 'markdown', content, setContent }) => {
  // Configure modules based on variant
  const modules = {
    toolbar: ToolbarOptions[variant],
    ...AdditionalConfigs[variant],
  };

  return (
    <Box sx={{ width: '100%', mb: 4 }}>
      <ReactQuill
        theme="snow"
        formats={[
          'header',
          'font',
          'size',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'video',
        ]}
        placeholder="Write something amazing..."
        modules={modules}
        onChange={setContent}
        value={content}
      />
    </Box>
  );
};

export default TextEditor;
