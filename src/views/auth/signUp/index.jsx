import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
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

function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Container maxWidth="sm" sx={{ mt: '10vh', mb: '60px' }}>
      <Box sx={{ mb: '40px' }}>
        <Typography variant="h4" fontWeight="bold" mb="10px">
          Sign Up
        </Typography>
        <Typography color="textSecondary" mb="36px">
          Create a new account!
        </Typography>
      </Box>
      <Button
        variant="outlined"
        startIcon={<FcGoogle />}
        fullWidth
        sx={{ mb: '26px', py: '15px', borderRadius: '16px' }}
      >
        Sign up with Google
      </Button>
      <Divider sx={{ mb: '25px' }}>
        <Typography color="textSecondary">or</Typography>
      </Divider>
      <FormControl fullWidth>
        <FormLabel>Username</FormLabel>
        <TextField
          required
          variant="outlined"
          type="text"
          placeholder="Username"
          fullWidth
          sx={{ mb: '24px' }}
        />
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
          type={showPassword ? 'text' : 'password'}
          placeholder="Min. 8 characters"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handlePasswordClick}>
                  {showPassword ? (
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
        <FormLabel>Confirm Password</FormLabel>
        <TextField
          required
          variant="outlined"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Re-enter your password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleConfirmPasswordClick}>
                  {showConfirmPassword ? (
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
          <FormControlLabel
            control={<Checkbox />}
            label="I agree to the Terms and Conditions"
          />
        </Box>
        <Button variant="contained" fullWidth sx={{ mb: '24px', py: '15px' }}>
          Sign Up
        </Button>
      </FormControl>
      <Box textAlign="center">
        <Typography variant="body2">
          Already have an account?
          <NavLink to="/auth/sign-in">
            <Typography
              component="span"
              color="primary"
              sx={{ ml: '5px', fontWeight: '500' }}
            >
              Sign In
            </Typography>
          </NavLink>
        </Typography>
      </Box>
    </Container>
  );
}

export default SignUp;
