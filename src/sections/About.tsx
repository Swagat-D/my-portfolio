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

// Enhanced Learning Journey Timeline Data
const learningTimeline = [
  {
    phase: "Currently Mastering",
    period: "2024 - Present",
    icon: "🚀",
    color: "from-emerald-400 to-cyan-400",
    status: "active",
    technologies: [
      { name: "AI/ML", progress: 75, description: "Machine Learning fundamentals", icon: "🤖" },
      { name: "Web3", progress: 60, description: "Blockchain development", icon: "⛓️" },
      { name: "Rust", progress: 45, description: "System programming", icon: "🦀" },
      { name: "GraphQL", progress: 80, description: "Advanced API design", icon: "📊" }
    ]
  },
  {
    phase: "Next Targets",
    period: "Q3-Q4 2025",
    icon: "🎯",
    color: "from-blue-400 to-purple-400",
    status: "planned",
    technologies: [
      { name: "Go", progress: 0, description: "High-performance backend", icon: "🐹" },
      { name: "Swift", progress: 0, description: "iOS development", icon: "📱" },
      { name: "Kubernetes", progress: 20, description: "Container orchestration", icon: "☸️" },
      { name: "WebAssembly", progress: 10, description: "High-performance web apps", icon: "🕸️" }
    ]
  },
  {
    phase: "Certification Goals",
    period: "2025-2026",
    icon: "🏆",
    color: "from-yellow-400 to-orange-400",
    status: "future",
    technologies: [
      { name: "AWS Solutions Architect", progress: 30, description: "Cloud expertise", icon: "☁️" },
      { name: "Google Cloud Professional", progress: 15, description: "Multi-cloud skills", icon: "🌐" },
      { name: "Kubernetes Admin", progress: 10, description: "DevOps mastery", icon: "⚙️" },
      { name: "MongoDB Professional", progress: 25, description: "Database optimization", icon: "🍃" }
    ]
  },
  {
    phase: "Innovation Vision",
    period: "2026+",
    icon: "🌟",
    color: "from-purple-400 to-pink-400",
    status: "vision",
    technologies: [
      { name: "Quantum Computing", progress: 0, description: "Future of computing", icon: "⚛️" },
      { name: "Neural Networks", progress: 5, description: "Deep learning", icon: "🧠" },
      { name: "AR/VR Development", progress: 15, description: "Immersive experiences", icon: "🥽" },
      { name: "Edge Computing", progress: 20, description: "Distributed systems", icon: "📡" }
    ]
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
          <span className="text-xl sm:text-2xl">{skill.icon}</span>
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base">{skill.name}</h4>
            <p className="text-xs text-white/60">{skill.description}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-base sm:text-lg font-bold text-emerald-300">{skill.level}%</div>
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

const TimelinePhase = ({ phase, index }: { phase: any; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'active':
        return 'border-emerald-400 bg-emerald-400/20';
      case 'planned':
        return 'border-blue-400 bg-blue-400/20';
      case 'future':
        return 'border-yellow-400 bg-yellow-400/20';
      case 'vision':
        return 'border-purple-400 bg-purple-400/20';
      default:
        return 'border-gray-400 bg-gray-400/20';
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-emerald-300/50 to-transparent" />
      
      {/* Timeline Node */}
      <motion.div
        className={`absolute left-1/2 top-6 sm:top-8 transform -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 ${getStatusStyles(phase.status)} flex items-center justify-center z-10`}
        whileHover={{ scale: 1.2 }}
        animate={phase.status === 'active' ? { 
          boxShadow: ['0 0 0 0 rgba(52, 211, 153, 0.4)', '0 0 0 20px rgba(52, 211, 153, 0)']
        } : {}}
        transition={phase.status === 'active' ? { duration: 2, repeat: Infinity } : {}}
      >
        <span className="text-lg sm:text-xl">{phase.icon}</span>
      </motion.div>

      {/* Content Card - Mobile Responsive */}
      <motion.div
        className={`px-2 sm:px-8 ${index % 2 === 0 ? 'lg:pr-16 lg:pl-0 lg:text-right' : 'lg:pl-16 lg:pr-0'} mb-12 sm:mb-16`}
        whileHover={{ scale: 1.02 }}
      >
        <div 
          className="bg-gray-800/60 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-6 cursor-pointer mx-auto max-w-lg lg:max-w-none"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`flex-1 ${index % 2 === 0 ? 'lg:order-2 lg:text-right' : ''}`}>
              <h3 className={`text-lg sm:text-xl font-serif mb-2 bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                {phase.phase}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm">{phase.period}</p>
            </div>
            <motion.div
              className="text-emerald-300 ml-4"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ⌄
            </motion.div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 sm:space-y-4"
              >
                {phase.technologies.map((tech: any, techIndex: number) => (
                  <motion.div
                    key={tech.name}
                    className="bg-white/5 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: techIndex * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <span className="text-xl sm:text-2xl flex-shrink-0 hidden sm:block">{tech.icon}</span>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white text-base sm:text-base truncate">{tech.name}</h4>
                          <p className="text-sm sm:text-xs text-white/60 truncate">{tech.description}</p>
                        </div>
                      </div>
                      <div className="text-emerald-300 font-bold text-base sm:text-base flex-shrink-0 ml-2">
                        {tech.progress > 0 ? `${tech.progress}%` : 'New'}
                      </div>
                    </div>
                    
                    {tech.progress > 0 && (
                      <div className="relative h-2 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${phase.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${tech.progress}%` }}
                          transition={{ duration: 1, delay: techIndex * 0.1 }}
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const AboutSection = () => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof techStack>("frontend");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const constraintRef = useRef<HTMLDivElement>(null);

  const categories = [
    { id: "frontend" as const, label: "Frontend", icon: "🎨", description: "UI & Experience" },
    { id: "backend" as const, label: "Backend", icon: "⚙️", description: "Server & Database" },
    { id: "tools" as const, label: "DevOps", icon: "🛠️", description: "Development Tools" }
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
              className="text-center p-4 sm:p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-emerald-300/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(52, 211, 153, 0.2)"
              }}
            >
              <div className="text-2xl sm:text-3xl mb-2">{achievement.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-emerald-300 mb-1">{achievement.value}</div>
              <div className="text-xs sm:text-sm font-semibold text-white mb-1">{achievement.title}</div>
              <div className="text-xs text-white/60">{achievement.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Category Selector - Simple Design */}
        <motion.div 
          className="flex justify-center mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="grid grid-cols-3 gap-2 w-full max-w-md sm:max-w-lg">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-3 rounded-xl text-sm font-semibold transition-all duration-300 relative ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-xs font-bold">{category.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-0"
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

        {/* Interactive Learning Journey Timeline */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h3 
              className="text-3xl sm:text-4xl font-serif mb-4 bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              🚀 Learning Journey Timeline
            </motion.h3>
            <motion.p 
              className="text-white/60 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              Explore my continuous learning path - from current mastery to future innovations. 
              Click on each phase to see detailed progress.
            </motion.p>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 h-full bg-gradient-to-b from-emerald-300 via-blue-400 via-yellow-400 to-purple-400 opacity-30 rounded-full" />
            
            {learningTimeline.map((phase, index) => (
              <TimelinePhase key={phase.phase} phase={phase} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Skills Visualization */}
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
                transition={{ delay: 1.5 + index * 0.05 }}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg transition-shadow duration-200`}>
                  {skill.icon}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs font-medium text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {skill.name}
                </div>
                
                <div className="absolute inset-0 rounded-full border-2 border-emerald-300/0 group-hover:border-emerald-300/50 scale-110 transition-colors duration-200" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}