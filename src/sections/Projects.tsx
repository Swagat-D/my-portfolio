"use client"

import fintrack from "@/assets/images/fintrack.jpg";
import lightSaasLandingPage from "@/assets/images/light-saas-landing-page.png";
import aiStartupLandingPage from "@/assets/images/ai-startup-landing-page.png";
import Image from "next/image";
import CheckCircleIcon from "@/assets/icons/check-circle.svg"
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"
import grainImage from "@/assets/images/grain.jpg"
import { SectionHeader } from "@/components/SectionHeader";
import GithubIcon from "@/assets/icons/github.svg"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

const portfolioProjects = [
  {
    company: "Personal Project",
    year: "2024",
    title: "FinTrack - Personal Finance Manager",
    description: "A comprehensive personal finance tracking application built with modern full-stack technologies.",
    results: [
      { title: "Built with Spring Boot & Angular", icon: "🔧" },
      { title: "Real-time expense tracking", icon: "📊" },
      { title: "Advanced budget analytics", icon: "📈" },
      { title: "Multi-currency support", icon: "💱" }
    ],
    technologies: ["Spring Boot", "Angular", "PostgreSQL", "JWT", "Docker"],
    link: "https://github.com/Swagat-D/FinTrack",
    image: fintrack,
    featured: true,
    category: "Full-Stack",
    status: "Live",
  },
  {
    company: "Client Project",
    year: "2023", 
    title: "SaaS Landing Page - Light Theme",
    description: "Modern, responsive landing page designed to convert visitors into customers.",
    results: [
      { title: "Boosted conversion rates by 35%", icon: "📈" },
      { title: "Improved user engagement by 50%", icon: "👥" },
      { title: "Mobile-first responsive design", icon: "📱" },
      { title: "Advanced SEO optimization", icon: "🔍" }
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    link: "https://github.com/Swagat-D",
    image: lightSaasLandingPage,
    featured: false,
    category: "Frontend",
    status: "Completed",
  },
  {
    company: "Innovation Lab",
    year: "2023",
    title: "AI Startup Landing Experience",
    description: "Cutting-edge landing page for an AI startup with interactive elements and modern animations.",
    results: [
      { title: "Enhanced UX with AI interactions", icon: "🤖" },
      { title: "50% faster load times", icon: "⚡" },
      { title: "Interactive data visualizations", icon: "📊" },
      { title: "Advanced animation system", icon: "✨" }
    ],
    technologies: ["React", "Three.js", "GSAP", "WebGL", "TypeScript"],
    link: "https://github.com/Swagat-D",
    image: aiStartupLandingPage,
    featured: true,
    category: "Frontend",
    status: "Live",
  },
];

export const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const categories = ["All", "Frontend", "Full-Stack", "Mobile"]
  
  const filteredProjects = selectedCategory === "All" 
    ? portfolioProjects 
    : portfolioProjects.filter(project => project.category === selectedCategory)

  const projectVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -10,
      scale: 1.02,
      transition: { duration: 0.3, type: "spring", stiffness: 300 }
    }
  }

  return (
    <section id="projects" className="pb-16 lg:py-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-emerald-300/10 rounded-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div 
        className="container relative z-10"
        style={{ y, opacity }}
      >
        <SectionHeader 
          title="Featured Projects" 
          eyebrow="Portfolio Showcase" 
          description="Explore my latest work showcasing technical expertise and creative problem-solving."
        />

        {/* Category Filter - Simple Design */}
        <motion.div 
          className="flex justify-center mt-12 mb-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-2xl lg:max-w-4xl">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid - Stacking Animation */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, projectIndex) => (
              <motion.div
                key={project.title}
                custom={projectIndex}
                variants={projectVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                onHoverStart={() => setHoveredProject(projectIndex)}
                onHoverEnd={() => setHoveredProject(null)}
                className="group relative mb-8"
                style={{
                  zIndex: filteredProjects.length - projectIndex
                }}
              >
                <motion.div 
                  className="bg-gray-800/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl sticky"
                  style={{
                    top: `calc(80px + ${projectIndex * 30}px)`,
                  }}
                  whileInView={{
                    scale: [0.95, 1],
                    y: [50, 0],
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: projectIndex * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  {/* Project Badge */}
                  {project.featured && (
                    <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
                      <motion.div
                        className="bg-gradient-to-r from-emerald-400 to-sky-400 text-gray-900 px-2 sm:px-3 py-1 rounded-full text-xs font-bold"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        ⭐ Featured
                      </motion.div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === "Live" 
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          project.status === "Live" ? "bg-green-400" : "bg-blue-400"
                        }`} />
                        <span className="hidden sm:inline">{project.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 -z-10 opacity-5" style={{
                    backgroundImage: `url(${grainImage.src})`,
                  }} />

                  {/* Responsive Grid Layout */}
                  <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-16 p-4 sm:p-8 md:p-12 lg:p-16">
                    {/* Content Section */}
                    <div className="order-2 lg:order-1 lg:pb-16">
                      {/* Project Header */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="bg-gradient-to-r from-emerald-300 to-sky-400 inline-flex gap-2 text-transparent bg-clip-text font-bold uppercase tracking-widest text-xs sm:text-sm">
                          <span>{project.company}</span>
                          <span>&bull;</span>
                          <span>{project.year}</span>
                        </div>
                        
                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl group-hover:text-emerald-300 transition-colors duration-300 leading-tight">
                          {project.title}
                        </h3>
                        
                        <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <hr className="border-t-2 border-white/5 my-4 sm:my-6" />

                      {/* Results */}
                      <ul className="space-y-3 sm:space-y-4">
                        {project.results.map((result, idx) => (
                          <motion.li 
                            key={idx} 
                            className="flex gap-2 sm:gap-3 text-sm sm:text-base text-white/70"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + idx * 0.1 }}
                          >
                            <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full flex items-center justify-center text-gray-900 text-xs">
                              {result.icon}
                            </div>
                            <span className="group-hover:text-white transition-colors duration-300">
                              {result.title}
                            </span>
                          </motion.li>
                        ))}
                      </ul>

                      {/* Technologies */}
                      <div className="mt-4 sm:mt-6">
                        <h4 className="text-sm font-semibold text-white/80 mb-2 sm:mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.technologies.map((tech, idx) => (
                            <motion.span
                              key={tech}
                              className="px-2 sm:px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-emerald-300 border border-emerald-300/20"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 + idx * 0.05 }}
                              whileHover={{ scale: 1.05, backgroundColor: "rgba(52, 211, 153, 0.1)" }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
                        <motion.a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 h-12 w-full rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:from-emerald-400 hover:to-sky-500 transition-all duration-300 shadow-lg">
                            <GithubIcon className="size-4 sm:size-5" />
                            <span>View Code</span>
                            <ArrowUpRightIcon className="size-4" />
                          </button>
                        </motion.a>
                        
                        <motion.button 
                          className="px-4 sm:px-6 h-12 border border-white/20 rounded-xl text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Live Demo
                        </motion.button>
                      </div>
                    </div>

                    {/* Project Image */}
                    <div className="relative order-1 lg:order-2 mb-6 lg:mb-0 lg:mt-0">
                      <motion.div 
                        className="relative group/image"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-auto rounded-lg sm:rounded-xl shadow-2xl group-hover/image:shadow-emerald-300/20 transition-shadow duration-300"
                        />
                        
                        {/* Overlay on hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent rounded-lg sm:rounded-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                        />
                        
                        {/* Hover Info */}
                        <motion.div 
                          className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                        >
                          <h4 className="font-semibold text-sm sm:text-base mb-1">🚀 {project.category} Project</h4>
                          <p className="text-xs sm:text-sm text-white/80">Click to explore the code</p>
                        </motion.div>
                      </motion.div>

                      {/* Floating Elements */}
                      {hoveredProject === projectIndex && (
                        <motion.div
                          className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full"
                          initial={{ scale: 0, rotate: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16 sm:mt-20 px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl sm:text-2xl font-serif mb-4">Interested in working together?</h3>
          <p className="text-white/60 mb-6">Let&#39;s create something amazing</p>
          <motion.button
            className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:from-emerald-400 hover:to-sky-500 transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(52, 211, 153, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const contactSection = document.querySelector("#contact")
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}