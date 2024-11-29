import { useState, useContext } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { AppBar, Toolbar, Button, Avatar, Box, IconButton, Drawer, List, ListItem, ListItemText, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../assets/logo.png';
import { AuthContext } from '../services/authContext.jsx';

const Navbar = () => {
    // Use AuthContext to get the current user, token, and logout function
    const { user, handleLogout } = useContext(AuthContext);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    // Handle "My Account" dropdown open/close
    const handleMyAccountClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // Handle logout
    const handleLogoutClick = (nav) => {
        // Call the logout function from AuthContext
        handleLogout(navigate);
        handleCloseMenu();
    };

    // Handle the hamburger menu toggle
    const toggleDrawer = (open) => () => {
        setOpenDrawer(open);
    };

    return (
        <AppBar position="sticky" className="navbar">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                <Link to={"/"}>
                    <Avatar sx={{ flexGrow: 0 }} src={logo} alt="logo-img" style={{ height: '55px', width: 'auto' }} />
                </Link>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    {user ? (
                        <>
                            <Button variant="contained" color="success" onClick={handleMyAccountClick}> My Account</Button>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                                <MenuItem onClick={() => { navigate(`/profile`); handleCloseMenu();}}>Profile</MenuItem>
                                <MenuItem onClick={() => { navigate('/dashboard'); handleCloseMenu();}}>Dashboard</MenuItem>
                                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button color="success" variant="outlined" onClick={() => navigate('/register')}>Register</Button>
                            <Button color="success" variant="contained" onClick={() => navigate('/login')}>Sign In</Button>
                        </Box>
                    )}
                </Box>

                {/* Hamburger Menu Icon (Mobile Only) */}
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
            <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                    <List>
                        {user ? (
                            <>
                                <ListItem button onClick={() => navigate(`/user/${user.id}`)}>
                                    <ListItemText primary="Profile" />
                                </ListItem>
                                <ListItem button onClick={() => navigate('/dashboard')}>
                                    <ListItemText primary="Dashboard" />
                                </ListItem>
                                <ListItem button onClick={handleLogoutClick}>
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </>
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <ListItem button onClick={() => navigate('/register')}>
                                    <ListItemText primary="Register" />
                                </ListItem>
                                <ListItem button onClick={() => navigate('/login')}>
                                    <ListItemText primary="Sign In" />
                                </ListItem>
                            </Box>
                        )}
                    </List>
                </Box>
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
