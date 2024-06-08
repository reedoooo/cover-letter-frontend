import { Search as SearchIcon } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import React from 'react';

export function SearchBar(props) {
  const { variant, background, children, placeholder, borderRadius, ...rest } =
    props;
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder={placeholder || 'Search...'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton edge="start">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
          style: {
            borderRadius: borderRadius || 30,
            background: background || 'secondaryGray.300',
          },
        }}
        {...rest}
      />
    </Box>
  );
}
