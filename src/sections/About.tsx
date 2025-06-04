"use client"

import { SectionHeader } from "@/components/SectionHeader"
import { Card } from "@/components/Card"
import bookImage from "@/assets/images/book-cover.png"
import Image from "next/image"
import JavascriptIcon from "@/assets/icons/square-js.svg"
import ReactIcon from "@/assets/icons/react.svg"
import NextIcon from "@/assets/icons/nextJs.svg"
import GithubIcon from "@/assets/icons/github.svg"
import NodejsIcon from "@/assets/icons/nodejs.svg"
import DevopsIcon from "@/assets/icons/devops.svg"
import MapImage from "@/assets/images/map.png"
import smileemoji from "@/assets/images/memoji-smile.png"
import { CardHeader } from "@/components/CardHeader"
import { ToolboxItem } from "@/components/ToolboxItem"
import { motion, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"

const toolboxItems = [
  {
    title: "JavaScript",
    iconType: JavascriptIcon,
  },
  {
    title: "ReactJs",
    iconType: ReactIcon,
  },
  {
    title: "Next.Js",
    iconType: NextIcon,
  },
  {
    title: "Github",
    iconType: GithubIcon,
  },
  {
    title: "NodeJs",
    iconType: NodejsIcon,
  },
  {
    title: "Devops",
    iconType: DevopsIcon,
  },
]

const hobbies = [
  {
    title: "Gaming",
    emoji: "🎮",
    left: " 5%",
    top: " 5%",
  },
  {
    title: "Photography",
    emoji: "📷",
    left: " 50%",
    top: " 5%",
  },
  {
    title: "Music",
    emoji: "🎧",
    left: "35% ",
    top: " 40%",
  },
  {
    title: "Travel",
    emoji: "✈️",
    left: "10% ",
    top: " 35%",
  },

  {
    title: "Fitness",
    emoji: "🏋️‍♂️",
    left: " 70%",
    top: "45% ",
  },
  {
    title: "Reading",
    emoji: "📚",
    left: "5% ",
    top: " 65%",
  },
  {
    title: "Sports",
    emoji: "🏸",
    left: " 45%",
    top: "70% ",
  },
]

const bhubaneswarFacts = [
  { icon: "🏛️", text: "Temple City" },
  { icon: "🌅", text: "Ancient Capital" },
  { icon: "🎯", text: "Smart City" },
  { icon: "🦎", text: "Cave Heritage" },
]

const bookStats = [
  { label: "Pages Read", value: "2,847", icon: "📖" },
  { label: "Books This Year", value: "12", icon: "📚" },
  { label: "Favorite Genre", value: "Tech", icon: "💻" },
]

export const AboutSection = () => {
  const constraintRef = useRef(null)
  const [showLocationInfo, setShowLocationInfo] = useState(false)
  const [bookHovered, setBookHovered] = useState(false)

  const handleMapClick = () => {
    setShowLocationInfo(true)
    setTimeout(() => {
      setShowLocationInfo(false)
    }, 5000)
  }

  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse into My World"
          description="Learn more about who I am, what I do and what inspires me."
        />
        <div className="mt-20 flex flex-col gap-8">
          <div className="md:grid md:grid-cols-5 md:gap-8 lg:grid-cols-3">
            <Card className="h-[320px] col-span-2 lg:col-span-1 overflow-hidden group">
              <CardHeader title="My Reads" description="Explore the books shaping my perspectives." />
              
              <div className="relative">
                <motion.div
                  className="w-40 mx-auto mt-4 relative cursor-pointer"
                  whileHover={{ scale: 1.05, rotateY: 15 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Image 
                    src={bookImage} 
                    alt="Book Cover" 
                    className="relative z-10 rounded-lg shadow-xl transition-shadow duration-300 group-hover:shadow-emerald-300/20" 
                  />
                  
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-emerald-300/20 to-sky-400/20 rounded-lg blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute size-2 bg-emerald-300 rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: [0, (Math.random() - 0.5) * 100],
                        y: [0, (Math.random() - 0.5) * 100],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    />
                  ))}
                </motion.div>

                <motion.div className="mt-6 space-y-3">
                  {bookStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center justify-between text-xs bg-white/5 rounded-lg p-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{stat.icon}</span>
                        <span className="text-white/70">{stat.label}</span>
                      </div>
                      <motion.span 
                        className="font-semibold text-emerald-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </Card>

            <Card className="h-[320px] p-0 col-span-3 lg:col-span-2 md:mt-0 sm:mt-8">
              <CardHeader
                title="My ToolBox"
                description="Explore the technologies and tools I used to craft exceptional digital experiences."
                className="px-6 pt-6"
              />
              <ToolboxItem
                items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
              />
              <ToolboxItem
                items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:15s]"
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Beyond The Code"
                description="Explore my interests and hobbies beyond the digital realm."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex gap-2 px-6 bg-gradient-to-tr from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">{hobby.title}</span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1 overflow-hidden">
              <Image
                src={MapImage || "/placeholder.svg"}
                alt="map"
                className="h-full w-full object-cover object-left-top cursor-pointer transition-transform hover:scale-105"
                onClick={handleMapClick}
              />

              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:outline-offset-2 after:rounded-full after:outline-gray-950/30 cursor-pointer"
                onClick={handleMapClick}
              >
                <div className="absolute -z-20 inset-0 rounded-full bg-gradient-to-tr from-emerald-300 to-sky-400 animate-ping [animation-duration:2s]"></div>
                <div className="absolute -z-10 inset-0 rounded-full bg-gradient-to-tr from-emerald-300 to-sky-400 "></div>
                <Image src={smileemoji || "/placeholder.svg"} alt="smiling emoji" className="size-20" />
              </div>

              <AnimatePresence>
                {showLocationInfo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-3 z-20"
                  >
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-center space-y-3 w-full max-w-full"
                    >
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-white flex items-center justify-center gap-1">
                          <span>📍</span>
                          <span className="text-sm">Bhubaneswar</span>
                        </div>
                        <div className="text-xs text-emerald-300 font-medium">Temple City of India</div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 w-full">
                        {bhubaneswarFacts.map((fact, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                            className="flex items-center gap-1.5 text-xs text-white/90 bg-white/10 rounded-lg p-2 backdrop-blur-sm"
                          >
                            <span className="text-sm">{fact.icon}</span>
                            <span className="font-medium text-[10px] leading-tight">{fact.text}</span>
                          </motion.div>
                        ))}
                      </div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[10px] text-white/70 italic leading-tight px-2"
                      >
                        &quot;Where ancient heritage meets modern innovation&quot;
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => setShowLocationInfo(false)}
                        className="mt-2 px-3 py-1.5 bg-gradient-to-r from-emerald-400 to-sky-400 text-gray-900 rounded-full text-xs font-semibold hover:scale-105 transition-transform"
                      >
                        Close
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!showLocationInfo && (
                <div className="absolute bottom-2 left-2 right-2 text-center">
                  <div className="text-xs text-white/70 bg-black/60 rounded-full px-3 py-1 backdrop-blur-sm">
                    Click to explore 🌟
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}