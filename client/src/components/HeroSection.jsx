import { Box, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import heroImg from '../assets/heroImg.jpg';


const useStyles = makeStyles(() => ({
    heroContainer: {
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80vh',
        padding: '0 40px',
        flexDirection: 'row', // Align text and image horizontally
        '@media (max-width: 900px)': {
            flexDirection: 'column', // Change to column on screens smaller than 600px
            alignItems: 'center', // Center the items
            padding: '0 20px', // Adjust padding on mobile
        },
    },
    leftContent: {
        marginTop: '10rem',
        marginLeft: '12rem',
        maxWidth: '600px',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    heading: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '16px',
        textShadow: '2px 2px 4px #8BC4A4',
    },
    planButton: {
        backgroundColor: '#F0707D !important',
        maxWidth: '150px',
        padding: '12px 20px',
        marginTop: '20px',
        border: '1px solid #F0707D',
        '&:hover': {
            backgroundColor: '#F0707D',
        },
    },
    rightContent: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    heroImage: {
        width: '35rem',
        height: 'auto',
    },
}));

const HeroSection = () => {
    const classes = useStyles();

    return (
        <Box className='heroContainer'>
            <Box className='leftContent'>
                <Typography variant="h2">It&#39;s Time to</Typography>
                <Typography variant="h1" className='heading'>Travel</Typography>
                <Typography variant="h6" className='subheading'>
                    planning your perfect getaway today and make your dream vacation a reality!
                </Typography>
                <Button className='planButton' to={'/register'}>Plan Your Trip</Button>
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

export default HeroSection;
