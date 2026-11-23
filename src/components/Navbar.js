
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand */}
        <a
          href="#home"
          className="text-2xl font-bold tracking-[-0.07em] text-neutral-950"
          aria-label="EVERISE DEV homepage"
        >
          everise
          <span className="text-neutral-600">.dev</span>
        </a>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop contact button */}
        <a
          href="#contact"
          className="hidden items-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950 md:inline-flex"
        >
          Let&apos;s Talk
          <span aria-hidden="true" className="ml-2">↗</span>
        </a>

        {/* Mobile navigation */}
        <details className="group relative md:hidden">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-neutral-200 text-neutral-950 [&::-webkit-details-marker]:hidden"
            aria-label="Toggle mobile navigation"
          >
            <span
              aria-hidden="true"
              className="text-xl group-open:hidden"
            >
              ☰
            </span>
            <span
              aria-hidden="true"
              className="hidden text-2xl group-open:inline"
            >
              ×
            </span>
          </summary>

          <nav
            className="absolute right-0 top-full mt-4 w-64 rounded-xl border border-neutral-200 bg-white p-4 shadow-lg"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-lg px-3 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                className="mt-4 inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-4 text-sm font-medium text-white"
              >
                Start a Project ↗
              </a>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
