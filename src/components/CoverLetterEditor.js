// components/CoverLetterEditor.js
import React from 'react';
import { Editor, RichUtils } from 'draft-js';

const CoverLetterEditor = ({ editorState, setEditorState }) => {
  const handleKeyCommand = (command, state) => {
    const newState = RichUtils.handleKeyCommand(state, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      handleKeyCommand={handleKeyCommand}
    />
  );
};

export default CoverLetterEditor;
