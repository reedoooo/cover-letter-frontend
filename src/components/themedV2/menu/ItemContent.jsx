import { Box, Typography, useTheme } from '@mui/material';
import { UpgradeIcon } from 'assets/humanIcons';

export const ItemContent = props => {
  const theme = useTheme();
  const textColor = theme.palette.mode === 'light' ? 'navy.700' : 'white';
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="16px"
        minHeight={{ xs: '60px', md: '70px' }}
        height={{ xs: '60px', md: '70px' }}
        minWidth={{ xs: '60px', md: '70px' }}
        width={{ xs: '60px', md: '70px' }}
        marginRight="14px"
        bgcolor="linear-gradient(135deg, #868CFF 0%, #4318FF 100%)"
      >
        <UpgradeIcon color="white" size={32} />
      </Box>
      <Box flexDirection="column">
        <Typography
          mb="5px"
          fontWeight="bold"
          color={textColor}
          fontSize={{ xs: 'md', md: 'md' }}
        >
          New Update: {props.info}
        </Typography>
        <Box alignItems="center">
          <Typography
            fontSize={{ xs: 'sm', md: 'sm' }}
            lineHeight="100%"
            color={textColor}
          >
            A new update for your downloaded item is available!
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ItemContent;
