import React from 'react';
import { Box, Typography, Button, styled, keyframes } from '@mui/material';
import Marquee from "react-fast-marquee";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';

const marquee = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;


const MarqueeContainer = styled(Box)({
    position: 'relative',
    overflow: 'hidden',
    width: '100wh',
    maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
});

export default function SmoothMarquee() {
    const text = 'DOMINATE THE GAME';
    const textNext = "WIN INSTANTLY";
    const items = (
        <Box sx={{ display: 'flex', justifyContent: 'center', ml: 2, mr: 2, color: 'white' }}>
            <Typography
                variant="h4"
                component="span"
                sx={{ whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'Andale Mono, monospace', }}
            >
                {`${text}`}
                <ArrowForwardIosIcon sx={{ color: 'rgba(250, 255, 111, 0.5)' }} />
                <ArrowForwardIosIcon sx={{ color: 'rgba(250, 255, 111, 0.7)' }} />
                <ArrowForwardIosIcon sx={{ color: 'rgb(248, 252, 119)' }} />
            </Typography>
            <Link to="/payment/dravox">
                <Button
                    variant="contained"
                    sx={{
                        ml: 2,
                        mr: 2,
                        backgroundColor: 'rgba(250, 255, 111, 0.3)',
                        color: 'white',
                        borderRadius: 0,
                        fontFamily: 'Andale Mono, monospace',
                        textTransform: 'none',
                        fontSize: {
                            xs: '0.7rem',  // Mobile
                            sm: '0.8rem',  // Small tablets
                            md: '1rem',    // Desktop
                            lg: '1rem',
                            xl: '1.1rem',
                        },
                        px: {
                            xs: 1.5,
                            sm: 2,
                            md: 3,
                        },
                        py: {
                            xs: 0.5,
                            sm: 0.7,
                            md: 1,
                        },
                        minWidth: {
                            xs: 100,
                            sm: 130,
                            md: 160,
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(250, 255, 111, 1)',
                            color: 'black',
                            boxShadow: '0 0 10px rgba(250, 255, 111, 1)',
                            transition: 'background-color 0.3s ease-in-out',
                        },
                    }}
                >
                    TRY IT NOW
                </Button>
            </Link>

            <Typography
                variant="h4"
                component="span"
                sx={{ whiteSpace: 'nowrap', flexShrink: 0, fontFamily: 'Andale Mono, monospace', }}
            >
                <ArrowBackIosIcon sx={{ color: 'rgb(248, 252, 119)' }} />
                <ArrowBackIosIcon sx={{ color: 'rgba(250, 255, 111, 0.7)' }} />
                <ArrowBackIosIcon sx={{ color: 'rgba(250, 255, 111, 0.5)' }} />
                {`${textNext}`}
            </Typography>
        </Box>
    );

    return (
        <MarqueeContainer sx={{ bgcolor: 'black', p: 2, }}>
            <Marquee>
                {items}
                {items}
            </Marquee>
        </MarqueeContainer>
    );
}
