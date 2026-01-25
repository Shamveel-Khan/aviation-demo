"use client"

import { useState, useEffect, useRef } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "What aircraft are available in your fleet?",
    answer:
      "We offer a carefully curated selection of ultra-premium aircraft including the Gulfstream G650ER, Bombardier Global 7500, Embraer Legacy 450, and Citation X. Each aircraft is meticulously maintained and crewed by experienced professionals to exceed your expectations.",
  },
  {
    question: "How far in advance should I book my flight?",
    answer:
      "We recommend booking 48-72 hours in advance for optimal scheduling and crew coordination. However, we maintain standby capacity for urgent departures when possible. Contact our concierge team to discuss your specific timeline.",
  },
  {
    question: "What is your privacy guarantee?",
    answer:
      "Privacy is paramount. All flight manifests and passenger information are encrypted and secured. We maintain strict confidentiality protocols and never disclose client identities or travel patterns. Your discretion is our commitment.",
  },
  {
    question: "Do you provide ground transportation?",
    answer:
      "Absolutely. Our concierge coordinates seamless ground transportation, hotel accommodations, and dining reservations worldwide. We handle every detail so you can focus on what matters most.",
  },
  {
    question: "What happens if my flight needs to be cancelled?",
    answer:
      "We understand that plans change. With minimal notice, you can modify or cancel your flight with our flexible terms. Our team will assist with rescheduling or alternative arrangements immediately.",
  },
  {
    question: "How do I become a preferred client?",
    answer:
      "Preferred membership offers exclusive benefits including priority scheduling, dedicated flight crew, and personalized concierge services. Contact our team to discuss membership options tailored to your travel needs.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" ref={sectionRef} className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className={`max-w-3xl mb-16 transition-all duration-700 ${
          sectionVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
        }`}>
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">FAQ</p>
          <h2 className="text-6xl font-serif font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Common Questions
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className={`border-b border-border transition-all duration-700 ${
              sectionVisible ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-4"
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group transition-all duration-250"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-250 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
