import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <nav className="container flex h-16 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-foreground/80">
          <span>  </span>
          <p>BRIDGE</p>
          <p>SEED</p></span>
          <span>  </span>
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
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
            >
              Donate
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
