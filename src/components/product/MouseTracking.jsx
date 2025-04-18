import React, { useRef, useEffect } from 'react';
import { createAnimatable } from 'animejs';
import { Box, Typography } from '@mui/material';

const MouseTracking = () => {
    const clockRef = useRef(null);
    const arrowRef = useRef(null);
    const animatableRef = useRef(null);
    const boundsRef = useRef(new DOMRect());

    useEffect(() => {
        const clockEl = clockRef.current;
        const arrowEl = arrowRef.current;
        if (!clockEl || !arrowEl) return;

        // Initialize bounds
        boundsRef.current = clockEl.getBoundingClientRect();

        // Refresh bounds on scroll
        const refreshBounds = () => {
            if (clockRef.current) {
                boundsRef.current = clockRef.current.getBoundingClientRect();
            }
        };
        window.addEventListener('scroll', refreshBounds);

        // Create animatable instance on the arrow
        animatableRef.current = createAnimatable(arrowEl, {
            rotate: { unit: 'rad' },
            duration: 400,
        });

        // Setup angle tracking
        let lastAngle = 0;
        let angle = -Math.PI / 2; // Start pointing upwards

        const onMouseMove = (e) => {
            const { width, height, left, top } = boundsRef.current;
            const x = e.clientX - left - width / 2;
            const y = e.clientY - top - height / 2;
            const currentAngle = Math.atan2(y, x);

            // Normalize angular difference
            const diff = currentAngle - lastAngle;
            if (diff > Math.PI) {
                angle += diff - 2 * Math.PI;
            } else if (diff < -Math.PI) {
                angle += diff + 2 * Math.PI;
            } else {
                angle += diff;
            }
            lastAngle = currentAngle;

            // Rotate the arrow
            animatableRef.current.rotate(angle);
        };

        window.addEventListener('mousemove', onMouseMove);

        return () => {
            window.removeEventListener('scroll', refreshBounds);
            window.removeEventListener('mousemove', onMouseMove);
        };
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: 4,
            }}
        >
            <Box
                ref={clockRef}
                sx={{
                    position: 'relative',
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    border: '2px solid rgb(250, 255, 111)',
                    boxShadow: 3,
                    mb: 2,
                }}
            >
                <Box
                    ref={arrowRef}
                    sx={{
                        position: 'absolute',
                        width: 4,
                        height: '30%',
                        borderRadius: '20%',
                        bgcolor: 'rgb(250, 255, 111)',
                        top: '50%',
                        left: '50%',
                        transformOrigin: '0% 0%',
                        transform: 'translate(-50%, -100%)',
                    }}
                />

            </Box>

        </Box>
    );
};

export default MouseTracking;