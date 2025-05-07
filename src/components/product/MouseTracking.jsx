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
                    width: {
                        xs: '20px',  // Kích thước đồng hồ trên màn hình nhỏ (mobile)
                        sm: '50px',  // Kích thước đồng hồ trên tablet
                        md: '60px',  // Kích thước đồng hồ trên màn hình lớn
                    },
                    height: {
                        xs: '20px',  // Kích thước chiều cao đồng hồ trên màn hình nhỏ
                        sm: '50px',
                        md: '60px',
                    },
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
                        width: {
                            xs: '2px',  // Kích thước mũi tên trên màn hình nhỏ
                            sm: '4px',  // Kích thước mũi tên trên tablet
                            md: '6px',  // Kích thước mũi tên trên màn hình lớn
                        },
                        height: {
                            xs: '25%',  // Mũi tên có chiều cao nhỏ trên mobile
                            sm: '30%',  // Mũi tên lớn hơn trên tablet
                            md: '35%',  // Mũi tên lớn nhất trên màn hình lớn
                        },
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