"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Citation X",
    category: "Ultra-light Jet",
    location: "Transatlantic Range",
    year: "2024",
    image: "/images/hously-1.png",
  },
  {
    id: 2,
    title: "Gulfstream G650ER",
    category: "Heavy Jet",
    location: "Global Reach",
    year: "2024",
    image: "/images/hously-2.png",
  },
  {
    id: 3,
    title: "Bombardier Global 7500",
    category: "Ultra-long Range",
    location: "Worldwide Coverage",
    year: "2023",
    image: "/images/hously-3.png",
  },
  {
    id: 4,
    title: "Embraer Legacy 450",
    category: "Mid-light Jet",
    location: "Executive Charter",
    year: "2024",
    image: "/images/hously-4.png",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const [sectionVisible, setSectionVisible] = useState(false)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-32 md:py-29 bg-[var(--surface)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 transition-all duration-700 ${
          sectionVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
        }`}>
          <div>
            <p className="text-[var(--text-muted)] text-sm tracking-[0.3em] uppercase mb-6">Our Fleet</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-[var(--text-heading)]">Premium Aircraft</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors group"
          >
            View all projects
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-[var(--surface)] origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4 text-[var(--text-heading)]">{project.title}</h3>
                  <p className="text-[var(--text-body)] text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-[var(--text-muted)] text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
