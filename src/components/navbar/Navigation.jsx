import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import React from "react";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { Link as ScrollLink } from 'react-scroll';
import { scroller } from 'react-scroll';

import './nav.css'

const pages = ['Products', 'Abilities', 'Technologies'];

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
        <AppBar position="sticky" sx={{ backgroundColor: 'black', boxShadow: 'none', marginTop: 0 }}>
            <Container maxWidth="lg" disableGutters={false} sx={{ px: { xs: 2, sm: 4 } }}>
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <ScrollLink to="Products" smooth={true} duration={500}>
                        <Box
                            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                            role="button"
                        >
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
                    </ScrollLink>

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
                                    <MenuItem
                                        key={page}
                                        onClick={() => {
                                            handleCloseNavMenu(); // đóng menu trước
                                            setTimeout(() => {
                                                scroller.scrollTo(page, {
                                                    smooth: true,
                                                    duration: 500,
                                                    offset: -70, // nếu có navbar fixed
                                                });
                                            }, 100); // chờ menu đóng
                                        }}
                                    >
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                            {pages.map((page) => (
                                <ScrollLink key={page} to={page} smooth={true} duration={500}>
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ color: 'white', textTransform: 'none' }}
                                        className="btn-shine"
                                    >
                                        {page}
                                    </Button>
                                </ScrollLink>
                            ))}
                        </Box>
                        <Box sx={{ Border: 10, borderColor: 'white', borderRadius: 2, padding: 1, marginLeft: 8 }}>
                            <Link to="/payment/dravox">
                                <Button className="paymentbtn"  >
                                    <Typography textAlign="center">BUY NOW |  $499.99</Typography>
                                </Button>
                            </Link>
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>

    )
}