import request from 'utils/request/axios';

export async function fetchChatStream(
  sessionUuid,
  chatUuid,
  regenerate,
  prompt,
  userId,
  onDownloadProgress
) {
  console.log(
    'fetchChatStream:',
    `sessionUuid: ${sessionUuid}, chatUuid: ${chatUuid}, regenerate: ${regenerate}, prompt: ${prompt}, userId: ${userId}`
  );
  try {
    const response = await request.post(
      '/chat_stream',
      {
        regenerate,
        prompt,
        sessionUuid,
        chatUuid,
        userId,
      },
      {
        onDownloadProgress,
      }
    );

    // Check for non-200 HTTP status codes
    if (response.status !== 200) {
      console.error(`Error: Received status code ${response.status}`);
      throw new Error(`Unexpected status code: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    // Network errors
    if (error.response) {
      // The request was made, but the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with an error:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      throw new Error(
        `Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`
      );
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received:', error.request);
      throw new Error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error in setting up request:', error.message);
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
}
