"use client"

import { motion } from "framer-motion"
import GithubIcon from "@/assets/icons/github.svg"
import LinkedInIcon from "@/assets/icons/linkedin.svg"
import InstagramIcon from "@/assets/icons/instagram.svg"
import TwitterIcon from "@/assets/icons/twitter.svg"

const footerLinks = [
  {
    title: 'Github',
    href: 'https://github.com/Swagat-D',
    icon: GithubIcon
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/swagatdash15',
    icon: LinkedInIcon
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/_swagat_dash_',
    icon: InstagramIcon
  },
  {
    title: 'Twitter',
    href: 'https://x.com/swagatdash164',
    icon: TwitterIcon
  }
]

export const Footer = () => {
  return (
    <footer className="relative -z-10 overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/20 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10"></div>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row md:justify-between items-center gap-8">
          <div className="text-white/40">&copy; 2025 All rights reserved</div>
          <nav className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link, index) => (
              <motion.a
                href={link.href}
                key={link.title}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center size-12 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <link.icon className="size-5 opacity-60 group-hover:opacity-100 transition-all duration-300" />
                </div>
                <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 text-xs text-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {link.title}
                </span>
              </motion.a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}