"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import GithubIcon from "@/assets/icons/github.svg"
import LinkedInIcon from "@/assets/icons/linkedin.svg"
import InstagramIcon from "@/assets/icons/instagram.svg"
import TwitterIcon from "@/assets/icons/twitter.svg"

const footerLinks = [
  {
    title: 'Github',
    href: 'https://github.com/Swagat-D',
    icon: GithubIcon,
    description: 'View my code'
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/swagatdash15',
    icon: LinkedInIcon,
    description: 'Professional network'
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/_swagat_dash_',
    icon: InstagramIcon,
    description: 'Behind the scenes'
  },
  {
    title: 'Twitter',
    href: 'https://x.com/swagatdash164',
    icon: TwitterIcon,
    description: 'Tech thoughts'
  }
]

const quickLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
]

const services = [
  'Web Development',
  'Full-Stack Solutions',
  'UI/UX Design',
  'Technical Consulting'
]

export const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)

  const handleLinkClick = (href: string) => {
    window.open(href, '_blank', 'noopener,noreferrer')
  }

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="relative -z-10 overflow-x-clip bg-gradient-to-t from-gray-900 to-gray-800">
      {/* Background gradient */}
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/20 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
      
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-300/20 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${20 + (i % 2) * 30}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      <div className="container">
        {/* Main Footer Content */}
        <motion.div 
          className="pt-16 pb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* About Column */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-serif mb-4 bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
                  Swagat Kumar Dash
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4 max-w-md">
                  Full-stack developer passionate about creating exceptional digital experiences 
                  that make a difference. Always learning, always building.
                </p>
                
                {/* Contact Info */}
                <div className="space-y-2 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>Bhubaneswar, Odisha, India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <a 
                      href="mailto:swagatdash164@gmail.com"
                      className="hover:text-emerald-300 transition-colors"
                    >
                      swagatdash164@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💼</span>
                    <span>Available for new projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
              <div className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-white/60 hover:text-emerald-300 transition-colors text-sm text-left"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <div className="space-y-3">
                {services.map((service, index) => (
                  <motion.div
                    key={service}
                    className="text-white/60 text-sm"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    {service}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Copyright */}
        <motion.div 
          className="border-t border-white/15 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.div 
              className="text-white/40 text-sm text-center md:text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              &copy; 2025 Swagat Kumar Dash. All rights reserved. Built with ❤️ and ☕
            </motion.div>
            
            <motion.div 
              className="flex items-center gap-4 text-white/40 text-xs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <span>•</span>
              <span>Made in India 🇮🇳</span>
              <span>•</span>
              <span>Powered by Next.js</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}