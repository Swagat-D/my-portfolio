"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState("home")

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

      // Update active section based on scroll position
      const sections = ['home', 'projects', 'about', 'contact']
      const sectionElements = sections.map(id => document.querySelector(`#${id === 'home' ? 'home' : id}`))
      
      let currentSection = 'home'
      sectionElements.forEach((element, index) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = sections[index]
          }
        }
      })
      
      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "about", label: "About", href: "#about" },
    { id: "contact", label: "Contact", href: "#contact" },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-6 w-full z-50 flex justify-center items-center px-4"
        >
          <motion.nav 
            className="flex p-1 border bg-gray-900/80 backdrop-blur-xl border-white/15 rounded-full shadow-2xl shadow-black/40"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 400, damping: 25 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeSection === item.id
                    ? "text-gray-900"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}