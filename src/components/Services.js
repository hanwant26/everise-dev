
const services = [
  {
    number: "01",
    title: "Website Development",
    description:
      "Beautiful, responsive, and high-performance websites designed to establish a powerful online presence.",
    details: "Business websites / Landing pages / Portfolios",
  },
  {
    number: "02",
    title: "E-Commerce Solutions",
    description:
      "Modern online shopping experiences that make it easier for customers to discover, explore, and purchase products.",
    details: "Online stores / Product catalogs / Integrations",
  },
  {
    number: "03",
    title: "Custom Web Applications",
    description:
      "Thoughtfully engineered web applications that simplify workflows and solve real business challenges.",
    details: "Web apps / Dashboards / Custom platforms",
  },
  {
    number: "04",
    title: "Website Maintenance",
    description:
      "Reliable website updates, performance improvements, and ongoing technical support to keep your business moving.",
    details: "Updates / Optimization / Technical support",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-20 border-t border-neutral-200 bg-neutral-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        {/* Section heading */}
        <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              01 / Our Expertise
            </p>
          </div>

          <div>
            <h2
              id="services-heading"
              className="max-w-xl text-4xl font-semibold leading-[1.1] tracking-[-0.06em] sm:text-5xl md:text-6xl"
            >
              Digital solutions.
              <br />
              <span className="text-neutral-600">
                Built for what&apos;s next.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-base leading-8 text-neutral-600">
              From the first idea to the final launch, we
              create purposeful digital experiences that
              bring your vision to life.
            </p>
          </div>
        </div>

        {/* Services list */}
        <div className="border-t border-neutral-300">
          {services.map((service) => (
            <article
              key={service.number}
              className="group grid gap-5 border-b border-neutral-300 py-9 transition-colors duration-300 hover:bg-white/70 md:grid-cols-12 md:items-start md:gap-8 md:px-4 md:py-12"
            >
              <div className="md:col-span-1">
                <span className="text-sm font-medium text-neutral-600">
                  {service.number}
                </span>
              </div>

              <div className="md:col-span-5">
                <h3 className="text-2xl font-semibold tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-1 sm:text-3xl">
                  {service.title}
                </h3>
              </div>

              <div className="md:col-span-5">
                <p className="max-w-md text-base leading-8 text-neutral-600">
                  {service.description}
                </p>

                <p className="mt-5 text-xs font-medium uppercase tracking-[0.12em] text-neutral-600">
                  {service.details}
                </p>
              </div>

              <div className="hidden justify-end md:col-span-1 md:flex">
                <span
                  aria-hidden="true"
                  className="text-2xl text-neutral-600 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neutral-950"
                >
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Closing statement */}
        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg text-sm leading-7 text-neutral-500">
            Every project is different. We focus on building
            the right solution for your goals.
          </p>

          <a
            href="#contact"
            className="inline-flex w-fit items-center justify-center rounded-full border border-neutral-950 px-6 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
          >
            Discuss your project
            <span aria-hidden="true" className="ml-3">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
