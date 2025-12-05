import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);
    const headingRef = useRef(null);
    const textRef = useRef(null);
    const skillsRef = useRef(null);
    const statsRef = useRef(null);
    const [stats, setStats] = useState({ years: 0, projects: 0, clients: 0 });

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                onEnter: () => {
                    // Animate stats counter
                    gsap.to(stats, {
                        years: 1,
                        projects: 20,
                        clients: 15,
                        duration: 2,
                        ease: "power2.out",
                        onUpdate: function () {
                            setStats({
                                years: Math.floor(this.targets()[0].years),
                                projects: Math.floor(this.targets()[0].projects),
                                clients: Math.floor(this.targets()[0].clients)
                            });
                        }
                    });
                }
            }
        });

        tl.from(headingRef.current, {
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: "power3.out"
        })
            .from(textRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4")
            .from(statsRef.current.children, {
                opacity: 0,
                scale: 0.8,
                duration: 0.6,
                stagger: 0.1,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .from(skillsRef.current.children, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out"
            }, "-=0.4");
    }, { scope: containerRef });

    return (
        <section id="about" ref={containerRef} className="relative py-32 px-6 bg-primary text-white overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    animation: 'grid-move 20s linear infinite'
                }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

                {/* Left Column: Title */}
                <div className="md:col-span-4">
                    <h2
                        ref={headingRef}
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-gradient"
                        style={{
                            backgroundSize: '200% auto'
                        }}
                    >
                        About
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-accent to-transparent mb-8"></div>
                    <p className="text-gray-400 text-sm uppercase tracking-widest">
                        Based in Indonesia<br />
                        Available for freelance
                    </p>

                    {/* Stats Counter */}
                    <div ref={statsRef} className="mt-12 space-y-6">
                        <div className="border-l-2 border-accent pl-4">
                            <div className="text-4xl font-bold text-white">{stats.years}+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Years Experience</div>
                        </div>
                        <div className="border-l-2 border-accent pl-4">
                            <div className="text-4xl font-bold text-white">{stats.projects}+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Projects Completed</div>
                        </div>
                        <div className="border-l-2 border-accent pl-4">
                            <div className="text-4xl font-bold text-white">{stats.clients}+</div>
                            <div className="text-sm text-gray-400 uppercase tracking-wider">Happy Clients</div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Content */}
                <div className="md:col-span-8">
                    <p ref={textRef} className="text-2xl md:text-4xl leading-tight font-light text-gray-200 mb-16">
                        I am a passionate creative developer focused on building immersive web experiences.
                        I believe in the power of motion and interaction to tell compelling stories.
                        With a background in design and engineering, I bridge the gap between aesthetics and functionality.
                    </p>

                    <div ref={skillsRef} className="grid grid-cols-2 gap-8">
                        <div className="group">
                            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider group-hover:text-accent transition-colors">Services</h3>
                            <ul className="space-y-2">
                                <li className="text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer">Web Development</li>
                                <li className="text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer">UI/UX Design</li>
                                <li className="text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer">Creative Coding</li>
                                <li className="text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer">Motion Graphics</li>
                            </ul>
                        </div>
                        <div className="group">
                            <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider group-hover:text-accent transition-colors">Tech Stack</h3>
                            <ul className="space-y-2">
                                <li className="text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer">React / Next.js</li>
                                <li className="text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer">GSAP / Three.js</li>
                                <li className="text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer">Tailwind CSS</li>
                                <li className="text-gray-400 hover:text-white hover:translate-x-2 transition-all cursor-pointer">Node.js</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(50px, 50px); }
                }
                @keyframes gradient {
                    0% { background-position: 0% center; }
                    50% { background-position: 100% center; }
                    100% { background-position: 0% center; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </section>
    );
};

export default About;
