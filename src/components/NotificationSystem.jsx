import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from '@mui/material/Icon';

import useNotification from 'hooks/useNotification';

import RCSnackbar from './themed/RCSnackbar';
import RCTypography from './themed/RCTypography';

function NotificationSystem({ handleClose }) {
  const [notificationArray, setNotificationArray] = useState([]);
  const { notifications } = useNotification();

  useEffect(() => {
    setNotificationArray(notifications);
  }, [notifications]);

  return (
    <>
      {notificationArray?.map((notification) => (
        <RCSnackbar
          key={notification.id}
          color={notification.color}
          icon={<Icon>{notification.icon}</Icon>}
          title={notification.title}
          dateTime={notification.dateTime}
          content={<RCTypography>{notification.content}</RCTypography>}
          close={() => handleClose(notification.id)}
          bgWhite={true}
          autoHideDuration={notification.autoHideDuration || 5000}
        />
      ))}
    </>
  );
}

NotificationSystem.propTypes = {
  // notifications: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     color: PropTypes.oneOf([
  //       'primary',
  //       'secondary',
  //       'info',
  //       'success',
  //       'warning',
  //       'error',
  //       'dark',
  //       'light',
  //     ]),
  //     icon: PropTypes.string.isRequired,
  //     title: PropTypes.string.isRequired,
  //     dateTime: PropTypes.string.isRequired,
  //     content: PropTypes.string,
  //     customContent: PropTypes.node,
  //     bgWhite: PropTypes.bool,
  //     autoHideDuration: PropTypes.number,
  //   })
  // ).isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default NotificationSystem;
