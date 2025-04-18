import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import React from "react";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import './nav.css'

const pages = ['Products', 'Pricing', 'Blog'];

export const Navigation = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none', marginTop: 2 }}>
            <Container maxWidth="lg" disableGutters={false} sx={{ px: { xs: 2, sm: 4 } }}>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <img src="images/logo.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />

                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'white',
                                }}
                            >
                                DRAVOX
                            </Typography>
                        </Box>
                    </Link>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: 'white', textTransform: 'none' }}
                                    className="btn-shine"
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ Border: 10, borderColor: 'white', borderRadius: 2, padding: 1, marginLeft: 8 }}>
                            <Link>
                                <Button className="paymentbtn"  >
                                    <Typography textAlign="center">PRE ORDER $499.99</Typography>
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
}