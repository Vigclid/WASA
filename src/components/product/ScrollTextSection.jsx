import React, { use, useEffect, useRef, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { projects } from '../../data.js';
import './ScrollTextSection.css';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  console.log(project.src)
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
            alt="Testing"
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

  // useEffect(() => {

  //   const unsubscribe = scrollYProgress.onChange((latest) => {
  //     console.log(latest);
  //   });

  // }, [scrollYProgress]);

  return (
    <Box sx={{ position: 'relative' }} >
      <Box sx={{ position: 'relative' }} ref={container} >

        {projects.map((project, index) => {
          const targetScale = 1 - ((projects.length - index) * 0.05);
          return <ProjectCard key={index} project={project} i={index} progress={scrollYProgress} range={[index * 0.25, 1]} target={targetScale} />
        })}

      </Box>
      <Box sx={{ position: 'relative', height: '100vh' }}>
        <Typography variant="h4" sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center',
          zIndex: 1,
        }}>
          Test
        </Typography>
      </Box>
    </Box >
  );
};

export default ScrollTextSection;
