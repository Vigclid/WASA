import { Box, Container, Grid, Typography } from "@mui/material"
import "./Preview.css"



export const Preview = () => {


    return (
        <Box sx={{ mt: 10 }}>

            <Container sx={{ width: 'clamp(95%, 6vw, 80%)' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={8}>
                        <Typography variant="h1" className="text-1" sx={{
                            color: 'white', fontSize: { xs: 'clamp(2.7rem, 6vw, 7rem)', sm: 'clamp(3.1rem, 6vw, 7rem)', md: 'clamp(3.1rem, 6vw, 7rem)' },

                        }}>create your</Typography>
                        <Typography variant="h1" className="text-2" sx={{
                            color: 'white', fontSize: { xs: 'clamp(2.7rem, 6vw, 7rem)', sm: 'clamp(3.1rem, 6vw, 7rem)', md: 'clamp(3.1rem, 6vw, 7rem)' },
                            transform: {
                                xs: 'translateY(-50%)', // trên mobile (extra small)
                                sm: 'translateY(-70%)', // trên desktop nhỏ
                                md: 'translateY(-70%)'  // desktop trung bình trở lên
                            }

                        }}>create your</Typography>
                        <Typography variant="h1" className="text-3" sx={{
                            color: 'white', fontSize: { xs: 'clamp(2.7rem, 6vw, 7rem)', sm: 'clamp(3.1rem, 6vw, 7rem)', md: 'clamp(3.1rem, 6vw, 7rem)' },
                            transform: {
                                xs: 'translateY(-100%)', // điều chỉnh cho mobile
                                sm: 'translateY(-130%)', // desktop nhỏ
                                md: 'translateY(-130%)'
                            }

                        }}>create your</Typography>
                        <Typography variant="h1" className="text-4" sx={{
                            color: 'white', fontSize: { xs: 'clamp(2.7rem, 6vw, 7rem)', sm: 'clamp(3.1rem, 6vw, 7rem)', md: 'clamp(3.1rem, 6vw, 7rem)' },
                            transform: {
                                xs: 'translateY(-60%)',
                                sm: 'translateY(-75%)',
                                md: 'translateY(-75%)'
                            }
                        }}>own play <br /> style</Typography>
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
                    <Box sx={{ position: 'absolute', zIndex: 1 , right : 0}}>
                        <Typography variant="h1" className="text-1" sx={{
                            color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 4rem)', sm: 'clamp(2.1rem, 6vw, 4rem)', md: 'clamp(2.1rem, 6vw, 4rem)' },

                        }}>BUIDING YOUR</Typography>
                        <Typography variant="h1" className="text-4" sx={{
                            color: 'white', fontSize: { xs: 'clamp(2.1rem, 6vw, 4rem)', sm: 'clamp(2.1rem, 6vw, 4rem)', md: 'clamp(2.1rem, 6vw, 4rem)' },
                            transform: {
                                xs: 'translateY(-50%)', // trên mobile (extra small)
                                sm: 'translateY(-70%)', // trên desktop nhỏ
                                md: 'translateY(-70%)'  // desktop trung bình trở lên
                            }

                        }}>BUIDING YOUR</Typography>
                           <Typography variant="h1" className="text-4" sx={{
                            color: 'white', fontSize: { xs: 'clamp(2.7rem, 6vw, 7rem)', sm: 'clamp(3.1rem, 6vw, 7rem)', md: 'clamp(3.1rem, 6vw, 7rem)' },
                            transform: {
                                xs: 'translateY(-45%)',
                                sm: 'translateY(-65%)',
                                md: 'translateY(-65%)'
                            }
                        }}>own play style</Typography>
                    </Box>
                    
                </Grid>
            </Container>
        </Box>
    )
}