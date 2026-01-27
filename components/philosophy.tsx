"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"

export function Philosophy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      id="about" 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-main)]"
    >

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="text-[var(--text-muted)] text-xs tracking-[0.4em] uppercase font-medium">
              The Art of Flight
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-[var(--text-heading)] leading-[0.9] tracking-tight mb-8 text-balance"
          >
            Beyond
            <br />
            <span className="italic text-[var(--text-muted)]">Boundaries</span>
          </motion.h2>

          {/* Subtext - minimal */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[var(--text-body)] text-lg md:text-xl font-light max-w-md mx-auto mb-12 leading-relaxed"
          >
            Curated journeys for those who expect nothing less than extraordinary.
          </motion.p>

          {/* Premium CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--accent-primary)] text-[#0F1115] text-sm tracking-[0.2em] uppercase font-medium hover:bg-[var(--accent-primary-hover)] transition-all duration-500 ease-out">
              <span className="relative z-10">Request Charter</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-8 text-[var(--text-muted)] text-xs tracking-widest uppercase"
          >
            <span>Global Access</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]" />
            <span>24/7 Concierge</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-subtle)]" />
            <span>Absolute Privacy</span>
          </motion.div>

        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-12 left-12 text-[var(--text-muted)] text-xs tracking-[0.3em] uppercase hidden lg:block">
        Est. 2024
      </div>
      
      <div className="absolute bottom-12 right-12 text-[var(--text-muted)] text-xs tracking-[0.3em] uppercase hidden lg:block">
        Private Aviation
      </div>
    </section>
  )
}