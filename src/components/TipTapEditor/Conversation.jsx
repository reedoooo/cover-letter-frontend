import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';

const Conversation = ({ messages, loading, error }) => {
  console.log('MESSAGES', messages);

  const botAvatar = 'assets/img/chat/bot-avatar.png'; // Update with the actual path to the user avatar
  const userAvatar = 'assets/img/profile/user-3.png'; // Update with the actual path to the bot avatar

  return (
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
          {message.type === 'bot' ? (
            <>
              <Avatar
                src={botAvatar}
                alt="Bot Avatar"
                sx={{ width: 40, height: 40, marginRight: 2 }}
              />
              <Box
                sx={{
                  backgroundColor: '#1C1C1C',
                  borderRadius: 2,
                  p: 2,
                  maxWidth: '70%',
                }}
              >
                <Typography>{message.content}</Typography>
              </Box>
            </>
          ) : (
            <>
              <Box
                sx={{
                  backgroundColor: '#26242C',
                  borderRadius: 2,
                  p: 2,
                  maxWidth: '70%',
                }}
              >
                <Typography>{message.content}</Typography>
              </Box>
              <Avatar
                src={userAvatar}
                alt="User Avatar"
                sx={{ width: 40, height: 40, marginLeft: 2 }}
              />
            </>
          )}
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
};

export default Conversation;
