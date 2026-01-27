import { Hero } from "@/components/hero"
import { Philosophy } from "@/components/philosophy"
import { Projects } from "@/components/projects"
import { Expertise } from "@/components/expertise"
import { FAQ } from "@/components/faq"
import { CallToAction } from "@/components/call-to-action"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-main)]">
      <Hero />
      <Philosophy />
      <Projects />
      <CallToAction />
      <FAQ />
      <Footer />
    </main>
  )
}
