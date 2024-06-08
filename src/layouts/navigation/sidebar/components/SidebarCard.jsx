import { Box, Button, Card, Typography, useTheme } from '@mui/material';
import React from 'react';
import logoWhite from 'assets/img/layout/logoWhite.png';

export default function SidebarDocs() {
  const theme = useTheme();
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
        border="5px solid"
        borderColor={borderColor}
        style={{ background: bgColor }}
        borderRadius="50%"
        width="94px"
        height="94px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        position="absolute"
        left="50%"
        top="-47px"
        transform="translate(-50%, 0%)"
      >
        <img src={logoWhite} alt="logo" width="40px" height="40px" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        marginBottom="12px"
        padding="15px"
        paddingTop="55px"
      >
        <Typography
          variant="h6"
          color="textPrimary"
          fontWeight="bold"
          textAlign="center"
          marginTop="10px"
          marginBottom="6px"
        >
          Upgrade to PRO
        </Typography>
        <Typography variant="body2" fontWeight="500" textAlign="center">
          Improve your development process and start doing more with Horizon UI
          PRO!
        </Typography>
        <Button
          href="https://horizon-ui.com/pro?ref=horizon-chakra-free"
          variant="contained"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            color: 'white',
            fontWeight: 'regular',
            fontSize: 'sm',
            minWidth: '185px',
            margin: 'auto',
            marginBottom: '16px',
          }}
        >
          Upgrade to PRO
        </Button>
      </Box>
    </Card>
  );
}
