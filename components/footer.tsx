import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-[var(--border-subtle)]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-serif font-medium mb-4 text-[var(--text-heading)]">Luxe Aviation</h3>
            <p className="text-[var(--text-body)] leading-relaxed max-w-sm">
              Premium private aviation redefined. Where exceptional service meets timeless luxury, every journey transcends expectation.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-[var(--text-heading)]">Company</h4>
            <ul className="space-y-3 text-sm text-[var(--text-body)]">
              <li>
                <Link href="#projects" className="hover:text-[var(--text-heading)] transition-colors">
                  Fleet
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-[var(--text-heading)] transition-colors">
                  Philosophy
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-[var(--text-heading)] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-[var(--text-heading)] transition-colors">
                  Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4 text-[var(--text-heading)]">Contact</h4>
            <ul className="space-y-3 text-sm text-[var(--text-body)]">
              <li>
                <a href="mailto:concierge@luxeaviation.com" className="hover:text-[var(--text-heading)] transition-colors">
                  concierge@luxeaviation.com
                </a>
              </li>
              <li>
                <a href="tel:+1-800-LUXE-JET" className="hover:text-[var(--text-heading)] transition-colors">
                  +1 (800) LUXE-JET
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-heading)] transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--text-heading)] transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <p>© 2025 Luxe Aviation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[var(--text-heading)] transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-[var(--text-heading)] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
