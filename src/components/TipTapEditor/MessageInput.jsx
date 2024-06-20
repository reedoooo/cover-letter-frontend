import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
  Box,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState, useRef } from 'react';
import { CodeIcon, EmojiEmotionsIcon, SendIcon } from 'assets/humanIcons';
import useDialog from 'hooks/useDialog';
import useMenu from 'hooks/useMenu';
import APIModal from './menu/ApiModal';
import FileUpload from './menu/FileUpload';
import FormTemplatesDropDown from './menu/FormTemplatesDropDown';
import SettingsDialog from './menu/SettingsDialog';
import SnippetsDropDown from './menu/SnippetsDropDown';

const handleMarkdownInsert = editor => {
  editor.commands.insertContent(
    '<pre><code class="language-markdown"># Markdown Example\n\nThis is a code block with markdown styles.</code></pre>'
  );
};

const handleFormContentInsert = (editor, form) => {
  const formElements = {
    'Text input': '<input type="text" placeholder="Enter text here"/>',
    Checkbox: '<input type="checkbox"/> Checkbox',
    'Radio button': '<input type="radio"/> Radio button',
    'File input': '<input type="file"/>',
  };
  editor.commands.insertContent(formElements[form] || '');
};

const MessageInput = ({
  theme,
  editor,
  handleSendMessage,
  markdownEnabled,
  setMarkdownEnabled,
  setApiKey,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const snippetsMenu = useMenu();
  const formMenu = useMenu();
  const settingsDialog = useDialog();
  const apiModalDialog = useDialog();

  return (
    <>
      <Card sx={{ backgroundColor: '#26242C', borderRadius: 2, mt: 2, mb: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Box
            sx={{
              backgroundColor: '#333',
              borderRadius: 1,
              p: 2,
              color: 'white',
            }}
          >
            <EditorContent editor={editor} />
          </Box>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: 'space-between',
            backgroundColor: '#26242C',
            borderTop: '1px solid #444',
            p: 1,
          }}
        >
          <Box>
            <IconButton onClick={() => handleMarkdownInsert(editor)}>
              <CodeIcon
                style={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            </IconButton>
            <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
              <EmojiEmotionsIcon
                style={{ color: theme.palette.primary.main, fontSize: 20 }}
              />
            </IconButton>
            {showEmojiPicker && (
              <Picker
                data={data}
                onEmojiSelect={emoji => {
                  editor.commands.insertContent(emoji.native);
                  setShowEmojiPicker(false);
                }}
                theme="dark"
                style={{ position: 'absolute', bottom: '60px', left: '20px' }}
              />
            )}
            <SnippetsDropDown
              anchorEl={snippetsMenu.anchorEl}
              handleClose={snippetsMenu.handleMenuClose}
              handleMenuOpen={snippetsMenu.handleMenuOpen}
              handleSnippetSelect={snippet => {
                editor.chain().focus().insertContent(snippet).run();
                snippetsMenu.handleMenuClose();
              }}
            />
            <FileUpload
              onFileChange={event => {
                const file = event.target.files[0];
                if (file) {
                  console.log('File selected:', file.name);
                }
              }}
              iconStyle={{ color: theme.palette.primary.main, fontSize: 20 }}
            />
            <FormTemplatesDropDown
              anchorEl={formMenu.anchorEl}
              handleClose={formMenu.handleMenuClose}
              handleMenuOpen={formMenu.handleMenuOpen}
              handleFormSelect={form => handleFormContentInsert(editor, form)}
            />
            <SettingsDialog
              open={settingsDialog.open}
              onClose={settingsDialog.handleClose}
              tabValue={settingsDialog.value}
              handleTabChange={(event, newValue) =>
                settingsDialog.handleChange(event, newValue)
              }
            />
            <APIModal
              open={apiModalDialog.open}
              onClose={apiModalDialog.handleClose}
              setApiKey={setApiKey}
              handleOpenApiModal={apiModalDialog.handleOpen}
            />
          </Box>
          <IconButton onClick={handleSendMessage}>
            <SendIcon
              style={{ color: theme.palette.primary.main, fontSize: 20 }}
            />
          </IconButton>
        </CardActions>
      </Card>
      <Box sx={{ p: 2, backgroundColor: '#26242C', borderRadius: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={markdownEnabled}
              onChange={() => setMarkdownEnabled(!markdownEnabled)}
            />
          }
          label="Enable Markdown"
        />
      </Box>
    </>
  );
};

export default MessageInput;
