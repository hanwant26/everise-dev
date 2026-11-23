
const CONTACT_SUBMISSIONS_ENABLED = false;

const inputClass =
  "w-full rounded-none border-0 border-b border-neutral-300 bg-transparent px-0 py-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-600 focus:border-neutral-950 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass =
  "block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 border-t border-neutral-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className={labelClass}>
              03 / Start a Project
            </p>
          </div>

          <div className="md:col-span-8">
            <h2
              id="contact-heading"
              className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-[-0.06em] sm:text-5xl md:text-6xl"
            >
              Have something in mind?
              <br />
              <span className="text-neutral-600">
                Let&apos;s make it happen.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-8 text-neutral-600">
              Tell us a little about your project.
              Whether it&apos;s a new website, an online
              store, or a custom application, we&apos;d
              love to hear from you.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-16 border-t border-neutral-200 pt-14 md:grid-cols-12">
          <aside className="md:col-span-4">
            <h3 className="text-xl font-semibold tracking-[-0.04em]">
              Prefer a direct conversation?
            </h3>

            <p className="mt-4 max-w-xs text-sm leading-7 text-neutral-600">
              Reach out through your preferred platform.
              We&apos;re always open to discussing new ideas.
            </p>

            <div className="mt-9 flex flex-col gap-5">
              <a
                href="https://www.instagram.com/everise.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit text-sm font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-8 transition-colors hover:text-neutral-500"
              >
                Instagram ↗
              </a>

              <p className="text-sm text-neutral-500">
                WhatsApp — Coming soon
              </p>

              <p className="text-sm text-neutral-500">
                Email — Coming soon
              </p>
            </div>
          </aside>

          <div className="md:col-span-8">
            <div className="mb-10">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]">
                Tell us about your project.
              </h3>

              <p className="mt-3 text-sm leading-7 text-neutral-500">
                Form preview — submissions are not enabled yet.
              </p>
            </div>

            <form>
              <fieldset disabled>
                <div className="grid gap-9 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className={labelClass}
                    >
                      Your Name *
                    </label>

                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your name"
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className={labelClass}
                    >
                      Email Address *
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      maxLength={254}
                      required
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className={labelClass}
                    >
                      Service Required *
                    </label>

                    <select
                      id="contact-service"
                      name="service"
                      defaultValue=""
                      required
                      className={inputClass}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      <option value="website">
                        Website Development
                      </option>
                      <option value="ecommerce">
                        E-Commerce Solutions
                      </option>
                      <option value="webapp">
                        Custom Web Application
                      </option>
                      <option value="maintenance">
                        Website Maintenance
                      </option>
                      <option value="other">
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-budget"
                      className={labelClass}
                    >
                      Estimated Budget
                    </label>

                    <select
                      id="contact-budget"
                      name="budget"
                      defaultValue=""
                      className={inputClass}
                    >
                      <option value="">
                        Select your budget
                      </option>
                      <option value="under-10k">
                        Under ₹10,000
                      </option>
                      <option value="10k-25k">
                        ₹10,000 – ₹25,000
                      </option>
                      <option value="25k-50k">
                        ₹25,000 – ₹50,000
                      </option>
                      <option value="50k-plus">
                        ₹50,000+
                      </option>
                      <option value="discuss">
                        Let&apos;s Discuss
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-10">
                  <label
                    htmlFor="contact-message"
                    className={labelClass}
                  >
                    Project Details *
                  </label>

                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your project, goals, and requirements..."
                    rows={5}
                    minLength={10}
                    maxLength={3000}
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>
              </fieldset>

              <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-xs leading-6 text-neutral-500">
                  The secure submission system will be activated after final testing.
                </p>

                <button
                  type="button"
                  disabled={!CONTACT_SUBMISSIONS_ENABLED}
                  className="inline-flex cursor-not-allowed items-center justify-center rounded-full bg-neutral-950 px-8 py-4 text-sm font-medium text-white opacity-50"
                >
                  Send Inquiry
                  <span aria-hidden="true" className="ml-3">
                    ↗
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
