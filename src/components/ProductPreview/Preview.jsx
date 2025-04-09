import { Box, Container, Grid, Typography } from "@mui/material"
import "./Preview.css"



export const Preview = () => {


    return (
        <Box sx={{ mt: 10 }}>

            <Container sx={{ width: 'clamp(95%, 6vw, 80%)' }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid size={8}>
                        <Typography variant="h1" className="text-1" sx={{ color: 'white', fontSize: 'clamp(3.1rem, 6vw, 7rem)' }}>create your</Typography>
                        <Typography variant="h1" className="text-2" sx={{ color: 'white', fontSize: 'clamp(3.1rem, 6vw, 7rem)' }}>create your</Typography>
                        <Typography variant="h1" className="text-3" sx={{ color: 'white', fontSize: 'clamp(3.1rem, 6vw, 7rem)' }}>create your</Typography>
                        <Typography variant="h1" className="text-4" sx={{ color: 'white', fontSize: 'clamp(3.1rem, 6vw, 7rem)' }}>own play <br /> style</Typography>
                    </Grid>
                    <Grid size={4}>
                        <Box
                            component="video"
                            src="/videos/video1.mp4"
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

        </Box>
    )
}