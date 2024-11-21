import { Button, Typography, Box, Card, CardContent, CardMedia } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    heroSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: '60vh',
        padding: theme.spacing(4),
        backgroundColor: '#f5f5f5',
    },
    heroText: {
        maxWidth: '50%',
        paddingRight: theme.spacing(3),
    },
    heading: {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
    },
    subheading: {
        marginTop: theme.spacing(2),
        fontSize: '1.2rem',
        color: theme.palette.text.primary,
    },
    button: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1, 4),
        fontSize: '1rem',
    },
    cardGrid: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: theme.spacing(2),
    },
    card: {
        width: 250,
        borderRadius: '10px',
        boxShadow: theme.shadows[2],
    },
    cardMedia: {
        height: 140,
    },
    cardText: {
        textAlign: 'center',
    },
}));

const HeroSection = () => {
    const classes = useStyles();

    return (
        <Box className={classes.heroSection}>
            {/* Left Side - Heading and Button */}
            <Box className={classes.heroText}>
                <Typography variant="h1" className={classes.heading}>
                    Explore Dream Destinations
                </Typography>
                <Typography variant="h6" className={classes.subheading}>
                    Discover breathtaking places around the world. Start your journey with us!
                </Typography>
                <Button variant="contained" color="primary" className={classes.button}>
                    Plan Your Trip
                </Button>
            </Box>

            {/* Right Side - Cards */}
            <Box className={classes.cardGrid}>
                {[1, 2, 3].map((item) => (
                    <Card key={item} className={classes.card}>
                        <CardMedia
                            component="img"
                            alt="destination"
                            className={classes.cardMedia}
                            image={`https://via.placeholder.com/250x140?text=Destination+${item}`}
                        />
                        <CardContent>
                            <Typography variant="h6" className={classes.cardText}>
                                Destination {item}
                            </Typography>
                            <Typography variant="body2" className={classes.cardText}>
                                Discover beautiful places to visit. A perfect vacation destination.
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default HeroSection;
