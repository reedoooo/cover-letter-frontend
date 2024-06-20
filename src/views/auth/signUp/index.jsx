import React from 'react';
import AuthPages from '../shared';

function Signup() {
  return <AuthPages />;
}

export default Signup;

// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   Divider,
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   IconButton,
//   InputAdornment,
//   Paper,
//   Switch,
//   TextField,
//   Typography,
// } from '@mui/material';
// import { useFormik } from 'formik';
// import React from 'react';
// import { FcGoogle } from 'react-icons/fc';
// import { MdOutlineRemoveRedEye } from 'react-icons/md';
// import { RiEyeCloseLine } from 'react-icons/ri';
// import { useSelector } from 'react-redux';
// import {
//   NavLink,
//   useActionData,
//   useNavigation,
//   useLocation,
// } from 'react-router-dom';
// import { PeopleAltRoundedIcon } from 'assets/humanIcons';
// import { StyledIconContainer } from 'components/styled';
// import { RCBox, RCButton, RCTypography } from 'components/themed';
// import formFieldsConfigs from 'config/formFieldsConfigs';
// import useAuth from 'hooks/useAuth';
// import useMode from 'hooks/useMode';
// import { dispatch } from 'store/index';
// // import {
// //   Box,
// //   Button,
// //   Checkbox,
// //   Container,
// //   Divider,
// //   FormControl,
// //   FormControlLabel,
// //   FormLabel,
// //   IconButton,
// //   InputAdornment,
// //   TextField,
// //   Typography,
// // } from '@mui/material';
// // import { useFormik } from 'formik';
// // import React, { useState } from 'react';
// // import { FcGoogle } from 'react-icons/fc';
// // import { MdOutlineRemoveRedEye } from 'react-icons/md';
// // import { RiEyeCloseLine } from 'react-icons/ri';
// // import { NavLink, useNavigate } from 'react-router-dom';
// // import { PageLayout } from 'components/index';
// // import useAuth from 'hooks/useAuth';
// // import useMode from 'hooks/useMode';

// function SignIn() {
//   const { theme } = useMode();
//   // const navigate = useNavigate();
//   const { loginAction } = useAuth();

//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);

//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       email: '',
//       password: '',
//     },
//     onSubmit: async values => {
//       const result = await loginAction({
//         request: new Request('', {
//           method: 'POST',
//           body: new URLSearchParams(values),
//         }),
//       });
//       if (result.token) {
//         localStorage.setItem('userToken', result.token);
//         navigate('/');
//       } else {
//         alert(result.error);
//       }
//     },
//   });

