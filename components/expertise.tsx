"use client"

import { useEffect, useRef, useState } from "react"
import { Plane, Users, Lock, Zap, Home, Building, Armchair, Trees } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

const expertiseAreas = [
  {
    title: "Aircraft Management",
    description: "Full-service fleet management including maintenance, crew coordination, and operational oversight.",
    icon: Plane,
  },
  {
    title: "Concierge Services",
    description:
      "Dedicated travel coordination with personalized itineraries, catering, and ground transportation.",
    icon: Users,
  },
  {
    title: "Confidentiality First",
    description:
      "Uncompromising privacy standards with encrypted communications and discreet operations.",
    icon: Lock,
  },
  {
    title: "Performance Excellence",
    description:
      "Rigorous maintenance protocols, certified crew, and real-time flight optimization.",
    icon: Zap,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className={`text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6 transition-all duration-700 ${
            visibleItems.length > 0 ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}>What We Offer</p>
          <h2 className={`text-6xl font-serif font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl transition-all duration-700 ${
            visibleItems.length > 0 ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}
          style={{ animationDelay: "0.1s" }}
          >
            <HighlightedText>Services</HighlightedText> refined
            <br />
            for discerning travelers
          </h2>
          <p className={`text-muted-foreground text-lg leading-relaxed transition-all duration-700 ${
            visibleItems.length > 0 ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
          }`}
          style={{ animationDelay: "0.2s" }}
          >
            Decades of expertise in luxury aviation, ensuring every flight combines seamless service with uncompromising safety standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative pl-8 border-l border-border transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="w-10 h-10 mb-4 text-foreground" strokeWidth={1.25} />
                </div>
                <h3 className="text-xl font-medium mb-4">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
