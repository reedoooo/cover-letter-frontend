import { Box, Typography } from '@mui/material';
import React from 'react';

const MessageList = ({ messages, loading, error }) => (
  <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
    {messages.map((message, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
          mb: 2,
        }}
      >
        {message.type === 'bot' && (
          <img
            src="/path/to/bot-avatar.png"
            alt="Bot Avatar"
            style={{ width: 40, height: 40, marginRight: 8 }}
          />
        )}
        <Box
          sx={{
            backgroundColor: message.type === 'user' ? '#26242C' : '#1C1C1C',
            borderRadius: 2,
            p: 2,
          }}
        >
          <Typography>{message.content}</Typography>
        </Box>
      </Box>
    ))}
    {loading && (
      <Typography sx={{ color: 'white', textAlign: 'center' }}>
        Loading...
      </Typography>
    )}
    {error && (
      <Typography sx={{ color: 'red', textAlign: 'center' }}>
        {error}
      </Typography>
    )}
  </Box>
);

export default MessageList;
