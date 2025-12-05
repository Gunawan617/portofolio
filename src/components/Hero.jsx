import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        const video = videoRef.current;

        // Ensure video metadata is loaded for duration
        if (video) {
            // Create the scroll-bound video effect
            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=400%", // Scroll distance to play the video (4x viewport height)
                    scrub: 1, // Smooth scrubbing
                    pin: true, // Pin the container while scrolling
                    // markers: true, // Uncomment for debugging
                }
            })
                .to(video, {
                    currentTime: video.duration || 10, // Fallback if duration not ready immediately
                    ease: "none",
                });

            // Text animation (fade out as you scroll down)
            gsap.to(textRef.current, {
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=50%",
                    scrub: true,
                }
            });
        }
    }, { scope: containerRef });

    // Handle video metadata load to ensure duration is available
    const handleLoadedMetadata = () => {
        // Trigger a refresh if needed, or just let GSAP handle it (it usually does well)
    };

    return (
        <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
            <video
                ref={videoRef}
                src="/hero-video.mp4"
                className="absolute top-0 left-0 w-full h-full object-cover"
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={handleLoadedMetadata}
            />

            <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay */}

            <div ref={textRef} className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
                    Silent Poetry
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 max-w-2xl">
                    Written in code, felt in motion
                </p>
                <div className="mt-12 animate-bounce">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Hero;
