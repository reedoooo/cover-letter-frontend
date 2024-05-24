import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// import useNotification from 'hooks/useNotification';

import RCSnackbar from './themed/RCSnackbar';
import RCTypography from './themed/RCTypography';

function NotificationSystem({ handleClose, notifications }) {
  const [customSB, setCustomSB] = useState(false);
  const openCustomSB = () => setCustomSB(true);
  const closeCustomSB = () => setCustomSB(false);

  const renderSnackbar = (notification) => (
    <RCSnackbar
      key={notification.id}
      color={notification.color}
      icon={<Icon>{notification.icon}</Icon>}
      title={notification.title}
      dateTime={notification.dateTime}
      content={<RCTypography>{notification.content}</RCTypography>}
      open={customSB}
      close={closeCustomSB}
      onClose={closeCustomSB}
      bgWhite={true}
      autoHideDuration={notification.autoHideDuration || 5000}
    />
  );

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.customContent) {
        openCustomSB();
      } else {
        handleClose(notification.id);
      }
    });
  }, [notifications, handleClose]);
  return (
    <>
      {notifications.map((notification) => renderSnackbar(notification))}
      {/* {customSB ? alertContent('custom') : null} */}
    </>
  );
}

NotificationSystem.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      color: PropTypes.oneOf([
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
        'dark',
        'light',
      ]),
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      dateTime: PropTypes.string.isRequired,
      content: PropTypes.string,
      customContent: PropTypes.node,
      bgWhite: PropTypes.bool,
      autoHideDuration: PropTypes.number,
    }),
  ).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default NotificationSystem;
