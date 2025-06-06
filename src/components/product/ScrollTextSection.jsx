import React, { use, useEffect, useRef, useState } from 'react';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { projects } from '../../data.js';
import './ScrollTextSection.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import MouseTracking from './MouseTracking.jsx';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { animate } from 'animejs';
import InfiniteMarquee from './InfiniteMarquee.jsx';
import { Link } from 'react-router-dom';




const ProjectCard = ({ project, i, progress, range, target }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const imgscale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, target]);
  const MotionBox = motion(Box);
  const MotionCardMedia = motion(CardMedia);
  return (
    <MotionBox className="cardContainer" ref={containerRef} style={{ scale: scale }}>
      <Card className="productCard" sx={{
        width: `80%`,
        background: 'rgb(0, 0, 0)',
        borderRadius: '16px',
        boxShadow: `0 4px 30px ${project.color}1A`,
        border: '1px solid rgba(255, 255, 255, 0.3)',
        color: 'rgb(255, 255, 255)',
        position: 'relative',
        top: `calc(-10px + ${i * 25}px)`,
      }}>
        <Box sx={{ display: 'flex' }}>
          <CardContent>
            <Typography variant="h3"
              sx={{
                alignItems: 'center',
                fontFamily: 'Andale Mono, monospace',
                fontSize: {
                  xs: '0.8rem',
                  sm: '2.3rem',
                  md: '2.6rem',
                  lg: '3rem',
                  xl: '3.3rem',
                },
                color: 'rgba(255, 255, 255, 0.9)',
                marginLeft: '10%',
                marginTop: '5%',
                textShadow: `5px 5px 15px ${project.color}FF`,
              }}
            >{project.title}</Typography>
            <Typography variant="h5"
              sx={{
                width: '80%',
                fontFamily: 'Andale Mono, monospace',
                fontSize: {
                  xs: '0.5rem',
                  sm: '0.8rem',
                  md: '1rem',
                  lg: '1.3rem',
                  xl: '1.7rem',
                },
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '5%',
                marginLeft: '10%',
                marginBottom: '10px',
              }}
            >{project.description}</Typography>
          </CardContent>

          <MotionCardMedia
            component="img"
            src={project.src}
            alt={project.title}
            style={{
              marginLeft: 'auto',
              width: '20%',
              scale: imgscale,
              margin: '10px',
              border: `2px solid rgba(0, 0, 0, 0.6)`,
              borderRadius: '16px',
            }}
          />
        </Box>
      </Card>
    </MotionBox>
  );
};



