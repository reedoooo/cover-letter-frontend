import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';

const EmojiDropDown = ({ onEmojiSelect, iconStyle }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(prev => !prev);
  };

  return (
    <div style={{ position: 'relative' }}>
      <IconButton onClick={handleToggleEmojiPicker}>
        <EmojiEmotionsIcon style={iconStyle} />
      </IconButton>
      {showEmojiPicker && (
        <Picker
          data={data}
          onEmojiSelect={onEmojiSelect}
          theme="dark"
          style={{ position: 'absolute', bottom: '60px', left: '20px' }}
        />
      )}
    </div>
  );
};

export default EmojiDropDown;
