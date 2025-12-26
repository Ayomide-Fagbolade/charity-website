"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Close menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto px-4 flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 mb-1" onClick={() => setIsMenuOpen(false)}>
          <div className="relative h-10 w-10 rounded-md flex items-center justify-center">
            <Image
              src="/logo-icon.png"
              alt="BridgeSeed Foundation Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            BridgeSeed
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/donate"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-sm"
          >
            Donate
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={cn(
            "w-full bg-background border-b shadow-xl p-8 flex flex-col items-center gap-8 transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <ul className="flex flex-col items-center gap-6 w-full">
            {navLinks.map((link) => (
              <li key={link.href} className="w-full text-center">
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-xl font-semibold text-foreground/80 hover:text-primary transition-colors border-b border-transparent hover:border-primary/20"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/donate"
            onClick={() => setIsMenuOpen(false)}
            className="w-full inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-white hover:bg-primary/90 transition-all shadow-md active:scale-95"
          >
            Donate Now
          </Link>
        </div>
      </div>
    </header>
  )
}