//   return (
//     <Container maxWidth="sm" sx={{ mt: '10vh', mb: '60px' }}>
//       <Box sx={{ mb: '40px' }}>
//         <Typography variant="h4" fontWeight="bold" mb="10px">
//           Sign In
//         </Typography>
//         <Typography color="textSecondary" mb="36px">
//           Enter your email and password to sign in!
//         </Typography>
//       </Box>
//       <Button
//         variant="outlined"
//         startIcon={<FcGoogle />}
//         fullWidth
//         sx={{ mb: '26px', py: '15px', borderRadius: '16px' }}
//       >
//         Sign in with Google
//       </Button>
//       <Divider sx={{ mb: '25px' }}>
//         <Typography color="textSecondary">or</Typography>
//       </Divider>
//       <FormControl fullWidth>
//         <form onSubmit={formik.handleSubmit}>
//           <FormLabel>Email</FormLabel>
//           <TextField
//             required
//             variant="outlined"
//             name="username"
//             type="email"
//             placeholder="mail@simmmple.com"
//             fullWidth
//             sx={{ mb: '24px' }}
//             onChange={formik.handleChange}
//             value={formik.values.username}
//           />
//           <FormLabel>Password</FormLabel>
//           <TextField
//             required
//             variant="outlined"
//             name="password"
//             type={show ? 'text' : 'password'}
//             placeholder="Min. 8 characters"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleClick}>
//                     {show ? (
//                       <RiEyeCloseLine color="black" />
//                     ) : (
//                       <MdOutlineRemoveRedEye color="black" />
//                     )}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             fullWidth
//             sx={{ mb: '24px' }}
//             onChange={formik.handleChange}
//             value={formik.values.password}
//           />
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             mb="24px"
//           >
//             <FormControlLabel
//               control={<Checkbox />}
//               label="Keep me logged in"
//             />
//             <NavLink to="/auth/forgot-password">
//               <Typography color="primary" sx={{ fontWeight: '500' }}>
//                 Forgot password?
//               </Typography>
//             </NavLink>
//           </Box>
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mb: '24px', py: '15px' }}
//           >
//             Sign In
//           </Button>
//         </form>
//       </FormControl>
//       <Box textAlign="center">
//         <Typography variant="body2">
//           Not registered yet?
//           <NavLink to="/auth/sign-up">
//             <Typography
//               component="span"
//               color="primary"
//               sx={{ ml: '5px', fontWeight: '500' }}
//             >
//               Create an Account
//             </Typography>
//           </NavLink>
//         </Typography>
//       </Box>
//     </Container>
//   );
// }
// function SignUp({ onLoginSuccess, apiUrl }) {
//   const { signupAction } = useAuth();
//   const { theme } = useMode();
//   const { isAuthenticated } = useSelector(state => state.user);
//   const { handleAuthSubmit } = useAuth(isAuthenticated, dispatch);
//   const formik = useFormik({
//     initialValues: {
//       username: '',
//       password: '',
//       email: '',
//       isSignup: false,
//     },
//     onSubmit: values => handleAuthSubmit(values, onLoginSuccess, apiUrl),
//   });

