import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const words = ["Creative", "Developer", "Designer", "Visionary", "Muhamad Gunawan"];

const Preloader = () => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const topCurtainRef = useRef(null);
    const bottomCurtainRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentWordIndex(prev => {
                if (prev >= words.length - 1) {
                    clearInterval(interval);
                    return prev;
                }
                return prev + 1;
            });
        }, 300); // Speed of word shuffle

        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        if (currentWordIndex === words.length - 1) {
            const tl = gsap.timeline({
                onComplete: () => setIsLoaded(true),
                delay: 0.5
            });

            // Final word "Muhamad Gunawan" scale up
            tl.to(textRef.current, {
                scale: 1.2,
                duration: 0.5,
                ease: "back.out(1.7)"
            })
                // Text fades out
                .to(textRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    delay: 0.5
                })
                // Split curtain animation
                .to(topCurtainRef.current, {
                    yPercent: -100,
                    duration: 1,
                    ease: "power4.inOut"
                })
                .to(bottomCurtainRef.current, {
                    yPercent: 100,
                    duration: 1,
                    ease: "power4.inOut"
                }, "<")
                // Hide container
                .set(containerRef.current, {
                    display: "none"
                });
        }
    }, [currentWordIndex]);

    if (isLoaded) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        >
            {/* Split Curtains */}
            <div ref={topCurtainRef} className="absolute top-0 left-0 w-full h-1/2 bg-black z-0" />
            <div ref={bottomCurtainRef} className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-0" />

            {/* Kinetic Text */}
            <h1
                ref={textRef}
                className="relative z-10 text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mix-blend-difference"
            >
                {words[currentWordIndex]}
            </h1>
        </div>
    );
};

export default Preloader;
