import { Box, Typography, Button } from '@mui/material';
import heroImg from '../assets/heroImg.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
   const navigate = useNavigate();

   return (
       <Box className='landingContainer'>
          <Box className='leftContent'>
             <Typography variant="h2">
                It&#39;s Time to
             </Typography>
             <Typography variant="h1" className='heading'>Travel</Typography>
             <Typography variant="h6" className='subheading'>
                Plan your perfect getaway today and make your dream vacation a reality!
             </Typography>
             <Button className='planButton' onClick={() => navigate('/register')}>Plan Your Trip</Button>
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
