"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
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
          className="fixed top-6 w-full z-50 flex justify-center items-center px-4"
        >
          <nav className="flex p-1 border bg-gray-900/70 backdrop-blur-lg border-white/10 rounded-full shadow-lg shadow-black/20">
            <button onClick={() => scrollToSection("#home")} className="nav-item">Home</button>
            <button onClick={() => scrollToSection("#projects")} className="nav-item">Projects</button>
            <button onClick={() => scrollToSection("#about")} className="nav-item">About</button>
            <button onClick={() => scrollToSection("#contact")} className="nav-item bg-white text-gray-900 hover:bg-white/90 hover:text-gray-900">Contact</button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}