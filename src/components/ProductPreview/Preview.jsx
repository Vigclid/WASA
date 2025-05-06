import { Box, Container, Grid, Typography } from "@mui/material"
import "./Preview.css"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary, {
    accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect } from "react";


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));


const AccordionContainer = styled('div')({
    position: 'relative',
    paddingLeft: 40, // tạo khoảng trống bên trái cho đường line
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 20, // điều chỉnh sao cho thẳng với expand icon (có thể cần tinh chỉnh)
        top: 0,
        bottom: 0, // từ đầu đến cuối của container
        width: '2px',
        backgroundColor: 'gray',
        transition: 'height 0.3s ease',
    },
});

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<Typography sx={{ fontSize: '0.9rem', mr: 5 }}> {props.id} </Typography>}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
        transform: 'rotate(0deg)',
        textShadow: ' 0 0 10px rgb(186, 210, 0)',
        color: '#F9FC7E',
    },
    [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
        color: 'white'
    },
    [`& .${accordionSummaryClasses.content}.${accordionSummaryClasses.expanded}`]: {

        textShadow: ' 0 0 10px rgb(186, 210, 0)',
        color: '#F9FC7E',
    },
    [`& .${accordionSummaryClasses.content}`]: {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));


const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, 0)',
}));


export const Preview = () => {
    const [expanded, setExpanded] = React.useState('panel1');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    }

    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "start 40%"],
    });

    const imageRote = useTransform(scrollYProgress, [0, 1], [45, 0]);
    const imageScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
    const imageOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const MotionBox = motion(Box);

    return (
        <Box sx={{ mt: 10 }}>
            <Container sx={{ width: 'clamp(95%, 6vw, 80%)', position: '', minHeight: '100vh' }}>

                <Grid item xs={12} md={8} sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h1" className="text-1" sx={{
                        color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 6rem)', sm: 'clamp(2.5rem, 6vw, 6rem)', md: 'clamp(2.5rem, 6vw, 6rem)' },

                    }}>CREATE YOUR</Typography>
                    <Typography variant="h1" className="text-2" sx={{
                        color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 6rem)', sm: 'clamp(2.5rem, 6vw, 6rem)', md: 'clamp(2.5rem, 6vw, 6rem)' },
                        transform: {
                            xs: 'translateY(-50%)', // trên mobile (extra small)
                            sm: 'translateY(-70%)', // trên desktop nhỏ
                            md: 'translateY(-70%)'  // desktop trung bình trở lên
                        }

                    }}>CREATE YOUR</Typography>
                    <Typography variant="h1" className="text-3" sx={{
                        color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 6rem)', sm: 'clamp(2.5rem, 6vw, 6rem)', md: 'clamp(2.5rem, 6vw, 6rem)' },
                        transform: {
                            xs: 'translateY(-100%)', // điều chỉnh cho mobile
                            sm: 'translateY(-130%)', // desktop nhỏ
                            md: 'translateY(-130%)'
                        }

                    }}>CREATE YOUR</Typography>
                    <Typography variant="h1" className="text-4" sx={{
                        color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 6rem)', sm: 'clamp(2.5rem, 6vw, 6rem)', md: 'clamp(2.5rem, 6vw, 6rem)' },
                        transform: {
                            xs: 'translateY(-58%)',
                            sm: 'translateY(-73%)',
                            md: 'translateY(-73%)'
                        }
                    }}>OWN PLAY<br />STYLE</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box
                        component="video"
                        src="videos/FloatingController.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        sx={{
                            mt: 10,
                            position: 'absolute',
                            right: 0,
                            zIndex: -1,
                            top: 0,
                            objectFit: 'cover',
                            height: {
                                xs: '50%',
                                md: '70%',
                            },
                            width: {
                                xs: '100%',
                                md: 'auto',
                            },
                        }}
                    />
                </Grid>
                <Typography variant="h5" className="text-5" sx={{ color: 'gray', fontSize: 'clamp(1rem, 6vw, 1.2rem)' }}>
                    Experience next-level gaming with our precision-crafted controllers.</Typography>
            </Container>

            <Box sx={{ width: 'clamp(95%, 6vw, 80%)', paddingTop: 1, position: 'relative', minHeight: '100vh' }}>
                <Grid item xs={12} md={4}>

                    <MotionBox
                        component="img"
                        src="images/product4.png"
                        alt="Background"
                        ref={containerRef}
                        sx={{
                            position: 'absolute',
                            left: 0,
                            mt: 3,
                            transform: `translateY(-15%)`,
                            objectFit: 'cover',
                            height: {
                                xs: '50%',
                                md: '60%',
                            },
                            width: {
                                xs: '100%',
                                md: 'auto',
                            },
                        }}
                        style={{
                            rotate: imageRote,
                            scale: imageScale,
                            opacity: imageOpacity
                        }}
                    />



                </Grid>
                <Grid item xs={12} md={8} sx={{ position: 'relative', zIndex: 1 }}>
                    <Box sx={{ position: 'absolute', zIndex: 1, right: 0 }}>
                        <Typography
                            variant="h1"
                            className="text-1"
                            sx={{
                                color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 4rem)', sm: 'clamp(2.5rem, 6vw, 4rem)', md: 'clamp(2.5rem, 6vw, 4rem)' },

                            }}
                        >
                            BUIDING YOUR
                        </Typography>
                        <Typography
                            variant="h1"
                            className="text-4"
                            sx={{
                                color: 'white',
                                color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 4rem)', sm: 'clamp(2.5rem, 6vw, 4rem)', md: 'clamp(2.5rem, 6vw, 4rem)' },

                                transform: {
                                    xs: 'translateY(-50%)', // trên mobile (extra small)
                                    sm: 'translateY(-70%)', // trên desktop nhỏ
                                    md: 'translateY(-70%)'  // desktop trung bình trở lên
                                }
                            }}
                        >
                            BUIDING YOUR
                        </Typography>
                        <Typography
                            variant="h1"
                            className="text-4"
                            sx={{
                                color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 4rem)', sm: 'clamp(2.5rem, 6vw, 4rem)', md: 'clamp(2.5rem, 6vw, 4rem)' },

                                transform: {
                                    xs: 'translateY(-55%)',
                                    sm: 'translateY(-85%)',
                                    md: 'translateY(-85%)'
                                }
                            }}
                        >
                            OWN PLAY STYLE
                        </Typography>

                        <Box sx={{
                            transform: {
                                xs: 'translateY(-0%)',
                                sm: 'translateY(-10%)',
                                md: 'translateY(-10%)'
                            }, width: {
                                md: "500px",
                                xs: "100%",
                                sm: "100%"
                            },
                            height: '200px'
                        }}>
                            <AccordionContainer>
                                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ mt: 30 }} disabled hidden>
                                    <AccordionSummary aria-controls="panel1d-content" id="00">
                                        <Typography component="span" color="">Controller</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className="acc acc1">
                                    <AccordionSummary aria-controls="panel2d-content" id="01">
                                        <Typography component="span">PLAY YOUR WAY</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography ml={8}>
                                            Customize your controller settings and layout to match your unique style. Whether you're a casual player or a pro, take full control of how you play.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="acc acc2">
                                    <AccordionSummary aria-controls="panel3d-content" id="02">
                                        <Typography component="span">MASTER EVERY MOVE</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography ml={8}>
                                            Fine-tune sensitivity, response time, and button mapping. Our controllers are built to help you sharpen your skills and beat your personal best.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="acc acc3">
                                    <AccordionSummary aria-controls="panel4d-content" id="03">
                                        <Typography component="span">EXPLORE DIFFERENT GENRES</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography ml={8}>
                                            Whether you're into racing, FPS, sports, or adventure, our controllers adapt to every genre. Build your ideal setup and dive into your favorite worlds.
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>

                            </AccordionContainer>
                        </Box>
                    </Box>
                </Grid>

            </Box>
        </Box>
    )
}