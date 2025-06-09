"use client"

import type React from "react"

import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { motion, AnimatePresence } from "framer-motion"
import grainImage from "@/assets/images/grain.jpg"
import StarIcon from "@/assets/icons/star.svg"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  initialMessage: string
}

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export const ContactModal = ({ isOpen, onClose, initialMessage }: ContactModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => {
          onClose()
          setSubmitStatus("idle")
        }, 2000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            className="bg-gray-800 rounded-3xl relative z-0 overflow-hidden after:z-10 after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute inset-0 -z-10 opacity-5"
              style={{
                backgroundImage: `url(${grainImage.src})`,
              }}
            ></div>

            <div className="p-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="flex items-center justify-between mb-6"
              >
                <div className="inline-flex items-center gap-2">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                  >
                    <StarIcon className="size-9 text-emerald-300" />
                  </motion.div>
                  <h2 className="font-serif text-2xl text-white">Get In Touch</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Success Message */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                        className="w-5 h-5 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                      <p className="text-emerald-400 font-medium">Message sent successfully!</p>
                    </div>
                    <p className="text-emerald-300/80 text-sm mt-1">I&apos;ll get back to you soon.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Message */}
              <AnimatePresence>
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
                  >
                    <div className="flex items-center gap-2">
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
                        className="w-5 h-5 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </motion.svg>
                      <p className="text-red-400 font-medium">Failed to send message</p>
                    </div>
                    <p className="text-red-300/80 text-sm mt-1">Please try again later.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "name", label: "Name", type: "text", placeholder: "Your full name" },
                  { name: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
                  {
                    name: "subject",
                    label: "Subject",
                    type: "text",
                    placeholder: "Project inquiry, collaboration, etc.",
                  },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  >
                    <label htmlFor={field.name} className="block text-sm font-medium text-white/80 mb-2">
                      {field.label} *
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof FormData]}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all duration-300"
                      placeholder={field.placeholder}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                    Message *
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-emerald-300 focus:ring-1 focus:ring-emerald-300 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={twMerge(
                    "w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300",
                    isSubmitting
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-emerald-300 to-sky-400 text-gray-900 hover:from-emerald-400 hover:to-sky-500",
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <motion.svg
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
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
                        </motion.svg>
                        Sending...
                      </motion.div>
                    ) : (
                      <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-white/40 text-xs text-center mt-4"
              >
                I&apos;ll respond within 24 hours
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
