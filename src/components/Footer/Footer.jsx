import React from 'react';
import { Box, IconButton, Button, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 4,
        py: 2,
        bgcolor: 'rgba(10, 12, 10, 0.9)',
        color: 'grey.100',
      }}
    >
      {/* Social media icons on the left */}
      <Box>
        <IconButton href="#"  aria-label="Facebook" sx={{ color: 'inherit' }}>
          <FacebookIcon />
        </IconButton>
        <IconButton href="#" aria-label="Twitter" sx={{ color: 'inherit' }}>
          <TwitterIcon />
        </IconButton>
        <IconButton href="#" aria-label="Instagram" sx={{ color: 'inherit' }}>
          <InstagramIcon />
        </IconButton>
      </Box>

      {/* Three clickable buttons in the center */}
      <Box>
        <Button variant="text" className="btn-shine" sx={{ color: 'inherit', mx: 1 }}>
          Home
        </Button>
        <Button variant="text" className="btn-shine" sx={{ color: 'inherit', mx: 1 }}>
          About
        </Button>
        <Button variant="text" className="btn-shine" sx={{ color: 'inherit', mx: 1 }}>
          Contact
        </Button>
      </Box>

      {/* Copyright text on the right */}
      <Typography variant="body2">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  );
}
