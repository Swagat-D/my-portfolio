"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import { Card } from "@/components/Card"
import { SectionHeader } from "@/components/SectionHeader"

// Tech Stack Data
const techStack = {
  frontend: [
    { name: "React", level: 95, icon: "⚛️", color: "from-blue-400 to-cyan-400", description: "Advanced component architecture & hooks" },
    { name: "Next.js", level: 90, icon: "🔺", color: "from-gray-700 to-gray-900", description: "SSR, SSG, and full-stack development" },
    { name: "TypeScript", level: 88, icon: "📘", color: "from-blue-600 to-blue-800", description: "Type-safe applications at scale" },
    { name: "Tailwind CSS", level: 92, icon: "🎨", color: "from-cyan-400 to-blue-500", description: "Rapid UI development & design systems" },
    { name: "Framer Motion", level: 85, icon: "✨", color: "from-purple-400 to-pink-400", description: "Complex animations & interactions" }
  ],
  backend: [
    { name: "Node.js", level: 87, icon: "🟢", color: "from-green-400 to-green-600", description: "Scalable server-side applications" },
    { name: "Spring Boot", level: 82, icon: "🍃", color: "from-green-500 to-green-700", description: "Enterprise Java applications" },
    { name: "Python", level: 80, icon: "🐍", color: "from-yellow-400 to-green-400", description: "Data processing & web development" },
    { name: "PostgreSQL", level: 85, icon: "🐘", color: "from-blue-500 to-indigo-600", description: "Complex database design & optimization" },
    { name: "MongoDB", level: 78, icon: "🍃", color: "from-green-600 to-green-800", description: "NoSQL database management" }
  ],
  tools: [
    { name: "Docker", level: 83, icon: "🐳", color: "from-blue-400 to-blue-600", description: "Containerization & deployment" },
    { name: "AWS", level: 75, icon: "☁️", color: "from-orange-400 to-orange-600", description: "Cloud infrastructure & services" },
    { name: "Git", level: 90, icon: "📚", color: "from-red-400 to-red-600", description: "Version control & collaboration" },
    { name: "Figma", level: 85, icon: "🎭", color: "from-purple-400 to-purple-600", description: "UI/UX design & prototyping" },
    { name: "Jest", level: 80, icon: "🧪", color: "from-red-500 to-pink-500", description: "Testing & quality assurance" }
  ]
} as const;

const achievements = [
  {
    title: "Projects Completed",
    value: "25+",
    icon: "🚀",
    description: "Successfully delivered projects"
  },
  {
    title: "Technologies Mastered",
    value: "15+",
    icon: "💻",
    description: "Programming languages & frameworks"
  },
  {
    title: "Years of Experience",
    value: "2+",
    icon: "⏱️",
    description: "Continuous learning & growth"
  },
  {
    title: "Client Satisfaction",
    value: "100%",
    icon: "⭐",
    description: "Positive feedback & ratings"
  }
];

interface Skill {
  name: string;
  level: number;
  icon: string;
  color: string;
  description: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
}

const SkillCard = ({ skill, index, hoveredSkill, setHoveredSkill }: SkillCardProps) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    onHoverStart={() => setHoveredSkill(skill.name)}
    onHoverEnd={() => setHoveredSkill(null)}
    whileHover={{ scale: 1.02 }}
  >
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300 group-hover:bg-white/10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <h4 className="font-semibold text-white">{skill.name}</h4>
            <p className="text-xs text-white/60">{skill.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-emerald-300">{skill.level}%</div>
          <div className="text-xs text-white/60">Proficiency</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5, ease: "easeOut" }}
        />
        
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full blur-sm opacity-50`}
          initial={{ width: 0 }}
          animate={{ width: hoveredSkill === skill.name ? `${skill.level}%` : "0%" }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  </motion.div>
);

export const AboutSection = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof techStack>("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const constraintRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "frontend" as const, label: "Frontend", icon: "🎨", description: "User Interface & Experience" },
    { id: "backend" as const, label: "Backend", icon: "⚙️", description: "Server & Database" },
    { id: "tools" as const, label: "Tools & DevOps", icon: "🛠️", description: "Development & Deployment" }
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-emerald-300/20 via-emerald-300/5 to-transparent"
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + (i % 2) * 40}%`,
            }}
            animate={{
              scaleY: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <SectionHeader
          eyebrow="Technical Expertise"
          title="Skills & Technologies"
          description="A comprehensive overview of my technical stack and capabilities."
        />

        {/* Achievements Grid */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              className="text-center p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-emerald-300/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(52, 211, 153, 0.2)"
              }}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className="text-2xl font-bold text-emerald-300 mb-1">{achievement.value}</div>
              <div className="text-sm font-semibold text-white mb-1">{achievement.title}</div>
              <div className="text-xs text-white/60">{achievement.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Selector */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex gap-2 p-1 bg-gray-800/80 backdrop-blur-md rounded-full border border-white/10">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                  activeCategory === category.id
                    ? "text-gray-900"
                    : "text-white/70 hover:text-white"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory === category.id && (
                  <motion.div
                    layoutId="activeSkillCategory"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <span>{category.icon}</span>
                  <div className="text-left">
                    <div>{category.label}</div>
                    {activeCategory === category.id && (
                      <div className="text-xs opacity-80">{category.description}</div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {techStack[activeCategory].map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                index={index}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Interactive Learning Journey */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-serif mb-4">Continuous Learning Journey</h3>
              <p className="text-white/60">Always exploring new technologies and expanding my skill set</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Currently Learning", items: ["AI/ML", "Web3", "Rust"], icon: "📚", color: "from-yellow-400 to-orange-400" },
                { title: "Next in Queue", items: ["Go", "Swift", "Kubernetes"], icon: "🎯", color: "from-blue-400 to-purple-400" },
                { title: "Certifications", items: ["AWS", "Google Cloud", "Azure"], icon: "🏆", color: "from-green-400 to-emerald-400" }
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  className="text-center p-6 bg-white/5 rounded-xl border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className={`text-3xl mb-3 bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                    {section.icon}
                  </div>
                  <h4 className="font-semibold mb-3">{section.title}</h4>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div
                        key={item}
                        className="text-sm text-white/70 bg-white/5 rounded-full py-1 px-3"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Skills Visualization */}
        {/* Replace the entire skill map section with this */}
<motion.div 
  className="mt-16 text-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2 }}
>
  <h3 className="text-xl font-serif mb-4">Interactive Skill Map</h3>
  <p className="text-white/60 mb-8">Drag skills around to explore connections</p>
  
  <div className="relative h-64 overflow-hidden" ref={constraintRef}>
    {Object.values(techStack).flat().slice(0, 12).map((skill, index) => (
      <motion.div
        key={skill.name}
        className="absolute cursor-pointer group"
        style={{
          left: `${10 + (index % 6) * 15}%`,
          top: `${20 + Math.floor(index / 6) * 40}%`,
        }}
        drag
        dragConstraints={constraintRef}
        whileHover={{ scale: 1.2 }}
        whileDrag={{ scale: 1.1 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 + index * 0.05 }} // Reduced delay
      >
        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-2xl shadow-lg transition-shadow duration-200`}>
          {skill.icon}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-medium text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {skill.name}
        </div>
        
        {/* Simplified hover effect */}
        <div className="absolute inset-0 rounded-full border-2 border-emerald-300/0 group-hover:border-emerald-300/50 scale-110 transition-colors duration-200" />
      </motion.div>
    ))}
  </div>
</motion.div>
      </div>
    </section>
  )
}