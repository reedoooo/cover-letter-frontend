import { Box, Grid } from '@mui/material';
import React from 'react';
import { banner } from 'assets/img/auth';
import { avatar5 } from 'assets/img/avatars';
import Banner from 'views/admin/profile/components/Banner';
import General from 'views/admin/profile/components/General';
import Notifications from 'views/admin/profile/components/Notifications';
import Projects from 'views/admin/profile/components/Projects';
import Storage from 'views/admin/profile/components/Storage';
import Upload from 'views/admin/profile/components/Upload';

// ==============================|| PROFILE ||============================== //

export default function Overview() {
  return (
    <Box pt={{ xs: '130px', md: '80px', xl: '80px' }}>
      <Grid
        container
        spacing={{ xs: 2, xl: 2 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={12} lg={5}>
          <Banner
            banner={banner}
            avatar={avatar5}
            name="Adela Parkson"
            job="Product Designer"
            posts="17"
            followers="9.7k"
            following="274"
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Storage used={25.6} total={50} />
        </Grid>
        <Grid item xs={12} lg={3}>
          <Upload
            minHeight={{ xs: 'auto', lg: '420px', xl: '365px' }}
            paddingRight="20px"
            paddingBottom={{ xs: '100px', lg: '20px' }}
          />
        </Grid>
        <Grid item xs={12} lg={6} sx={{ marginBottom: '20px' }}>
          <Projects />
        </Grid>
        <Grid item xs={12} lg={6}>
          <General minHeight="365px" paddingRight="20px" />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Notifications />
        </Grid>
      </Grid>
    </Box>
  );
}
