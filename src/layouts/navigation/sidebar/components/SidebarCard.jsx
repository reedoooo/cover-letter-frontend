import { Box, Button, Card, Typography, useTheme } from '@mui/material';
import React from 'react';
import logoWhite from 'assets/img/layout/logoWhite.png';
import useMode from 'hooks/useMode';

export default function SidebarDocs() {
  const { theme } = useMode();
  const bgColor = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';
  const borderColor = theme.palette.background.default;

  return (
    <Card
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: bgColor,
        borderRadius: theme.shape.borderRadius,
        position: 'relative',
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        marginBottom="12px"
        padding="15px"
        paddingTop="55px"
      ></Box>
    </Card>
  );
}
