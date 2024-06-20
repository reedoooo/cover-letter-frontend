import { Button, SvgIcon, Input, Link } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useAppStore, useUserStore } from '@/store';

const General = () => {
  const appStore = useAppStore();
  const userStore = useUserStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(userStore.userInfo.name || 'Default Name');
    setDescription(userStore.userInfo.description || 'Default Description');
  }, [userStore.userInfo]);

  const themeOptions = [
    { label: 'Auto', key: 'auto', icon: 'ri:contrast-line' },
    { label: 'Light', key: 'light', icon: 'ri:sun-foggy-line' },
    { label: 'Dark', key: 'dark', icon: 'ri:moon-foggy-line' },
  ];

  const updateUserInfo = options => {
    userStore.updateUserInfo(options);
    alert('Update successful'); // Placeholder for actual message system
  };

  return (
    <div className="p-4 space-y-5 min-h-[200px]">
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <span className="flex-shrink-0 w-[100px]">Name</span>
          <div className="w-[200px]">
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder=""
            />
          </div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => updateUserInfo({ name })}
          >
            Save
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex-shrink-0 w-[100px]">Description</span>
          <div className="flex-1">
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder=""
            />
          </div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => updateUserInfo({ description })}
          >
            Save
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex-shrink-0 w-[100px]">Theme</span>
          <div className="flex flex-wrap items-center gap-4">
            {themeOptions.map(item => (
              <Button
                key={item.key}
                size="small"
                variant={appStore.theme === item.key ? 'contained' : 'outlined'}
                onClick={() => appStore.setTheme(item.key)}
              >
                <SvgIcon icon={item.icon} />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex-shrink-0 w-[100px]">Snapshot Link</span>
          <div className="w-[200px]">
            <Link
              href="/#/snapshot_all"
              target="_blank"
              className="text-blue-500"
            >
              Click to Open
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
