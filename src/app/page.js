
import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main
      id="home"
      className="min-h-screen bg-white text-neutral-950"
    >
      <Navbar />

      {/* Hero */}
      <section className="mx-auto flex min-h-[75vh] max-w-7xl flex-col justify-center px-6 py-20 md:px-12">
        <div className="max-w-5xl">
          <p className="mb-8 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
            Independent Web Development Studio
          </p>

          <h1 className="text-5xl font-semibold leading-[1.08] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-8xl">
            Digital experiences,
            <br />
            <span className="text-neutral-600">
              built to stand out.
            </span>
          </h1>

          <p className="mt-9 max-w-xl text-lg leading-relaxed text-neutral-600 md:text-xl">
            We design and develop thoughtful websites that help
            ambitious businesses build their digital presence
            and grow with confidence.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
            >
              Start a project
              <span aria-hidden="true" className="ml-3">
                ↗
              </span>
            </a>

            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-full border border-neutral-300 px-7 py-4 text-sm font-medium transition-colors hover:border-neutral-950 hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
            >
              Explore our services
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <Services />

      {/* About */}
      <About />

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between md:px-12">
          <p className="text-sm font-semibold tracking-tight">
            everise.dev
          </p>

          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} EVERISE DEV.
            All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