//   const renderFormFields = () => {
//     return formFieldsConfigs['authConfigs'].map(field => {
//       if (field.conditional && !formik.values[field.conditional]) {
//         return null;
//       }
//       return (
//         <TextField
//           key={field.name}
//           label={field.label}
//           name={field.name}
//           type={field.type}
//           value={formik.values[field.name]}
//           onChange={formik.handleChange}
//           fullWidth={field.fullWidth}
//           margin={field.margin}
//         />
//       );
//     });
//   };
//   const [showPassword, setShowPassword] = React.useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
//   const handlePasswordClick = () => setShowPassword(!showPassword);
//   const handleConfirmPasswordClick = () =>
//     setShowConfirmPassword(!showConfirmPassword);
//   const handleContinueAsGuest = () => {
//     console.log('Continue as Guest');
//   };
//   return (
//     <Container maxWidth="sm" sx={{ mt: '10vh', mb: '60px' }}>
//       <Box sx={{ mb: '40px' }}>
//         <RCTypography variant="h2" fontWeight="medium" color="white" mt={1}>
//           {formik.values.isSignup ? 'Sign Up' : 'Login'}
//         </RCTypography>
//         {/* <Typography variant="h4" fontWeight="bold" mb="10px">
//           Sign Up
//         </Typography>
//         <Typography color="textSecondary" mb="36px">
//           Create a new account!
//         </Typography> */}
//       </Box>
//       <Button
//         variant="outlined"
//         startIcon={<FcGoogle />}
//         fullWidth
//         sx={{ mb: '26px', py: '15px', borderRadius: '16px' }}
//       >
//         Sign up with Google
//       </Button>
//       <Divider sx={{ mb: '25px' }}>
//         <Typography color="textSecondary">or</Typography>
//       </Divider>
//       <RCBox pt={4} pb={3} px={3}>
//         <RCBox component="form" role="form" onSubmit={formik.handleSubmit}>
//           <Paper>
//             {renderFormFields()}
//             <FormControlLabel
//               control={
//                 <Switch
//                   name="isSignup"
//                   checked={formik.values.isSignup}
//                   onChange={() =>
//                     formik.setFieldValue('isSignup', !formik.values.isSignup)
//                   }
//                 />
//               }
//               label={
//                 formik.values.isSignup ? 'Switch to Login' : 'Switch to Signup'
//               }
//             />
//           </Paper>
//           <Paper
//             sx={{
//               display: 'flex',
//               flexDirection: 'row',
//               gap: 2,
//               justifyContent: 'space-between',
//             }}
//           >
//             <RCBox p={2}>
//               <RCButton
//                 variant="contained"
//                 color="secondary"
//                 size="large"
//                 textSizeVariant="header"
//                 textWeightVariant="bold"
//                 onClick={handleContinueAsGuest}
//                 fullWidth
//                 startIcon={
//                   <StyledIconContainer
//                     theme={theme}
//                     sx={{
//                       borderRadius: `${theme.spacing(2)} !important`,
//                     }}
//                   >
//                     <PeopleAltRoundedIcon color="white" />
//                   </StyledIconContainer>
//                 }
//                 sx={{ width: '100%', fontWeight: 'medium' }}
//               >
//                 Continue as Guest
//               </RCButton>
//             </RCBox>
//             <RCBox p={2} justifyContent="space-around">
//               <RCButton
//                 type="submit"
//                 variant="outlined"
//                 color="success"
//                 sx={{ mx: theme.spacing(1) }}
//               >
//                 {formik.values.isSignup ? 'Sign Up' : 'Login'}
//               </RCButton>
//               {/* <RCButton onClick={onClose} color="error">
//                 Cancel
//               </RCButton> */}
//             </RCBox>
//           </Paper>
//         </RCBox>
//       </RCBox>
//       {/* <FormControl fullWidth>
//         <FormLabel>Username</FormLabel>
//         <TextField
//           required
//           variant="outlined"
//           type="text"
//           placeholder="Username"
//           fullWidth
//           sx={{ mb: '24px' }}
//         />
//         <FormLabel>Email</FormLabel>
//         <TextField
//           required
//           variant="outlined"
//           type="email"
//           placeholder="mail@simmmple.com"
//           fullWidth
//           sx={{ mb: '24px' }}
//         />
//         <FormLabel>Password</FormLabel>
//         <TextField
//           required
//           variant="outlined"
//           type={showPassword ? 'text' : 'password'}
//           placeholder="Min. 8 characters"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handlePasswordClick}>
//                   {showPassword ? (
//                     <RiEyeCloseLine color="black" />
//                   ) : (
//                     <MdOutlineRemoveRedEye color="black" />
//                   )}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           fullWidth
//           sx={{ mb: '24px' }}
//         />
//         <FormLabel>Confirm Password</FormLabel>
//         <TextField
//           required
//           variant="outlined"
//           type={showConfirmPassword ? 'text' : 'password'}
//           placeholder="Re-enter your password"
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleConfirmPasswordClick}>
//                   {showConfirmPassword ? (
//                     <RiEyeCloseLine color="black" />
//                   ) : (
//                     <MdOutlineRemoveRedEye color="black" />
//                   )}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//           fullWidth
//           sx={{ mb: '24px' }}
//         /> */}
//       {/* <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb="24px"
//         >
//           <FormControlLabel
//             control={<Checkbox />}
//             label="I agree to the Terms and Conditions"
//           />
//         </Box>
//         <Button variant="contained" fullWidth sx={{ mb: '24px', py: '15px' }}>
//           Sign Up
//         </Button>
//       </FormControl> */}
//       <Box textAlign="center">
//         <Typography variant="body2">
//           Already have an account?
//           <NavLink to="/auth/sign-in">
//             <Typography
//               component="span"
//               color="primary"
//               sx={{ ml: '5px', fontWeight: '500' }}
//             >
//               Sign In
//             </Typography>
//           </NavLink>
//         </Typography>
//       </Box>
//     </Container>
//   );
// }

// export default SignUp;
