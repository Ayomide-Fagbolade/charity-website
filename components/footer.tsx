import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50" role="contentinfo">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold">Impact Charity</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Evidence-based philanthropy for maximum impact.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Projects</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?cause=global-health"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Global Health
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?cause=education"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Education
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Our Mission
                </Link>
              </li>
              <li>
                <Link href="/about#team" className="text-muted-foreground hover:text-foreground transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/about#transparency"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Transparency
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-muted-foreground hover:text-foreground transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Impact Charity. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
