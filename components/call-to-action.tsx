"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

export function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-32 md:py-29 bg-accent text-accent-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-accent-foreground/70 text-sm tracking-[0.3em] uppercase mb-8 transition-all duration-700 ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}>
            Plan Your Journey
          </p>

          <h2 className={`text-3xl md:text-4xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight mb-8 text-balance transition-all duration-700 ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}
          style={{ animationDelay: "0.1s" }}
          >
            Ready to experience
            <br />
            luxury aviation <HighlightedText>reimagined</HighlightedText>?
          </h2>

          <p className={`text-accent-foreground/80 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}
          style={{ animationDelay: "0.2s" }}
          >
            Reach out to our concierge team. Your exceptional journey begins with a single conversation.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}
          style={{ animationDelay: "0.3s" }}
          >
            <a
              href="mailto:concierge@luxeaviation.com"
              className="inline-flex items-center justify-center gap-3 bg-accent-foreground text-accent px-8 py-4 text-sm tracking-wide hover:opacity-90 transition-all duration-250 group"
            >
              Contact Concierge
              <ArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+1-800-LUXE-JET"
              className="inline-flex items-center justify-center gap-2 border border-accent-foreground/40 px-8 py-4 text-sm tracking-wide hover:bg-accent-foreground/10 transition-all duration-250"
            >
              Call us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
