import { Box } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState, useRef, useEffect } from 'react';
import useFetchChatStream from 'hooks/useFetchChatStream';
import useMode from 'hooks/useMode';
import Conversation from './Conversation';
import MessageInput from './MessageInput';
const logResponse = response => {
  if (response) {
    console.log('Response received:', response);
  } else {
    console.log('No response received');
  }
};

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  backgroundColor: '#1C1C1C',
  color: 'white',
  width: '100%',
  borderRadius: '14px',
};

export const ChatApp = () => {
  const { theme } = useMode();
  const [messages, setMessages] = useState([]);
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey'));
  const [currentMessage, setCurrentMessage] = useState('');
  const [markdownEnabled, setMarkdownEnabled] = useState(false);
  // const editor = useEditor({
  //   extensions: [StarterKit],
  //   content:
  //     '<p>[Title]</p><p>[Description]</p><p>[Layout]</p><p>[Makeup]</p><p>[Styling]</p><p>[Icons]</p><p>[Function]</p><p>[Frameworks]</p><p>[Props]</p><p>[Snippets]</p><p>[Resources]</p>',
  // });
  const editor = useEditor({
    extensions: [StarterKit],
    content:
      '<p><strong>Instructions:</strong> Below is a template for creating a new component. Please fill out each section with the appropriate details.</p><p>[Title]</p><p>[Description]</p><p>[Layout]</p>',
  });
  const { data, loading, error, fetchChatStream } = useFetchChatStream();
  useEffect(() => {
    if (editor) {
      setCurrentMessage(editor.getHTML());
    }
  }, [currentMessage, editor]);

  useEffect(() => {
    if (data) {
      logResponse(data);
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages];
        if (
          updatedMessages[updatedMessages.length - 1]?.type === 'bot' &&
          !updatedMessages[updatedMessages.length - 1].complete
        ) {
          updatedMessages[updatedMessages.length - 1].content +=
            data.choices[0].delta.content || '';
          if (data.choices[0].finish_reason) {
            updatedMessages[updatedMessages.length - 1].complete = true;
          }
        } else {
          updatedMessages.push({
            type: 'bot',
            content: data.choices[0].delta.content || '',
            complete: !data.choices[0].finish_reason,
          });
        }
        return updatedMessages;
      });
    }
  }, [data]);
  const handleSendMessage = () => {
    console.log('Send button clicked');
    const clientApiKey = localStorage.getItem('apiKey');
    const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    if (currentMessage.trim()) {
      console.log('Current message:', currentMessage);
      setMessages([...messages, { type: 'user', content: currentMessage }]);
      setCurrentMessage('');
      let partialMessage = '';

      fetch('http://localhost:3001/api/chat_stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionUuid: 'session-uuid',
          chatUuid: 'chat-uuid',
          regenerate: false,
          prompt: currentMessage,
          userId,
          clientApiKey,
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.body;
        })
        .then(body => {
          const reader = body.getReader();
          const decoder = new TextDecoder();

          const processText = ({ done, value }) => {
            if (done) {
              setMessages(prevMessages => {
                const updatedMessages = [...prevMessages];
                if (
                  updatedMessages[updatedMessages.length - 1]?.type === 'bot'
                ) {
                  updatedMessages[updatedMessages.length - 1].complete = true;
                }
                return updatedMessages;
              });
              return;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            lines.forEach(line => {
              if (line.trim() && line.startsWith('data:')) {
                try {
                  const data = JSON.parse(line.slice(5).trim());
                  const content = data.choices[0].delta.content || '';
                  partialMessage += content;

                  setMessages(prevMessages => {
                    const updatedMessages = [...prevMessages];
                    if (
                      updatedMessages[updatedMessages.length - 1]?.type ===
                        'bot' &&
                      !updatedMessages[updatedMessages.length - 1].complete
                    ) {
                      updatedMessages[updatedMessages.length - 1].content =
                        partialMessage;
                    } else {
                      updatedMessages.push({
                        type: 'bot',
                        content: partialMessage,
                        complete: false,
                      });
                    }
                    return updatedMessages;
                  });
                } catch (e) {
                  console.error('Error parsing chunk:', e);
                }
              }
            });

            reader.read().then(processText);
          };

          reader.read().then(processText);
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    } else {
      console.log('No message to send');
    }
  };
  return (
    <>
      <Box sx={containerStyles}>
        {/* Conversation Area */}
        <Conversation messages={messages} loading={loading} error={error} />

        {/* -- Insert Message Input Component -- */}
        <MessageInput
          theme={theme}
          editor={editor}
          handleSendMessage={handleSendMessage}
          markdownEnabled={markdownEnabled}
          setMarkdownEnabled={setMarkdownEnabled}
          setApiKey={setApiKey}
        />
      </Box>
    </>
  );
};
// const handleSendMessage = () => {
//   console.log('Send button clicked');
//   const clientApiKey = localStorage.getItem('apiKey');
//   const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
//   if (currentMessage.trim()) {
//     console.log('Current message:', currentMessage);
//     setMessages([...messages, { type: 'user', content: currentMessage }]);
//     setCurrentMessage('');
//     let partialMessage = '';

//     const eventSource = new EventSource(
//       'http://localhost:3001/api/chat_stream'
//     );

//     eventSource.onopen = () => {
//       const payload = JSON.stringify({
//         sessionUuid: 'session-uuid',
//         chatUuid: 'chat-uuid',
//         regenerate: false,
//         prompt: currentMessage,
//         userId: userId,
//         clientApiKey: clientApiKey,
//       });
//       eventSource.send(payload);
//     };

//     eventSource.onmessage = event => {
//       try {
//         const data = JSON.parse(event.data);
//         const content = data.choices[0].delta.content || '';
//         partialMessage += content;

//         setMessages(prevMessages => {
//           const updatedMessages = [...prevMessages];
//           if (
//             updatedMessages[updatedMessages.length - 1]?.type === 'bot' &&
//             !updatedMessages[updatedMessages.length - 1].complete
//           ) {
//             updatedMessages[updatedMessages.length - 1].content =
//               partialMessage;
//           } else {
//             updatedMessages.push({
//               type: 'bot',
//               content: partialMessage,
//               complete: false,
//             });
//           }
//           return updatedMessages;
//         });
//       } catch (e) {
//         console.error('Error parsing progress event:', e);
//       }
//     };

//     eventSource.onerror = error => {
//       console.error('EventSource failed:', error);
//       eventSource.close();
//     };

//     eventSource.onclose = () => {
//       setMessages(prevMessages => {
//         const updatedMessages = [...prevMessages];
//         if (updatedMessages[updatedMessages.length - 1]?.type === 'bot') {
//           updatedMessages[updatedMessages.length - 1].complete = true;
//         }
//         return updatedMessages;
//       });
//     };
//   } else {
//     console.log('No message to send');
//   }
// };
// const handleSendMessage = async () => {
//   console.log('Send button clicked');
//   const clientApiKey = localStorage.getItem('apiKey');
//   if (currentMessage.trim()) {
//     console.log('Current message:', currentMessage);
//     setMessages([...messages, { type: 'user', content: currentMessage }]);
//     setCurrentMessage('');
//     let partialMessage = '';

//     fetchChatStream(
//       'session-uuid',
//       'chat-uuid',
//       false,
//       currentMessage,
//       userId, // Pass userId in the request
//       clientApiKey,
//       progressEvent => {
//         const progressData = JSON.parse(progressEvent);
//         const content = progressData.choices[0].delta.content || '';
//         partialMessage += content;

//         setMessages(prevMessages => {
//           const updatedMessages = [...prevMessages];
//           if (
//             updatedMessages[updatedMessages.length - 1].type === 'bot' &&
//             !updatedMessages[updatedMessages.length - 1].complete
//           ) {
//             updatedMessages[updatedMessages.length - 1].content =
//               partialMessage;
//           } else {
//             updatedMessages.push({
//               type: 'bot',
//               content: partialMessage,
//               complete: false,
//             });
//           }
//           return updatedMessages;
//         });
//       }
//     );
//   } else {
//     console.log('No message to send');
//   }
// };
