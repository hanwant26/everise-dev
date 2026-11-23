
const principles = [
  {
    number: "01",
    title: "Clarity",
    description:
      "We believe the best digital experiences are simple, intuitive, and easy to use.",
  },
  {
    number: "02",
    title: "Quality",
    description:
      "Every detail matters, from thoughtful design to clean, maintainable code.",
  },
  {
    number: "03",
    title: "Performance",
    description:
      "We prioritize speed, accessibility, and responsive experiences across devices.",
  },
  {
    number: "04",
    title: "Security",
    description:
      "We consider security from the beginning, not as an afterthought.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 border-t border-neutral-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        {/* Introduction */}
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              02 / About the Studio
            </p>
          </div>

          <div className="md:col-span-8">
            <h2
              id="about-heading"
              className="max-w-3xl text-4xl font-semibold leading-[1.12] tracking-[-0.06em] sm:text-5xl md:text-6xl"
            >
              Technology with purpose.
              <br />
              <span className="text-neutral-600">
                Design with intention.
              </span>
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10">
              <p className="text-base leading-8 text-neutral-600">
                EVERISE DEV is an independent web development
                studio dedicated to creating modern digital
                experiences for businesses and individuals.
              </p>

              <p className="text-base leading-8 text-neutral-600">
                We believe great websites should do more than
                look beautiful. They should be fast, intuitive,
                accessible, and built to support meaningful
                business goals.
              </p>
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-24 border-t border-neutral-200 pt-12 md:mt-32">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Our Approach
              </p>

              <h3 className="mt-5 max-w-xs text-3xl font-semibold tracking-[-0.05em]">
                Built on the things that matter.
              </h3>
            </div>

            <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 md:col-span-8">
              {principles.map((principle) => (
                <article key={principle.number}>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="text-sm text-neutral-600">
                      {principle.number}
                    </span>

                    <div className="h-px flex-1 bg-neutral-200" />
                  </div>

                  <h4 className="text-xl font-semibold tracking-[-0.04em]">
                    {principle.title}
                  </h4>

                  <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-600">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-24 border-t border-neutral-200 pt-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-2xl font-medium leading-snug tracking-[-0.04em] md:text-4xl">
              We don&apos;t just build websites.
              <span className="text-neutral-600">
                {" "}We build digital foundations for what comes next.
              </span>
            </p>

            <a
              href="#contact"
              className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-neutral-950 px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
            >
              Work with us
              <span aria-hidden="true" className="ml-3">
                ↗
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
