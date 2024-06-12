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
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { PageLayout } from 'components/index';
import useAuth from 'hooks/useAuth';
import useMode from 'hooks/useMode';

function SignIn() {
  const { theme } = useMode();
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async values => {
      const result = await loginAction({
        request: new Request('', {
          method: 'POST',
          body: new URLSearchParams(values),
        }),
      });
      if (result.token) {
        localStorage.setItem('userToken', result.token);
        navigate('/');
      } else {
        alert(result.error);
      }
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <FormLabel>Email</FormLabel>
          <TextField
            required
            variant="outlined"
            name="username"
            type="email"
            placeholder="mail@simmmple.com"
            fullWidth
            sx={{ mb: '24px' }}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <FormLabel>Password</FormLabel>
          <TextField
            required
            variant="outlined"
            name="password"
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
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb="24px"
          >
            <FormControlLabel
              control={<Checkbox />}
              label="Keep me logged in"
            />
            <NavLink to="/auth/forgot-password">
              <Typography color="primary" sx={{ fontWeight: '500' }}>
                Forgot password?
              </Typography>
            </NavLink>
          </Box>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mb: '24px', py: '15px' }}
          >
            Sign In
          </Button>
        </form>
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
