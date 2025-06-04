"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Show header when scrolling up or at top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-3 w-full z-50 flex justify-center items-center"
        >
          <nav className="flex p-0.5 border bg-gray-900/80 backdrop-blur-lg border-white/15 rounded-full shadow-lg shadow-black/20">
            <a href="#" className="nav-item">Home</a>
            <a href="#projects" className="nav-item">Projects</a>
            <a href="#about" className="nav-item">About</a>
            <a href="#contact" className="nav-item bg-white text-gray-900 hover:bg-white/90 hover:text-gray-900">Contact</a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}