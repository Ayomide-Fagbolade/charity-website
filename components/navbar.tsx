import Link from "next/link"
import Image from "next/image"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container px-1 flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 mb-1">
          <div className="relative h-10 w-10 bg-foreground/5 rounded-md flex items-center justify-center">
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

        <ul className="flex items-center gap-6">
          <li>
            <Link
              href="/projects"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-md bg-foreground/80 px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Donate
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
