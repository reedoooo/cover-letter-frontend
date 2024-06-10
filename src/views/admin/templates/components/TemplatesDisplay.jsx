import {
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
// const { UploadFileIcon, FilterListIcon } = reedThaHumansIconLibrary;

import { styled as styledDefault } from 'styled-components';
import { FilterListIcon, UploadFileIcon } from 'assets/humanIcons';
import PaperCard from 'components/common/PaperCard';
import useMode from 'hooks/useMode';
import A4Paper from './A4Paper';

// const RatioBox = styledDefault(Box)(({ theme }) => ({
// position: 'relative',
// width: '100%',
// height: '100%',
// paddingBottom: '141.4%', // A4 ratio
// // marginBottom: '16px',
// backgroundColor: theme.palette.background.paper,
// color: theme.palette.text.primary,
// overflow: 'hidden',
// '& .content': {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
// },
// '& .icon-container': {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   // height: '50%',
//   // width: '50%',
//   margin: 'auto',
// },
// }));

// const A4Paper = ({ icon, route, title, description }) => {
//   const { theme } = useMode();
//   return (
//     <RatioBox theme={theme}>
//       <div className="content">
// <Box
//   sx={{
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '50%',
//     width: '50%',
//     margin: 'auto',
//   }}
// >
//           <PaperCard theme={theme}>
//             <Box component={Grid} container>
//               <Box
//                 component={Grid}
//                 item
//                 xs={12}
//                 sx={{
//                   display: 'flex',
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   paddingLeft: '16px',
//                   paddingRight: '16px',
//                   paddingTop: '16px',
//                   paddingBottom: '16px',
//                 }}
//               >
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontSize: '14px',
//                     fontWeight: 'bold',
//                     color: theme.palette.text.primary,
//                     paddingLeft: '16px',
//                   }}
//                 >
//                   {icon}
//                 </Typography>
//                 <Box
//                   component={Grid}
//                   item
//                   xs={12}
//                   sx={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     paddingLeft: '16px',
//                     paddingRight: '16px',
//                     paddingTop: '16px',
//                     paddingBottom: '16px',
//                   }}
//                 >
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       fontSize: '14px',
//                       fontWeight: 'bold',
//                       color: theme.palette.text.primary,
//                       paddingLeft: '16px',
//                     }}
//                   >
//                     {icon}
//                   </Typography>
//                 </Box>
//               </Box>
//             </Box>
//           </PaperCard>
//         </Box>
// <Box alignItems="center" display="flex" flexDirection="column">
//   <div
//     style={{
//       display: 'flex',
//       justifyContent: 'center',
//       padding: '16px',
//     }}
//   >
//     <Stack
//       sx={{
//         display: 'flex',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//       }}
//     >
//       <Typography
//         sx={{
//           fontSize: '14px',
//           fontWeight: 'bold',
//           color: theme.palette.text.primary,
//           paddingLeft: '16px',
//         }}
//       >
//         {icon}
//       </Typography>
//       <Typography
//         sx={{
//           fontSize: '14px',
//           fontWeight: 'bold',
//           color: theme.palette.text.primary,
//           paddingLeft: '16px',
//         }}
//       >
//         {title}
//       </Typography>
//     </Stack>
//     {/* <div>{date}</div> */}
//   </div>
//   <Typography
//     sx={{
//       fontSize: '14px',
//       fontWeight: 'bold',
//       color: theme.palette.text.primary,
//       paddingLeft: '16px',
//     }}
//   >
//     {description}
//   </Typography>
// </Box>
//       </div>
//     </RatioBox>
//   );
// };

const TemplatesDisplay = ({ templates }) => {
  const { theme } = useMode();
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flex: '1 1 100%' }}>
          Templates Display
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          sx={{ mr: 2 }}
        />
        <IconButton>
          <FilterListIcon />
        </IconButton>
        <IconButton>
          <UploadFileIcon />
        </IconButton>
      </Toolbar>
      <Box component={Grid} container spacing={2} sx={{ padding: '16px' }}>
        {templates?.map((template, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <A4Paper
              icon={template.icon}
              route={template.route}
              title={template.title}
              description={template.description}
            />
            <Box alignItems="center" display="flex" flexDirection="column">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '16px',
                }}
              >
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      paddingLeft: '16px',
                    }}
                  >
                    {template.icon}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                      paddingLeft: '16px',
                    }}
                  >
                    {template.title}
                  </Typography>
                </Stack>
                {/* <div>{date}</div> */}
              </div>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: theme.palette.text.primary,
                  paddingLeft: '16px',
                }}
              >
                {template.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Box>
    </Paper>
  );
};

export default TemplatesDisplay;
