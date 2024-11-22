import { Box, Typography, Button } from '@mui/material';
import heroImg from '../assets/heroImg.jpg';

const Home = () => {

   return (
       <Box className='landingContainer'>
          <Box className='leftContent'>
             <Typography variant="h2">
                It&#39;s Time to
             </Typography>
             <Typography variant="h1" className='heading'>Travel</Typography>
             <Typography variant="h6" className='subheading'>
                planning your perfect getaway today and make your dream vacation a reality!
             </Typography>
             <Button className='planButton'>Plan Your Trip</Button>
          </Box>

          <Box className='rightContent'>
             <img
                 className='heroImage'
                 alt="hero img"
                 src={heroImg}
             />
          </Box>
       </Box>
   );
};

export default Home;
