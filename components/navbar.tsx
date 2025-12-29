"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/hooks/use-auth-context"
import { auth } from "@/lib/firebase/config"
import { signOut } from "firebase/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, profile } = useAuthContext()

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
    { href: "/marketplace", label: "Marketplace" },
    { href: "/dashboard", label: "Impact" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/admin", label: "Admin" },
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
          <ul className="flex items-center gap-6 mr-4">
            {navLinks.map((link) => {
              // Only show Admin link if user is admin
              if (link.href === "/admin" && profile?.role !== 'admin') {
                return null
              }

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarImage src={user.photoURL || undefined} alt={user.email || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{profile?.displayName || user.email?.split('@')[0]}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/donate">
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Donate</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut(auth)}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/auth"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition-colors shadow-sm"
            >
              Sign In
            </Link>
          )}
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
            {navLinks.map((link) => {
              if (link.href === "/admin" && profile?.role !== 'admin') {
                return null
              }
              return (
                <li key={link.href} className="w-full text-center">
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 text-xl font-semibold text-foreground/80 hover:text-primary transition-colors border-b border-transparent hover:border-primary/20"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
          <Link
            href={user ? "/dashboard" : "/auth"}
            onClick={() => setIsMenuOpen(false)}
            className="w-full inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-lg font-medium text-white hover:bg-primary/90 transition-all shadow-md active:scale-95"
          >
            {user ? "Go to Dashboard" : "Sign In"}
          </Link>
          {user && (
            <button
              onClick={() => {
                signOut(auth);
                setIsMenuOpen(false);
              }}
              className="text-muted-foreground text-sm font-medium hover:text-red-500 transition-colors"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
