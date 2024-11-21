import { useState } from 'react';
import { AppBar, Toolbar, Button, Avatar, Box, Link, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import '../App.css';

const Navbar = () => {
    // Track if the user is signed in or not
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false); // State to control Drawer (hamburger menu)
    const navigate = useNavigate(); // Use useNavigate hook for redirection

    // Toggle sign-in/sign-out and handle redirection
    const handleAuthToggle = () => {
        if (isSignedIn) {
            // When signed in, sign out and redirect to register page
            // setIsSignedIn(false);
            // navigate('/register');
        } else {
            // When signed out, redirect to sign-up page
            navigate('/register');
        }
    };

    // Handle the hamburger menu
    const toggleDrawer = (open) => () => {
        setOpenDrawer(open);
    };

    return (
        <AppBar position="sticky" className="navbar">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Avatar
                    variant="h6"
                    sx={{ flexGrow: 0 }}
                    src={logo}
                    alt="logo-img"
                    style={{ height: '55px', width: 'auto' }}
                />
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, flexGrow: 1, justifyContent: 'center' }}>
                    {isSignedIn && (
                        <>
                            <Link href="/profile" color="inherit" underline="none">
                                Profile
                            </Link>
                            <Link href="/dashboard" color="inherit" underline="none">
                                Dashboard
                            </Link>
                        </>
                    )}
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Button color="inherit" onClick={handleAuthToggle}>
                        {isSignedIn ? 'Sign Out' : 'Register'}
                    </Button>
                </Box>

                {/* Hamburger menu icon (only on mobile) */}
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    sx={{ display: { xs: 'block', md: 'none' } }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>

            {/* Hamburger Menu */}
            <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    <List>
                        {/* Show Profile and Dashboard only when signed in */}
                        {isSignedIn && (
                            <>
                                <ListItem button component="a" href="/profile">
                                    <ListItemText primary="Profile" />
                                </ListItem>
                                <ListItem button component="a" href="/dashboard">
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                            </>
                        )}
                    </List>
                    <ListItem button onClick={handleAuthToggle}>
                        <ListItemText primary={isSignedIn ? 'Sign Out' : 'Register'} />
                    </ListItem>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
