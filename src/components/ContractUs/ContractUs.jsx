import { Box, Typography, TextField, IconButton } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { color } from "framer-motion";

export default function ContractUs() {
    return (
        <Box
            position="relative"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mb={10}
        >
            <Typography
                color="white"
                variant="h2"
                textAlign="center"
                fontFamily="Andale Mono, monospace"
                fontWeight={400}
                mb={4}
            >
                gets news & updates
            </Typography>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                bgcolor="#0A0C0A"
                padding={4}
                borderRadius={2}
                width="50%"
                minHeight={120}
            >
                <TextField
                    variant="standard"
                    placeholder="example@email.com"
                    type="email"
                    sx={{
                        width: '70%',
                        // style bình thường
                        '& .MuiInput-input': {
                            color: 'white',
                            fontFamily: 'Andale Mono, monospace',
                        },
                        '& .MuiInput-underline:before': {
                            borderBottomColor: 'rgba(103, 233, 203, 0.5)',
                        },
                        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                            borderBottomColor: 'rgba(103, 233, 203, 0.7)',
                        },
                        '& .MuiInput-underline:after': {
                            borderBottomColor: 'rgba(103, 233, 203, 0.74)',
                        },
                    }}
                />
                <IconButton sx={{
                    color: 'white', border: '1px solid #67E9CB',
                    '&:hover': {
                        boxShadow: '0 0 20px 1px rgba(103, 233, 203, 0.2)',
                    }
                }}>
                    <ArrowForwardIcon sx={{ color: '#67E9CB' }} />
                </IconButton>
            </Box>
        </Box>
    );
}