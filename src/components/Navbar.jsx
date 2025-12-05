import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useGSAP(() => {
        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                // Minimalist: just fade in a subtle background if needed, or keep it clean.
                // User asked for "no box", so we'll keep it very minimal.
                // Maybe just a slight text shadow or very subtle scrim if needed for contrast.
                // For now, let's keep it purely transparent as requested "no box".
            }
        });
    });

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#work' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 z-40 px-6 py-6 flex justify-center transition-all duration-300"
        >
            {/* Desktop Menu - Centered, No Logo, No Box */}
            <div className="hidden md:flex gap-12">
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        className="text-sm font-medium text-gray-300 hover:text-white transition-colors tracking-widest uppercase"
                    >
                        {link.name}
                    </a>
                ))}
            </div>

            {/* Mobile Menu Button - Absolute positioned to right or left since we have no container */}
            <button onClick={toggleMenu} className="md:hidden absolute right-6 text-white mix-blend-difference">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-0 left-0 right-0 bg-black/95 backdrop-blur-xl p-6 flex flex-col gap-6 h-screen z-50 items-center justify-center">
                    <button onClick={toggleMenu} className="absolute top-6 right-6 text-white">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-3xl font-light text-white tracking-widest uppercase hover:text-accent transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
