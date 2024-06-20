import { Button, CircularProgress, Container } from '@mui/material';
import { debounce } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { getChatFilesList } from 'api/chat_file';
import { useAuthStore } from 'contexts/AuthProvider';
import { useChatStore } from 'contexts/ChatProvider';
import request from 'utils/request/axios';

const UploadComponent = ({ sessionUuid, showUploaderButton }) => {
  const chatStore = useChatStore();
  const authStore = useAuthStore();
  const [fileListData, setFileListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headers, setHeaders] = useState({});
  const [data, setData] = useState({});
  const queryClient = useRef(null); // Simulating Vue's useQueryClient
  const [model, setModel] = useState({
    chatModel: 'gpt-3.5-turbo',
  });
  const token = authStore.getToken();
  const baseURL = process.env.REACT_APP_API_URL; // Adjust the environment variable name
  const actionURL = `${baseURL}/upload`;

  useEffect(() => {
    setHeaders({
      Authorization: `Bearer ${token}`,
    });

    setData({
      'session-uuid': sessionUuid,
    });

    const fetchData = async () => {
      setIsLoading(true);
      const result = await getChatFilesList(sessionUuid);
      setFileListData(result);
      setIsLoading(false);
    };

    fetchData();
  }, [sessionUuid, token]);

  const debouncedUpdate = debounce(updatedModel => {
    chatStore.updateChatSession(sessionUuid, {
      maxLength: updatedModel.contextCount,
      temperature: updatedModel.temperature,
      maxTokens: updatedModel.maxTokens,
      topP: updatedModel.topP,
      n: updatedModel.n,
      debug: updatedModel.debug,
      model: updatedModel.chatModel,
      summarizeMode: updatedModel.summarizeMode,
    });
  }, 200);

  useEffect(() => {
    debouncedUpdate(model);
  }, [model]);

  const handleFileListUpdate = fileList => {
    console.log(fileList);
  };

  const beforeUpload = file => {
    console.log(file);
    // You can return a Promise to reject the file
    // return Promise.reject(new Error('Invalid file type'));
  };

  const handleFinish = ({ file, event }) => {
    console.log(file, event);
    if (!event) {
      return;
    }
    file.url = JSON.parse(event.currentTarget.response).url;
    console.log(file, event);
    // Invalidate queries to refresh file list
    setFileListData([...fileListData, file]);
    return file;
  };

  const handleRemove = file => {
    console.log('remove', file);
    if (file.url) {
      const url = fileUrl(file);
      // Simulate file delete mutation
      request.delete(url).then(() => {
        setFileListData(fileListData.filter(f => f.url !== file.url));
      });
    }
  };

  const handleDownload = async file => {
    console.log('download', file);
    const url = fileUrl(file);
    const response = await request.get(url, {
      responseType: 'blob', // Important: set the response type to blob
    });
    const blob = new Blob([response.data], {
      type: 'application/octet-stream',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return false; // Cancel original download
  };

  const fileUrl = file => {
    const file_id = file.url?.split('/').pop();
    const url = `/download/${file_id}`;
    return url;
  };

  return (
    <Container>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <input
            type="file"
            onChange={event => {
              const file = event.target.files[0];
              beforeUpload(file);
              // Simulate upload finish event
              handleFinish({
                file,
                event: {
                  currentTarget: {
                    response: JSON.stringify({ url: 'fake-url' }),
                  },
                },
              });
            }}
          />
        )}
        {showUploaderButton && (
          <Button
            id="attach_file_button"
            data-testid="attach_file_button"
            variant="contained"
            color="primary"
          >
            Attach File
          </Button>
        )}
      </div>
    </Container>
  );
};

export default UploadComponent;
