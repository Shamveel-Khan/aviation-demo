import { Hero } from "@/components/hero"
import { Selection } from "@/components/selection"
import { Philosophy } from "@/components/philosophy"
import { Cities } from "@/components/cities"
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
      <Selection />
      <Cities />
      <Projects />
      <CallToAction />
      <FAQ />
      <Footer />
    </main>
  )
}
