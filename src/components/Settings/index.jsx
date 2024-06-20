import { SvgIcon, Modal, Card, Tabs, Tab } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Admin from './Admin';
import General from './General';

const IndexComponent = ({ visible, onUpdateVisible }) => {
  const [activeTab, setActiveTab] = useState('General');
  const [isAdminUser, setIsAdminUser] = useState(false); // Assume a method to set this based on user role

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    // This effect is to update visibility status
    onUpdateVisible(visible);
  }, [visible, onUpdateVisible]);

  const handleClose = () => {
    onUpdateVisible(false);
  };

  return (
    <Modal open={visible} onClose={handleClose}>
      <Card
        role="dialog"
        aria-modal="true"
        style={{ width: '95%', maxWidth: '640px' }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab
            label={
              <>
                <SvgIcon className="text-lg" icon="ri:file-user-line" />
                <span className="ml-2">General</span>
              </>
            }
            value="General"
          />
          {isAdminUser && (
            <Tab
              label={
                <>
                  <SvgIcon className="text-lg" icon="ri:list-settings-line" />
                  <span className="ml-2">Admin</span>
                </>
              }
              value="Admin"
            />
          )}
        </Tabs>
        {activeTab === 'General' && <General />}
        {activeTab === 'Admin' && isAdminUser && <Admin />}
      </Card>
    </Modal>
  );
};

IndexComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  onUpdateVisible: PropTypes.func.isRequired,
};

export default IndexComponent;
