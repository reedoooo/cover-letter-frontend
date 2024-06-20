import {
  Button,
  Card,
  Divider,
  Grid,
  TextField,
  Modal,
  Popover,
  Box,
  Tabs,
  Tab,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import PromptRecommend from '@/assets/recommend.json';
import { isASCII } from '@/utils/is';
import useMode from 'hooks/useMode';
import { usePromptStore } from 'store';

const DataTable = ({ columns, data, pagination }) => {
  // Custom DataTable component logic here
  return (
    <div>
      <p>DataTable</p>
    </div>
  );
};

const PromptManager = ({ visible, onClose }) => {
  const [show, setShow] = useState(visible);
  const [showModal, setShowModal] = useState(false);
  const { theme } = useMode();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const promptStore = usePromptStore();
  const [promptList, setPromptList] = useState(promptStore.promptList);
  const [tempPromptKey, setTempPromptKey] = useState('');
  const [tempPromptValue, setTempPromptValue] = useState('');
  const [modalMode, setModalMode] = useState('');
  const [tempModifiedItem, setTempModifiedItem] = useState({});
  const [downloadURL, setDownloadURL] = useState('');

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  useEffect(() => {
    promptStore.updatePromptList(promptList);
  }, [promptList, promptStore]);

  const changeShowModal = (mode, selected = { key: '', value: '' }) => {
    if (mode === 'add') {
      setTempPromptKey('');
      setTempPromptValue('');
    } else if (mode === 'modify') {
      setTempModifiedItem({ ...selected });
      setTempPromptKey(selected.key);
      setTempPromptValue(selected.value);
    } else if (mode === 'local_import') {
      setTempPromptKey('local_import');
      setTempPromptValue('');
    }
    setShowModal(!showModal);
    setModalMode(mode);
  };

  const addPromptTemplate = () => {
    for (const i of promptList) {
      if (i.key === tempPromptKey) {
        alert('Duplicate title, please re-enter');
        return;
      }
      if (i.value === tempPromptValue) {
        alert(`Duplicate content: ${tempPromptKey}, please re-enter`);
        return;
      }
    }
    setPromptList([
      { key: tempPromptKey, value: tempPromptValue },
      ...promptList,
    ]);
    alert('Prompt added successfully');
    changeShowModal('');
  };

  const modifyPromptTemplate = () => {
    let index = 0;

    for (const i of promptList) {
      if (i.key === tempModifiedItem.key && i.value === tempModifiedItem.value)
        break;
      index += 1;
    }

    const tempList = promptList.filter((_, i) => i !== index);

    for (const i of tempList) {
      if (i.key === tempPromptKey) {
        alert('Title conflict detected, please re-enter');
        return;
      }
      if (i.value === tempPromptValue) {
        alert(`Content conflict detected: ${i.key}, please re-enter`);
        return;
      }
    }

    setPromptList([
      { key: tempPromptKey, value: tempPromptValue },
      ...tempList,
    ]);
    alert('Prompt modified successfully');
    changeShowModal('');
  };

  const deletePromptTemplate = row => {
    setPromptList(promptList.filter(item => item.key !== row.key));
    alert('Prompt deleted successfully');
  };

  const clearPromptTemplate = () => {
    setPromptList([]);
    alert('Prompt list cleared successfully');
  };

  const importPromptTemplate = () => {
    try {
      const jsonData = JSON.parse(tempPromptValue);
      for (const i of jsonData) {
        let safe = true;
        for (const j of promptList) {
          if (j.key === i.key) {
            alert(`Skipped due to duplicate title: ${i.key}`);
            safe = false;
            break;
          }
          if (j.value === i.value) {
            alert(`Skipped due to duplicate content: ${i.key}`);
            safe = false;
            break;
          }
        }
        if (safe)
          setPromptList([{ key: i.key, value: i.value }, ...promptList]);
      }
      alert('Import successful');
      changeShowModal('');
    } catch {
      alert('Invalid JSON format, please check');
      changeShowModal('');
    }
  };

  const exportPromptTemplate = () => {
    const jsonDataStr = JSON.stringify(promptList);
    const blob = new Blob([jsonDataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ChatGPTPromptTemplate.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPromptTemplate = async () => {
    try {
      const response = await fetch(downloadURL);
      const jsonData = await response.json();
      setTempPromptValue(JSON.stringify(jsonData));
      importPromptTemplate();
    } catch {
      alert('Network error or invalid JSON file');
    }
  };

  const renderTemplate = () => {
    const [keyLimit, valueLimit] = isMobile ? [6, 9] : [15, 50];
    return promptList.map(item => {
      let factor = isASCII(item.key) ? 10 : 1;
      return {
        renderKey:
          item.key.length <= keyLimit
            ? item.key
            : `${item.key.substring(0, keyLimit * factor)}...`,
        renderValue:
          item.value.length <= valueLimit
            ? item.value
            : `${item.value.substring(0, valueLimit * factor)}...`,
        key: item.key,
        value: item.value,
      };
    });
  };

  const pagination = isMobile
    ? { pageSize: 6, pageSlot: 5 }
    : { pageSize: 7, pageSlot: 15 };

  const columns = [
    {
      title: 'Title',
      field: 'renderKey',
      minWidth: 100,
    },
    {
      title: 'Content',
      field: 'renderValue',
    },
    {
      title: 'Actions',
      field: 'actions',
      width: 100,
      align: 'center',
      render: row => (
        <Box display="flex" justifyContent="center" gap={1}>
          <Button
            variant="text"
            size="small"
            onClick={() => changeShowModal('modify', row)}
          >
            Modify
          </Button>
          <Button
            variant="text"
            size="small"
            color="error"
            onClick={() => deletePromptTemplate(row)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Modal open={show} onClose={onClose} maxWidth="md" fullWidth>
      <Card>
        <Tabs value={0}>
          <Tab label="Local Management">
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Button
                variant="contained"
                onClick={() => changeShowModal('add')}
              >
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => changeShowModal('local_import')}
              >
                Import
              </Button>
              <Button variant="contained" onClick={exportPromptTemplate}>
                Export
              </Button>
              <Popover
                content={
                  <Button onClick={clearPromptTemplate}>
                    Confirm clear data?
                  </Button>
                }
              >
                <Button>Clear</Button>
              </Popover>
            </Box>
            <DataTable
              columns={columns}
              data={renderTemplate()}
              pagination={pagination}
            />
          </Tab>
          <Tab label="Online Import">
            <Typography variant="body2">
              Note: Please verify the source of the downloaded JSON file, as
              malicious JSON files may harm your computer!
            </Typography>
            <Grid container spacing={2} alignItems="center" mt={2}>
              <Grid item xs={isMobile ? 12 : 10}>
                <TextField
                  fullWidth
                  value={downloadURL}
                  onChange={e => setDownloadURL(e.target.value)}
                  placeholder="Enter a valid JSON URL"
                />
              </Grid>
              <Grid item xs={isMobile ? 12 : 2}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!downloadURL.trim()}
                  onClick={downloadPromptTemplate}
                >
                  Download
                </Button>
              </Grid>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                height: 360,
                overflowY: 'auto',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {PromptRecommend.map(info => (
                <Card
                  key={info.key}
                  title={info.key}
                  sx={{ flex: isMobile ? '1 0 100%' : '1 0 30%' }}
                  variant="outlined"
                >
                  <Typography variant="body2">{info.desc}</Typography>
                  <Box display="flex" justifyContent="flex-end">
                    <Button
                      variant="text"
                      component="a"
                      href={info.url}
                      target="_blank"
                    >
                      🔗
                    </Button>
                    <Button
                      variant="text"
                      onClick={() => setDownloadURL(info.downloadUrl)}
                    >
                      ➕
                    </Button>
                  </Box>
                </Card>
              ))}
            </Box>
          </Tab>
        </Tabs>
      </Card>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        maxWidth="sm"
        fullWidth
      >
        <Card sx={{ p: 2 }}>
          {modalMode === 'add' || modalMode === 'modify' ? (
            <Box display="flex" flexDirection="column" gap={2}>
              <Typography variant="h6">Template Title</Typography>
              <TextField
                value={tempPromptKey}
                onChange={e => setTempPromptKey(e.target.value)}
                placeholder="Enter title"
              />
              <Typography variant="h6">Template Content</Typography>
              <TextField
                value={tempPromptValue}
                onChange={e => setTempPromptValue(e.target.value)}
                placeholder="Enter content"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                fullWidth
                disabled={!tempPromptKey.trim() || !tempPromptValue.trim()}
                onClick={() =>
                  modalMode === 'add'
                    ? addPromptTemplate()
                    : modifyPromptTemplate()
                }
              >
                Confirm
              </Button>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                value={tempPromptValue}
                onChange={e => setTempPromptValue(e.target.value)}
                placeholder="Paste JSON content"
                multiline
                rows={4}
              />
              <Button
                variant="contained"
                fullWidth
                disabled={!tempPromptKey.trim() || !tempPromptValue.trim()}
                onClick={importPromptTemplate}
              >
                Import
              </Button>
            </Box>
          )}
        </Card>
      </Modal>
    </Modal>
  );
};

export default PromptManager;
