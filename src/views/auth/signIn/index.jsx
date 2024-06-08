import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import { PageLayout } from 'components/index';
import useMode from 'hooks/useMode';

function SignIn() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const { theme } = useMode();

  return (
    <Container maxWidth="sm" sx={{ mt: '10vh', mb: '60px' }}>
      <Box sx={{ mb: '40px' }}>
        <Typography variant="h4" fontWeight="bold" mb="10px">
          Sign In
        </Typography>
        <Typography color="textSecondary" mb="36px">
          Enter your email and password to sign in!
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startIcon={<FcGoogle />}
        fullWidth
        sx={{ mb: '26px', py: '15px', borderRadius: '16px' }}
      >
        Sign in with Google
      </Button>
      <Divider sx={{ mb: '25px' }}>
        <Typography color="textSecondary">or</Typography>
      </Divider>
      <FormControl fullWidth>
        <FormLabel>Email</FormLabel>
        <TextField
          required
          variant="outlined"
          type="email"
          placeholder="mail@simmmple.com"
          fullWidth
          sx={{ mb: '24px' }}
        />
        <FormLabel>Password</FormLabel>
        <TextField
          required
          variant="outlined"
          type={show ? 'text' : 'password'}
          placeholder="Min. 8 characters"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClick}>
                  {show ? (
                    <RiEyeCloseLine color="black" />
                  ) : (
                    <MdOutlineRemoveRedEye color="black" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          fullWidth
          sx={{ mb: '24px' }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb="24px"
        >
          <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
          <NavLink to="/auth/forgot-password">
            <Typography color="primary" sx={{ fontWeight: '500' }}>
              Forgot password?
            </Typography>
          </NavLink>
        </Box>
        <Button variant="contained" fullWidth sx={{ mb: '24px', py: '15px' }}>
          Sign In
        </Button>
      </FormControl>
      <Box textAlign="center">
        <Typography variant="body2">
          Not registered yet?
          <NavLink to="/auth/sign-up">
            <Typography
              component="span"
              color="primary"
              sx={{ ml: '5px', fontWeight: '500' }}
            >
              Create an Account
            </Typography>
          </NavLink>
        </Typography>
      </Box>
    </Container>
  );
}

export default SignIn;
