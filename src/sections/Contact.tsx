"use client"

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowUpRight from "@/assets/icons/arrow-up-right.svg"
import GrainImage from "@/assets/images/grain.jpg"
import { ContactModal } from "@/components/ContactModal";
import github from "@/assets/icons/github.svg"
import instagram from "@/assets/icons/instagram.svg"
import linkedin from "@/assets/icons/linkedin.svg"

const contactMethods = [
  {
    icon: "📧",
    title: "Email",
    value: "swagatdash164@gmail.com",
    description: "For business inquiries and collaborations",
    action: "mailto:swagatdash164@gmail.com",
    color: "from-blue-400 to-blue-600"
  },
  {
    icon: "💼",
    title: "LinkedIn",
    value: "Connect with me",
    description: "Professional networking and opportunities",
    action: "https://www.linkedin.com/in/swagatdash15",
    color: "from-blue-600 to-blue-800"
  },
  {
    icon: "📱",
    title: "WhatsApp",
    value: "Quick Chat",
    description: "For urgent project discussions",
    action: "https://wa.me/+919556376455",
    color: "from-green-400 to-green-600"
  },
  {
    icon: "📅",
    title: "Schedule Call",
    value: "Book a meeting",
    description: "30-min consultation call",
    action: "https://calendly.com/swagatdash164",
    color: "from-purple-400 to-purple-600"
  }
];

const quickQuestions = [
  "💼 I need a website for my business",
  "🚀 I want to build a web application",
  "🎨 I need help with UI/UX design", 
  "⚡ I want to optimize my existing site",
  "🤝 I'm interested in collaboration",
  "💡 I have a custom project idea"
];

const stats = [
  { label: "Response Time", value: "< 2 hours", icon: "⚡" },
  { label: "Projects Delivered", value: "25+", icon: "✅" },
  { label: "Client Satisfaction", value: "100%", icon: "⭐" },
  { label: "Countries Served", value: "5+", icon: "🌍" }
];

export const ContactSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleQuickQuestion = (question: string) => {
    setSelectedQuestion(question);
    openModal();
  };

  const handleContactMethod = (action: string) => {
    if (action.startsWith('mailto:') || action.startsWith('https://')) {
      window.open(action, '_blank');
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return( 
    <>
      <div 
        id="contact" 
        className="py-16 pt-12 lg:py-24 lg:pt-20 relative overflow-hidden"
        ref={sectionRef}
        onMouseMove={handleMouseMove}
      >
        {/* Interactive Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated mesh gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-sky-500/10" />
          
          {/* Floating particles that follow mouse */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-300/30 rounded-full"
              style={{
                left: `${10 + i * 4}%`,
                top: `${10 + (i % 5) * 20}%`,
              }}
              animate={{
                x: mousePosition.x * 0.01 * (i % 3),
                y: mousePosition.y * 0.01 * (i % 3),
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container relative z-10">
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl md:text-5xl font-serif mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Let&#39;s Create Something{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-sky-400 bg-clip-text text-transparent">
                Amazing
              </span>
            </motion.h2>
            <motion.p 
              className="text-lg text-white/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Ready to turn your vision into reality? I&#39;m here to help you build exceptional digital experiences.
            </motion.p>
          </motion.div>

          {/* Stats Row */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-emerald-300/30 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(52, 211, 153, 0.1)" }}
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl font-bold text-emerald-300 mb-1">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main CTA Card */}
          <motion.div 
            className="bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 py-12 px-10 rounded-3xl text-center md:text-left relative overflow-hidden z-0 mb-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 opacity-10 -z-10" style={{
              backgroundImage: `url(${GrainImage.src})`
            }}></div>
            
            {/* Animated background elements */}
            <div className="absolute top-4 right-4 w-16 h-16 border border-gray-900/20 rounded-full animate-pulse" />
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-gray-900/10 rounded-full animate-bounce" />
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center relative z-10">
              <div className="flex-1">
                <motion.h3 
                  className="font-serif text-2xl md:text-3xl mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  Ready to start your project?
                </motion.h3>
                <motion.p 
                  className="text-sm md:text-base opacity-90 mb-6 md:mb-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  Let&#39;s discuss your ideas and create something extraordinary together. I&#39;m excited to hear about your vision!
                </motion.p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button 
                  onClick={openModal}
                  className="group relative text-white bg-gray-900 inline-flex items-center px-8 h-14 rounded-xl gap-2 border border-gray-900 hover:bg-gray-800 transition-all duration-300 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-sky-600/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="font-semibold relative z-10">Start Project</span>
                  <ArrowUpRight className="size-5 relative z-10 group-hover:rotate-45 transition-transform"/>
                </motion.button>
                
                <motion.button
                  onClick={() => handleContactMethod('mailto:swagatdash164@gmail.com')}
                  className="text-gray-900 bg-white/20 backdrop-blur-sm inline-flex items-center px-6 h-14 rounded-xl gap-2 border border-white/30 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                >
                  <span className="font-semibold">Quick Email</span>
                  <span>📧</span>
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Quick Questions */}
          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="text-2xl font-serif text-center mb-8">Quick Questions? Pick One:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="p-4 text-left bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-emerald-300/30 hover:bg-white/10 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium group-hover:text-emerald-300 transition-colors">
                      {question}
                    </span>
                    <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact Methods Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => handleContactMethod(method.action)}
              >
                <div className="h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 relative overflow-hidden">
                  {/* Hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="text-3xl mb-4">{method.icon}</div>
                    <h4 className="font-semibold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {method.title}
                    </h4>
                    <p className="text-emerald-300 text-sm font-medium mb-2">{method.value}</p>
                    <p className="text-white/60 text-xs">{method.description}</p>
                    
                    {/* Arrow indicator */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <ArrowUpRight className="size-4 text-emerald-300" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div 
  className="text-center mt-16"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2 }}
>
  <p className="text-white/60 mb-6">
    Prefer a different way to connect? Find me on social media or send a direct message.
  </p>
  <div className="flex justify-center gap-4">
    {[
      { name: 'GitHub', url: 'https://github.com/Swagat-D', icon: github },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/swagatdash15', icon: linkedin },
      { name: 'Instagram', url: 'https://x.com/swagatdash164', icon: instagram } // Fixed this line
    ].map((social, index) => {
      const IconComponent = social.icon; // Create component reference
      return (
        <motion.a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-white/5 border border-white/10 rounded-full hover:border-emerald-300/30 hover:bg-white/10 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.2 + index * 0.1 }}
        >
          <IconComponent className="size-5 text-white/70 hover:text-emerald-300 transition-colors" />
        </motion.a>
      );
    })}
  </div>
</motion.div>
        </div>
      </div>
      
      {/* Enhanced Contact Modal */}
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        initialMessage={selectedQuestion}
      />
    </>
  )
};