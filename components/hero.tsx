"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textMaskRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger pop-in animation on mount
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || window.innerHeight
      const scrollY = window.scrollY
      const progress = Math.min(scrollY / (heroHeight * 0.5), 1)
      
      setScrollProgress(progress)
      
      // Parallax effect on hero content
      if (contentRef.current) {
        const translateY = scrollY * 0.5
        const opacity = Math.max(0, 1 - progress)
        contentRef.current.style.transform = `translateY(${translateY}px)`
        contentRef.current.style.opacity = opacity.toString()
      }
      
      // Fade and clip effect on title
      if (textMaskRef.current) {
        const clipProgress = Math.min(scrollY / 300, 1)
        textMaskRef.current.style.clipPath = `inset(${clipProgress * 100}% 0 0 0)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/airplane-hero.jpg"
          alt="Luxury private jet in flight"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/60" />
      </div>

      <div
        ref={contentRef}
        className="container mx-auto px-6 md:px-12 relative z-10 text-center"
        style={{
          willChange: "transform, opacity",
          transition: "opacity 0.1s ease-out",
        }}
      >
        <div className="mb-8">
          <p 
            className={`text-xs tracking-[0.4em] uppercase text-accent mb-6 transition-all duration-700 ${
              isLoaded ? "animate-fade-in-up" : "opacity-0 translate-y-4"
            }`}
            style={{ animationDelay: "0.1s" }}
          >
            {"Luxury Aviation"}
          </p>

          <div 
            ref={textMaskRef} 
            style={{ 
              transition: "clip-path 0.15s ease-out",
              clipPath: "inset(0 0 0 0)"
            }}
          >
            <h1 
              className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-balance text-foreground mb-4 tracking-tight leading-[0.9] ${
                isLoaded ? "animate-pop-in" : "opacity-0 scale-75"
              }`}
              style={{ animationDelay: "0.2s" }}
            >
              {"Elevate Your Journey"}
            </h1>
          </div>

          <p 
            ref={subtitleRef}
            className={`text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-8 leading-relaxed transition-all duration-700 ${
              isLoaded ? "animate-fade-in-up" : "opacity-0 translate-y-4"
            }`}
            style={{ animationDelay: "0.4s" }}
          >
            {"Experience premium private aviation redefined. Where exceptional service meets timeless luxury."}
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className={`${isLoaded ? "animate-subtle-float" : "opacity-0"} transition-opacity duration-700`}>
          <ArrowDown className="w-5 h-5 text-accent" />
        </div>
      </div>
    </section>
  )
}
