import { useState, useCallback } from 'react';
import request from 'utils/request/axios';
const useFetchChatStream = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchChatStream = useCallback(
  //   (
  //     sessionUuid,
  //     chatUuid,
  //     regenerate,
  //     prompt,
  //     userId,
  //     clientApiKey,
  //     onProgress
  //   ) => {
  //     setLoading(true);
  //     setError(null);

  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('/api/chat_stream', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             sessionUuid,
  //             chatUuid,
  //             regenerate,
  //             prompt,
  //             userId,
  //             clientApiKey,
  //           }),
  //         });

  //         if (!response.body) {
  //           throw new Error(
  //             'ReadableStream not yet supported in this browser.'
  //           );
  //         }

  //         const reader = response.body.getReader();
  //         const decoder = new TextDecoder();
  //         let done = false;

  //         while (!done) {
  //           const { value, done: readerDone } = await reader.read();
  //           done = readerDone;

  //           const chunk = decoder.decode(value, { stream: true });

  //           try {
  //             const json = JSON.parse(chunk);
  //             setData(json);
  //             if (onProgress)
  //               onProgress({
  //                 loaded: chunk.length,
  //                 total: response.headers.get('Content-Length'),
  //               });
  //           } catch (e) {
  //             // Handle cases where the chunk is not a complete JSON object
  //             console.error('Failed to parse chunk as JSON:', chunk);
  //           }
  //         }
  //       } catch (err) {
  //         setError(err.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   },
  //   []
  // );
  const fetchChatStream = useCallback(
    (
      sessionUuid,
      chatUuid,
      regenerate,
      prompt,
      userId,
      clientApiKey,
      onProgress
    ) => {
      setLoading(true);
      setError(null);

      const fetchData = async () => {
        try {
          const response = await request.post(
            '/chat_stream',
            {
              regenerate,
              prompt,
              sessionUuid,
              chatUuid,
              userId,
              clientApiKey,
            },
            {
              onProgress,
            }
          );

          if (!response.body) {
            throw new Error(
              'ReadableStream not yet supported in this browser.'
            );
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let done = false;
          let partialChunk = '';

          while (!done) {
            const { value, done: readerDone } = await reader.read();
            done = readerDone;

            partialChunk += decoder.decode(value, { stream: true });

            // Try parsing the chunk to handle incomplete JSON objects
            try {
              const json = JSON.parse(partialChunk);
              setData(json);
              partialChunk = ''; // Reset partialChunk after successful parse
              if (onProgress)
                onProgress({
                  loaded: partialChunk.length,
                  total: response.headers.get('Content-Length'),
                });
            } catch (e) {
              // Keep the partialChunk as is and continue reading
            }
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    },
    []
  );

  return { data, loading, error, fetchChatStream };
};
export default useFetchChatStream;

// const useFetchChatStream = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchChatStream = useCallback(
//     async (
//       sessionUuid,
//       chatUuid,
//       regenerate,
//       prompt,
//       userId,
//       clientApiKey,
//       onProgress
//     ) => {
//       console.log(
//         'fetchChatStream:',
//         `sessionUuid: ${sessionUuid}, chatUuid: ${chatUuid}, regenerate: ${regenerate}, prompt: ${prompt}, userId: ${userId}`
//       );
//       setLoading(true);
//       setError(null);

//       try {
// const response = await request.post(
//   '/chat_stream',
//   {
//     regenerate,
//     prompt,
//     sessionUuid,
//     chatUuid,
//     userId,
//     clientApiKey,
//   },
//   {
//     onProgress,
//   }
// );

//         // Check for non-200 HTTP status codes
//         if (response.status !== 200) {
//           console.error(`Error: Received status code ${response.status}`);
//           throw new Error(`Unexpected status code: ${response.status}`);
//         }

//         setData(response.data);
//       } catch (error) {
//         // Network errors
//         if (error.response) {
//           // The request was made, but the server responded with a status code
//           // that falls out of the range of 2xx
//           console.error('Server responded with an error:', error.response.data);
//           console.error('Status:', error.response.status);
//           console.error('Headers:', error.response.headers);
//           setError(
//             `Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
//           );
//         } else if (error.request) {
//           // The request was made, but no response was received
//           console.error('No response received:', error.request);
//           setError('No response received from the server');
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.error('Error in setting up request:', error.message);
//           setError(`Request setup error: ${error.message}`);
//         }
//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   return { data, loading, error, fetchChatStream };
// };
