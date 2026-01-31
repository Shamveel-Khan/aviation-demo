"use client"

import { useEffect, useRef, useState } from "react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "CEO, Tech Innovations",
    quote: "The level of service exceeded every expectation. From seamless booking to impeccable in-flight attention, Luxe Aviation redefined what private travel should be.",
    initials: "SC",
  },
  {
    id: 2,
    name: "Marcus Thompson",
    title: "Investment Partner",
    quote: "Absolute discretion and flawless execution. They understand that privacy isn't optional—it's essential. My most trusted travel partner.",
    initials: "MT",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    title: "Pharmaceutical Executive",
    quote: "The attention to detail is extraordinary. Every aspect curated to perfection. This isn't just transportation—it's an experience crafted for excellence.",
    initials: "ER",
  }
]

export function CallToAction() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <section id="testimonials" ref={sectionRef} className="py-32 md:py-28 bg-[var(--surface-elev)] overflow-hidden relative">
      {/* Header */}
      <div className="container mx-auto px-6 md:px-12 mb-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-[var(--text-muted)] text-sm tracking-[0.3em] uppercase mb-8 transition-all duration-700 ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}>
            Testimonials
          </p>

          <h2 className={`text-3xl md:text-4xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight mb-6 text-balance transition-all duration-700 text-[var(--text-heading)] ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}
          style={{ animationDelay: "0.1s" }}
          >
            What Our Clients Say
          </h2>

          <p className={`text-[var(--text-body)] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}
          style={{ animationDelay: "0.2s" }}
          >
            Trusted by leaders who demand nothing less than exceptional.
          </p>
        </div>
      </div>

      {/* Marquee Container - Full Width */}
      <div className="relative w-full">
        {/* Gradient overlays for fade effect - Full width */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-r from-[var(--surface-elev)] via-[var(--surface-elev)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 lg:w-64 bg-gradient-to-l from-[var(--surface-elev)] via-[var(--surface-elev)] to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling testimonials */}
        <div 
          className="flex gap-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className={`flex gap-6 ${isPaused ? '' : 'animate-marquee'}`}
            style={{
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-[320px] md:w-[360px]"
              >
                <div className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-2xl p-8 h-full flex flex-col hover:border-[var(--border-accent)] transition-all duration-300 hover:shadow-lg">
                  {/* Quote */}
                  <div className="mb-6">
                    <svg className="w-8 h-8 text-[var(--accent-primary)] opacity-30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                    <p className="text-[var(--text-body)] leading-relaxed text-base">
                      {testimonial.quote}
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4 pt-6 border-t border-[var(--border-subtle)] mt-auto">
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-[#0F1115] font-medium text-sm flex-shrink-0">
                      {testimonial.initials}
                    </div>
                    <div>
                      <p className="text-[var(--text-heading)] font-medium">
                        {testimonial.name}
                      </p>
                      <p className="text-[var(--text-muted)] text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pause hint */}
      <div className="container mx-auto px-6 md:px-12 mt-8">
        <p className="text-center text-[var(--text-muted)] text-xs opacity-60">
          Hover to pause
        </p>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}