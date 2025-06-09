"use client"

import memojiImage from "@/assets/images/memoji-computer.png"
import Image from "next/image"
import ArrowDown from "@/assets/icons/arrow-down.svg"
import grainImage from "@/assets/images/grain.jpg"
import StarIcon from "@/assets/icons/star.svg"
import { HeroOrbit } from "@/components/HeroOrbit"
import SparkleIcon from "@/assets/icons/sparkle.svg"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

export const HeroSection = () => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [currentRole, setCurrentRole] = useState(0)
  const ballRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 700 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  const roles = [
    "Full Stack Developer",
    "UI/UX Enthusiast", 
    "Problem Solver",
    "Tech Innovator",
    "Code Artist"
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        setMousePosition({ x, y })
        mouseX.set(x)
        mouseY.set(y)
      }
    }

    const heroElement = heroRef.current
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Role rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  const handleDirectDownload = () => {
    setIsDownloading(true)
    try {
      const link = document.createElement("a")
      link.href = "/cv/Swagat_Dash_CV.pdf"
      link.download = "Swagat-Dash_CV.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading CV:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact")
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  }

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
      scale: 0.5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  }

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2
  }))

  return (
    <>
      <style jsx>{`
        .hero-gradient {
          background: radial-gradient(circle at 30% 40%, rgba(52, 211, 153, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
        }
        
        .code-rain {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
        }
        
        .code-line {
          position: absolute;
          color: rgba(52, 211, 153, 0.3);
          font-family: 'Courier New', monospace;
          font-size: 12px;
          white-space: nowrap;
          animation: codefall linear infinite;
        }
        
        @keyframes codefall {
          from {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .glitch-text {
          position: relative;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          animation: glitch-1 2s infinite;
          color: rgba(52, 211, 153, 0.8);
          z-index: -1;
        }
        
        .glitch-text::after {
          animation: glitch-2 2s infinite;
          color: rgba(56, 189, 248, 0.8);
          z-index: -2;
        }
        
        @keyframes glitch-1 {
          0%, 14%, 15%, 49%, 50%, 99%, 100% {
            transform: translate(0);
          }
          15%, 49% {
            transform: translate(-2px, 2px);
          }
        }
        
        @keyframes glitch-2 {
          0%, 20%, 21%, 62%, 63%, 99%, 100% {
            transform: translate(0);
          }
          21%, 62% {
            transform: translate(2px, -2px);
          }
        }

        .switch-container {
          position: absolute;
          bottom: 15%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          opacity: 0;
          transition: opacity 0.4s ease-in-out;
        }

        @media (max-width: 768px) {
          .switch-container {
            display: none;
          }
        }

        .switch-container.visible {
          opacity: 1;
        }

        .switch {
          width: 70px;
          height: 180px;
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(52, 211, 153, 0.3);
          display: flex;
          align-items: flex-start;
          border-radius: 45px;
          padding: 8px;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(52, 211, 153, 0.2), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .switch:hover {
          border-color: rgba(52, 211, 153, 0.5);
          box-shadow: 0 12px 40px rgba(52, 211, 153, 0.3), 
                      inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        .ball {
          width: 54px;
          height: 54px;
          background: linear-gradient(135deg, #34d399, #10b981);
          border-radius: 27px;
          will-change: transform;
          box-shadow: 0 4px 16px rgba(52, 211, 153, 0.5),
                      0 2px 8px rgba(52, 211, 153, 0.3);
          transition: none;
          transform: translateY(120px);
        }

        .interactive-cursor {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(52, 211, 153, 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease;
        }
      `}</style>

      <div 
        id="home" 
        className="hero-section hero-gradient py-32 md:py-48 lg:py-60 relative z-0 overflow-hidden"
        ref={heroRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Interactive Cursor */}
        <motion.div
          className="interactive-cursor hidden lg:block"
          style={{
            x: springX,
            y: springY,
            scale: isHovering ? 1.5 : 1,
          }}
          animate={{
            rotate: isHovering ? 360 : 0,
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-emerald-300/30 rounded-full"
              initial={{
                x: `${particle.x}%`,
                y: `${particle.y}%`,
                scale: 0,
              }}
              animate={{
                y: [`${particle.y}%`, `${particle.y - 100}%`],
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Code Rain Effect */}
        <div className="code-rain">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="code-line"
              style={{
                left: `${i * 10}%`,
                animationDuration: `${8 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              {`<${['div', 'span', 'h1', 'p', 'section'][Math.floor(Math.random() * 5)]}>`}
            </div>
          ))}
        </div>

        <div
          className="absolute inset-0"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 70%, transparent)",
          }}
        >
          <div className="absolute inset-0 -z-30 opacity-5" style={{ backgroundImage: `url(${grainImage.src})` }}></div>
          <div className="size-[620px] hero-ring"></div>
          <div className="size-[820px] hero-ring"></div>
          <div className="size-[1020px] hero-ring"></div>
          <div className="size-[1220px] hero-ring"></div>

          <HeroOrbit size={430} rotation={-14} shouldOrbit orbitDuration="30s" shouldSpin spinDuration="3s">
            <SparkleIcon className="size-8 text-emerald-300/20 " />
          </HeroOrbit>

          <HeroOrbit size={440} rotation={79} shouldOrbit orbitDuration="32s" shouldSpin spinDuration="3s">
            <SparkleIcon className="size-5 text-emerald-300/20 " />
          </HeroOrbit>

          <HeroOrbit size={520} rotation={-41} shouldOrbit orbitDuration="34s">
            <div className="size-2 rounded-full bg-emerald-300/20 " />
          </HeroOrbit>

          <HeroOrbit size={530} rotation={178} shouldOrbit orbitDuration="36s" shouldSpin spinDuration="3s">
            <SparkleIcon className="size-10 text-emerald-300/20 " />
          </HeroOrbit>

          <HeroOrbit size={550} rotation={20} shouldOrbit orbitDuration="38s" shouldSpin spinDuration="6s">
            <StarIcon className="size-12 text-emerald-300" />
          </HeroOrbit>

          <HeroOrbit size={590} rotation={98} shouldOrbit orbitDuration="40s" shouldSpin spinDuration="6s">
            <StarIcon className="size-8 text-emerald-300" />
          </HeroOrbit>

          <HeroOrbit size={650} rotation={-5} shouldOrbit orbitDuration="42s">
            <div className="size-3 rounded-full bg-emerald-300/20 " />
          </HeroOrbit>

          <HeroOrbit size={710} rotation={144} shouldOrbit orbitDuration="44s" shouldSpin spinDuration="3s">
            <SparkleIcon className="size-14 text-emerald-300/20 " />
          </HeroOrbit>

          <HeroOrbit size={720} rotation={85} shouldOrbit orbitDuration="46s">
            <div className="size-3 rounded-full bg-emerald-300/20 " />
          </HeroOrbit>

          <HeroOrbit size={800} rotation={-72} shouldOrbit orbitDuration="48s" shouldSpin spinDuration="6s">
            <StarIcon className="size-28 text-emerald-300" />
          </HeroOrbit>
        </div>

        <div className="container relative z-10">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                type: "spring", 
                stiffness: 100,
                delay: 0.2
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, 0],
                transition: { duration: 0.5 }
              }}
            >
              <Image
                src={memojiImage || "/placeholder.svg"}
                className="size-[100px] filter drop-shadow-2xl"
                alt="Person peeking from behind laptop"
              />
            </motion.div>

            <motion.div 
              className="bg-gray-950/80 backdrop-blur-md border border-emerald-300/20 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(52, 211, 153, 0.3)" }}
            >
              <motion.div 
                className="bg-green-500 size-2.5 rounded-full relative"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="bg-green-500 absolute inset-0 rounded-full animate-ping"></div>
              </motion.div>
              <div className="text-sm font-medium">Available for New Projects</div>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-center mt-8"
            >
              <div className="text-emerald-300 font-medium text-lg mb-2">
                👋 Hello, I&#39;m Swagat Kumar Dash
              </div>
            </motion.div>

            {/* Dynamic Role Changer */}
            <div className="text-center mt-4 h-20 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h1 
                  key={currentRole}
                  className="font-serif text-3xl md:text-5xl tracking-wide leading-tight glitch-text"
                  data-text={roles[currentRole]}
                  initial={{ opacity: 0, y: 50, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: -50, rotateX: 90 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 0.6
                  }}
                >
                  {roles[currentRole]}
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.p
              className="mt-6 text-center text-white/70 md:text-lg leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <span className="text-emerald-300">Transforming ideas into reality</span> through elegant code and innovative design. 
              I build high-performance applications that users love and businesses need.
            </motion.p>

            <motion.div 
              className="text-center mt-4 text-white/50 text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
            >
              {"{ creativity: 'unlimited', coffee: 'required', bugs: 0 }"}
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
          >
            <motion.button
              onClick={handleDirectDownload}
              disabled={isDownloading}
              className="group relative inline-flex items-center gap-2 border border-emerald-300/30 px-6 h-12 rounded-xl bg-emerald-300/5 hover:bg-emerald-300/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 8px 25px rgba(52, 211, 153, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 to-sky-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              {isDownloading ? (
                <>
                  <motion.svg 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </motion.svg>
                  <span className="font-semibold relative z-10">Downloading...</span>
                </>
              ) : (
                <>
                  <span className="font-semibold relative z-10">Download CV</span>
                  <ArrowDown className="size-4 relative z-10 group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 h-12 px-6 rounded-xl hover:from-emerald-400 hover:to-sky-500 transition-all duration-300 overflow-hidden"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 12px 35px rgba(52, 211, 153, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                👋
              </motion.span>
              <span className="font-semibold relative z-10">Let&#39;s Connect</span>
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3, duration: 1 }}
          >
            <motion.div
              className="flex flex-col items-center gap-2 text-white/40"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
              <ArrowDown className="size-4" />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </>
  )
}