import { Link } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

const AdminSection = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="p-2 space-y-2 rounded-md bg-neutral-100 dark:bg-neutral-700">
        <p>
          <Link
            className="text-blue-600 dark:text-blue-500"
            href="/static/#/admin/user"
            target="_blank"
          >
            Open Admin Panel
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSection;
