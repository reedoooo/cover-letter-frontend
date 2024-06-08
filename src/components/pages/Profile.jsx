import { Box, Grid } from '@mui/material';
// import { avatar1, banner } from 'assets/img';
import PageLayout from 'components/common/PageLayout';
import GeneralInformation from 'views/admin/profile/components/General';
import Upload from 'views/admin/profile/components/Upload';

function Content() {
  return (
    <Box sx={{ paddingTop: { xs: '130px', md: '80px', xl: '80px' } }}>
      {/* Main Fields */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          {/* <Banner
            banner={banner}
            avatar={avatar1}
            name="Adela Parkson"
            job="Product Designer"
            posts="17"
            followers="9.7k"
            following="274"
          /> */}
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Upload
            sx={{
              minHeight: {
                xs: 'auto',
                lg: '420px',
                '2xl': '365px',
              },
              paddingRight: '20px',
              paddingBottom: { xs: '100px', lg: '20px' },
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={6} lg={6}>
          <GeneralInformation
            sx={{
              minHeight: '365px',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function Profile() {
  return (
    <PageLayout>
      <Grid
        item
        xs={12}
        container
        sx={{
          backgroundColor: '#1F2937',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Content />
      </Grid>
    </PageLayout>
  );
}

export default Profile;
