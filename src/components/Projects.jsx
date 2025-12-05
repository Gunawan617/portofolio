import React, { useRef } from 'react';
import gsap from 'gsap';

const projects = [
    {
        title: "E-Commerce Dashboard",
        category: "Web Application",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
        title: "Finance Tracker",
        category: "Fintech",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
    },
    {
        title: "AI Image Generator",
        category: "Artificial Intelligence",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop"
    },
    {
        title: "Modern Portfolio",
        category: "Web Design",
        image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?q=80&w=2680&auto=format&fit=crop"
    },
];

const ProjectCard = ({ project }) => {
    const cardRef = useRef(null);
    const contentRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 1000,
            transformStyle: "preserve-3d"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-xl aspect-video cursor-pointer"
            style={{ transformStyle: "preserve-3d" }}
        >
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ transform: "translateZ(0px)" }}
            />
            <div
                ref={contentRef}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center"
                style={{ transform: "translateZ(50px)" }}
            >
                <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                <p className="text-accent mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.category}</p>
            </div>
        </div>
    );
};

const Projects = () => {
    return (
        <section className="py-24 px-6 bg-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mb-12 text-white">Selected Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
