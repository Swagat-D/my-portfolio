"use client"

import memojiImage from "@/assets/images/memoji-computer.png"
import Image from "next/image"
import ArrowDown from "@/assets/icons/arrow-down.svg"
import grainImage from "@/assets/images/grain.jpg"
import StarIcon from "@/assets/icons/star.svg"
import { HeroOrbit } from "@/components/HeroOrbit"
import SparkleIcon from "@/assets/icons/sparkle.svg"
import { useState, useEffect, useRef } from "react"

export const HeroSection = () => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [currentText, setCurrentText] = useState("")
  const [showMainText, setShowMainText] = useState(false)
  const [showSwitch, setShowSwitch] = useState(false)
  const [isOn, setIsOn] = useState(true)
  const ballRef = useRef<HTMLDivElement>(null)
  const switchRef = useRef<HTMLDivElement>(null)

  const introText = "Hi, my name is Swagat. I am a Software Engineer."
  const mainText = "Crafting Scalable Full Stack Solutions for the Modern Web"

  // Improved animation for intro text
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= introText.length) {
        setCurrentText(introText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
        // Wait a bit then show main text
        setTimeout(() => {
          setShowMainText(true)
        }, 700)
      }
    }, 80) // Slightly faster typing

    return () => clearInterval(timer)
  }, [])

  // Scroll effect for switch - moved trigger points higher
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector(".hero-section")
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        const heroHeight = rect.height
        const scrollProgress = Math.abs(rect.top) / heroHeight

        // Show switch earlier (at 40% instead of 60%) and keep it visible longer
        if (scrollProgress >= 0.4 && scrollProgress <= 1.3) {
          setShowSwitch(true)
          // Animate ball position based on scroll progress
          if (ballRef.current) {
            const ballProgress = Math.min((scrollProgress - 0.4) / 0.4, 1) // Normalize between 0.4-0.8
            const ballY = 120 - ballProgress * 120 // Move from bottom (120) to top (0)
            ballRef.current.style.transform = `translateY(${ballY}px)`
          }
        } else {
          setShowSwitch(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Switch animation - removed manual animation since scroll handles it
  const animateSwitch = () => {
    // Optional: Add click feedback without changing position
    // since position is controlled by scroll
    if (switchRef.current) {
      switchRef.current.style.transform = "scale(0.95)"
      setTimeout(() => {
        if (switchRef.current) {
          switchRef.current.style.transform = "scale(1)"
        }
      }, 150)
    }
  }

  // Working CV download method
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

  // Scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact")
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes smoothTypewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        
        @keyframes smoothBlink {
          0%, 50% {
            opacity: 1;
          }
          51%, 100% {
            opacity: 0;
          }
        }
        
        .word-animate {
          display: inline-block;
          opacity: 0;
          animation: slideInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          margin-right: 0.35em;
          transform-origin: bottom;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        .typewriter-cursor {
          animation: smoothBlink 1.2s infinite;
          color: #10b981;
          font-weight: 300;
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
          animation: slideInFromBottom 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
      `}</style>

      <div className="hero-section py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip">
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

        <div className="container">
          <div className="flex flex-col  items-center">
            <Image
              src={memojiImage || "/placeholder.svg"}
              className="size-[100px]"
              alt="Person peeking from behind laptop"
            />
            <div className="bg-gray-950 border-gray-800 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg">
              <div className="bg-green-500 size-2.5 rounded-full relative">
                <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
              </div>
              <div className="text-sm font-medium">Available for New Projects</div>
            </div>
          </div>

          <div className="max-w-lg mx-auto">
            {/* Improved animated intro text with smoother typewriter effect */}
            <div className="text-xl md:text-2xl text-center mt-8 mb-4 h-16 flex items-center justify-center">
              <div className="text-emerald-300 font-medium">
                {currentText}
                {!showMainText && <span className="typewriter-cursor ml-1">|</span>}
              </div>
            </div>

            {/* Improved main animated text with better stagger timing */}
            {showMainText && (
              <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide leading-tight">
                {mainText.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className="word-animate"
                    style={{
                      animationDelay: `${index * 0.12}s`,
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            )}

            {showMainText && (
              <p
                className="mt-6 text-center text-white/70 md:text-lg leading-relaxed animate-fade-in-up"
                style={{ animationDelay: "1.8s" }}
              >
                I build high-performance web applications with clean UI and scalable backend systems. From concept to
                deployment, I turn ideas into reliable full stack solutions. Let&apos;s build something powerful
                together.
              </p>
            )}
          </div>

          {showMainText && (
            <div
              className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4 animate-fade-in-up"
              style={{ animationDelay: "2.2s" }}
            >
              <button
                onClick={handleDirectDownload}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl hover:bg-white/5 hover:border-white/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
              >
                {isDownloading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
                    </svg>
                    <span className="font-semibold">Downloading...</span>
                  </>
                ) : (
                  <>
                    <span className="font-semibold">Explore My Work</span>
                    <ArrowDown className="size-4" />
                  </>
                )}
              </button>

              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl hover:bg-gray-100 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <span>👋</span>
                <span className="font-semibold py">Let&apos;s connect</span>
              </button>
            </div>
          )}
        </div>

        {/* Animated Switch - positioned higher to avoid being hidden */}
        <div className={`switch-container ${showSwitch ? "visible" : ""}`}>
          <div ref={switchRef} className="switch" onClick={animateSwitch}>
            <div ref={ballRef} className="ball" />
          </div>
        </div>
      </div>
    </>
  )
}
