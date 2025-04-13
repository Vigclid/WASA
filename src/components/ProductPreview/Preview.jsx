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
        color : '#F9FC7E',
    },
    [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
        color : 'white'
    },
    [`& .${accordionSummaryClasses.content}.${accordionSummaryClasses.expanded}`]: {

        textShadow: ' 0 0 10px rgb(186, 210, 0)',
        color : '#F9FC7E',
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
    return (
        <Box sx={{ mt: 10 }}>

            <Container sx={{ width: 'clamp(95%, 6vw, 80%)' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={8}>
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
                    <Grid>
                        <Box
                            component="video"
                            src="videos/video1.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: -1,
                                objectFit: 'cover',
                                height: {
                                    xs: '50%',   // Mobile: chỉ chiếm 50% chiều cao
                                    md: '100%',  // Desktop: chiếm toàn bộ
                                },
                                width: {
                                    xs: '100%',
                                    md: 'auto',
                                },
                            }}
                        />

                    </Grid>
                </Grid>
                <Typography variant="h5" className="text-5" sx={{ color: 'gray', fontSize: 'clamp(1rem, 6vw, 1.2rem)' }}>Immersee yourself in increadinle virtual reality and expetiences</Typography>
            </Container>

            <Container sx={{ width: 'clamp(95%, 6vw, 80%)', paddingTop: 50 }}>
                <Grid item xs={12} md={4}>

                    <Box
                        component="video"
                        src="videos/video1.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        sx={{
                            position: 'absolute',
                            left: 0,
                            transform: 'translateX(0%)',
                            objectFit: 'cover',
                            height: {
                                xs: '50%',
                                md: '100%',
                            },
                            width: {
                                xs: '100%',
                                md: 'auto',
                            },
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
                                sm: 'translateY(-30%)',
                                md: 'translateY(-30%)'
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
                                        <Typography component="span">PLAY TOGETHER</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography ml={8}>
                                            Makes it easy to meet friends in VR. Share your adventures with friends and let them join the game as player two
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className="acc acc2" sx={{}}>
                                    <AccordionSummary aria-controls="panel3d-content" id="02">
                                        <Typography component="span">EXERCISE AND BEET YOUR OWN RECORDS</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography ml={8}>
                                            Makes it easy to meet friends in VR. Share your adventures with friends and let them join the game as player two
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className="acc acc3" sx={{}}>
                                    <AccordionSummary aria-controls="panel4d-content" id="03">
                                        <Typography component="span">EXPLORE THE WORLD</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography ml={8}>
                                            Makes it easy to meet friends in VR. Share your adventures with friends and let them join the game as player two
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </AccordionContainer>
                        </Box>
                    </Box>
                </Grid>

            </Container>
        </Box>
    )
}