const ScrollTextSection = () => {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });



  return (
    <Box sx={{ position: 'relative' }} >
      <Box sx={{ position: 'relative' }} ref={container} >

        {projects.map((project, index) => {
          const targetScale = 1 - ((projects.length - index) * 0.05);
          return <ProjectCard key={index} project={project} i={index} progress={scrollYProgress} range={[index * 0.25, 1]} target={targetScale} />
        })}

      </Box>

      <Box id={"Abilities"} sx={{ position: 'relative', height: '100vh' }}>
        <Typography variant="h2" sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          zIndex: 1,
        }}>
          THE ULTIMATE
        </Typography>
        <Typography variant="h2" sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          zIndex: 1,
        }}>
          GAMING
        </Typography>
        <Typography variant="h2" sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          zIndex: 1,
        }}>
          CONTROLLER
        </Typography>
      </Box>
      <Box sx={{
        position: 'relative',
        height: '47rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      }}>

        <Box
          component="img"
          src='images/product4.png'
          alt="Testing"
          sx={{
            width: '40%',
          }}
        />

        <Box sx={{
          position: 'absolute',
          top: {
            xs: '36%',
            sm: '15%'
          },
        }}>
        <MouseTracking />
        </Box>
        {/* Typography 1 - bên trái trên */}
        <Box
          sx={{
            position: 'absolute', left: '10%', top: '15%', width: '20%',
            opacity: 0.5,
            '&:hover': {
              opacity: 1,
              transition: 'opacity 0.3s ease-in-out',
            },
            '&:not(:hover)': {
              opacity: 0.5,
              transition: 'opacity 0.3s ease-in-out',
            },
          }}>
          <ElectricBoltIcon sx={{
            color: 'rgb(250, 255, 111)',
            fontSize: '2rem',
            border: '2px solid rgb(250, 255, 111)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgb(250, 255, 111)',
          }} />
          <Typography variant="h5" sx={{
            marginTop: 1,
            color: 'white',
            fontSize: {
              xs: '0.7rem',
              sm: '0.7rem',
              md: '1.3rem',
              lg: '1.3rem',
              xl: '1.3rem',
            },
            fontFamily: 'Andale Mono, monospace',
            fontWeight: 'bold',
          }}>
            LIGHTNING RESPONSE
          </Typography>
          <Typography variant="h6" sx={{
            color: 'white',
            fontSize: {
              xs: '0.5rem',
              sm: '0.7rem',
              md: '1rem',
              lg: '1rem',
              xl: '1rem',
            },
            fontFamily: 'Andale Mono, monospace',
            marginTop: '2.5%',
          }}>
            React instantly to every move. With ultra-low latency input,
            our controllers give you the edge in fast-paced action and competitive play.
          </Typography>
        </Box>

        {/* Typography 2 - bên trái dưới */}
        <Box sx={{
          position: 'absolute', left: '10%', top: '60%', width: '20%',
          opacity: 0.5,
          '&:hover': {
            opacity: 1,
            transition: 'opacity 0.3s ease-in-out',
          },
          '&:not(:hover)': {
            opacity: 0.5,
            transition: 'opacity 0.3s ease-in-out',
          },
        }}>
          <MicNoneOutlinedIcon sx={{
            color: 'rgb(231, 111, 255)',
            fontSize: '2rem',
            border: '2px solid rgb(231, 111, 255)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgb(231, 111, 255)',
          }} />
          <Typography variant="h5" sx={{
            marginTop: 1,
            color: 'white',
            fontSize: {
              xs: '0.7rem',
              sm: '0.7rem',
              md: '1.3rem',
              lg: '1.3rem',
              xl: '1.3rem',
            },
            fontFamily: 'Andale Mono, monospace',
            fontWeight: 'bold',
          }}>
            BUILT IN MICRO
          </Typography>
          <Typography variant="h6" sx={{
            color: 'white',
            fontSize: {
              xs: '0.5rem',
              sm: '0.7rem',
              md: '1rem',
              lg: '1rem',
              xl: '1rem',
            },
            fontFamily: 'Andale Mono, monospace',
            marginTop: '2.5%',
          }}>
            Communicate clearly with your teammates using the integrated microphone.
            No need for extra accessories—just plug in and play with voice chat ready.

          </Typography>
        </Box>


        {/* Typography 3 - bên phải giữa */}
        <Box sx={{
          position: 'absolute', right: '5%', top: '35%', width: '20%',
          opacity: 0.5,
          '&:hover': {
            opacity: 1,
            transition: 'opacity 0.3s ease-in-out',
          },
          '&:not(:hover)': {
            opacity: 0.5,
            transition: 'opacity 0.3s ease-in-out',
          },
        }}>
          <GpsFixedIcon sx={{
            color: 'rgb(104, 255, 250)',
            fontSize: '2rem',
            border: '2px solid rgb(104, 255, 250)',
            borderRadius: '50%',
            boxShadow: '0 0 10px rgb(104, 255, 250)',
          }} />
          <Typography variant="h5" sx={{
            marginTop: 1,
            color: 'white',
            fontSize: {
              xs: '0.7rem',
              sm: '0.7rem',
              md: '1.3rem',
              lg: '1.3rem',
              xl: '1.3rem',
            },
            fontFamily: 'Andale Mono, monospace',
            fontWeight: 'bold',
          }}>
            WIRELESS CONNECTIVITY
          </Typography>
          <Typography variant="h6" sx={{
            color: 'white',
            fontSize: {
              xs: '0.5rem',
              sm: '0.7rem',
              md: '1rem',
              lg: '1rem',
              xl: '1rem',
            },
            fontFamily: 'Andale Mono, monospace',
            marginTop: '2.5%',
          }}>
            Enjoy smooth, cable-free gaming with stable wireless performance.
            Move freely and stay connected without lag or interruptions.
          </Typography>
        </Box>

      </Box>

      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'black',
          ml: { xs: 2, sm: 4, md: 10 },
          mr: { xs: 2, sm: 4, md: 10 },
          px: { xs: 2, sm: 4, md: 10 },
          py: { xs: 6, md: 12 },
        }}
      >
        <Grid container spacing={4}>
          {/* Text Section */}
          <Grid item xs={12}>
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'Andale Mono, monospace',
                  mb: 2,
                  fontSize: {
                    xs: '1.4rem',
                    sm: '2rem',
                    md: '2.5rem',
                    lg: '3rem',
                  },
                }}
              >
                DISCOVER THE <br /> POWER OF GAMING <br /> WITH OUR CONTROLLER
              </Typography>
              <Typography
                sx={{
                  color: 'white',
                  fontSize: {
                    xs: '0.8rem',
                    sm: '0.9rem',
                    md: '1rem',
                  },
                  fontFamily: 'Andale Mono, monospace',
                  mb: 4,
                }}
              >
                Unlock a new level of gaming with our controller. Feel the precision, comfort,
                and responsive control, elevating your experience.
              </Typography>
            </Box>
          </Grid>

          {/* Left Image - product5.png */}
          <Grid item xs={12} md={6}>
            <Box position="relative" width="100%" maxWidth="540px" mx="auto">
              <Box
                component="img"
                src="images/product5.png"
                alt="Description"

                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  boxShadow: `0 4px 30px rgb(68, 68, 68)`,

                }}
              />
              <Link to="/payment/dravox">
                <Button
                  sx={{
                    position: 'absolute',
                    bottom: -12,
                    right: 10,
                    backgroundColor: 'rgba(250, 255, 111, 0.3)',
                    color: 'white',
                    borderRadius: '0px',
                    fontFamily: 'Andale Mono, monospace',
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.7rem',
                      md: '1rem',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(250, 255, 111, 1)',
                      color: 'black',
                      boxShadow: '0 0 10px rgba(250, 255, 111, 1)',
                      transition: 'background-color 0.3s ease-in-out',
                    },
                  }}
                >
                  DARKNESS
                  <span className="corner TL"></span>
                  <span className="corner TR"></span>
                  <span className="corner BL"></span>
                  <span className="corner BR"></span>
                </Button>
              </Link>
            </Box>
          </Grid>

          {/* Right Image - 14.png */}
          <Grid item xs={12} md={6}>
            <Box position="relative" width="100%" maxWidth="600px" mx="auto">
              <Box
                component="img"
                src="images/14.png"
                alt="Ảnh minh họa"

                sx={{
                  width: {
                    xs: '100%',
                    md : '90%',
                    lg: '60%',
                  },
                  height: 'auto',
                  borderRadius: '16px',
                  objectFit: 'cover',
                  boxShadow: `0 4px 20px rgb(68, 68, 68)`,
                  float: {
                    sm: 'left',
                    md: 'left',
                    lg: 'right',
                  },
                }}
              />
              <Link to="/payment/dravox">
                <Button
                  sx={{
                    position: 'absolute',
                    right: 10,
                    top: {
                      xs: 610, 
                      md: 940,
                      lg: 620,    
                    },
                    backgroundColor: 'rgba(250, 255, 111, 0.3)',
                    color: 'white',
                    borderRadius: '0px',
                    fontFamily: 'Andale Mono, monospace',
                    fontSize: {
                      xs: '0.5rem',
                      sm: '0.7rem',
                      md: '1rem',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(250, 255, 111, 1)',
                      color: 'black',
                      boxShadow: '0 0 10px rgba(250, 255, 111, 1)',
                      transition: 'background-color 0.3s ease-in-out',
                    },
                  }}
                >
                  DravoX
                  <span className="corner TL"></span>
                  <span className="corner TR"></span>
                  <span className="corner BL"></span>
                  <span className="corner BR"></span>
                </Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box postion={'relative'}>
        <InfiniteMarquee position={'relative'} />
        <Box
          component="video"
          src="videos/videobanner.mp4"
          autoPlay
          muted
          loop
          playsInline
          alt="Product Marquee"
          position="relative"
          sx={{
            width: '100%',
            height: 'auto',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />

      </Box>
    </Box >
  );
};

export default ScrollTextSection;
