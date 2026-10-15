"use client";

import { POSTS } from "@/lib/site";
import { PageBanner, Reveal } from "../shared";
import { useNav } from "../nav-context";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";

export function BlogPage() {
  const { navigate } = useNav();

  return (
    <>
      <PageBanner title="From the Blog" crumb="Blog" image="/images/blog-2.jpg" />

      <section className="bg-fog py-20 lg:py-24">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold leading-tight text-navy-800 sm:text-4xl">
              Practical notes from sixteen years of wiring
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-slate-500">
              No fluff pieces here. These are the questions we answer on job sites
              every week, written down so you can read them with coffee in hand.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <button
                  onClick={() => navigate("blog" as never, p.slug)}
                  className="group block h-full w-full bg-white text-left shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="aspect-[370/250] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute bottom-0 left-0 bg-brand-500 px-4 py-2 font-heading text-xs font-semibold uppercase tracking-wider text-navy-900">
                      {p.readTime}
                    </span>
                  </div>
                  <div className="flex flex-col p-7">
                    <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5 text-brand-600" /> {p.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock3 className="h-3.5 w-3.5 text-brand-600" /> {p.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 font-heading text-[1.35rem] font-semibold leading-snug text-navy-800 transition-colors group-hover:text-brand-600">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate-500">
                      {p.excerpt}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-navy-800 transition-colors group-hover:text-brand-600">
                      Read Article
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function BlogPostPage({ slug }: { slug: string }) {
  const { navigate } = useNav();
  const post = POSTS.find((p) => p.slug === slug) ?? POSTS[0];
  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <>
      <PageBanner title="Blog" crumb={post.title.length > 34 ? "Article" : post.title} image="/images/blog-1.jpg" />

      <section className="bg-white py-20">
        <div className="container-site">
          <article className="mx-auto max-w-3xl">
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-brand-600" /> {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5 text-brand-600" /> {post.readTime}
                </span>
                <span className="bg-navy-100 px-3 py-1 font-semibold text-navy-800">VoltEdge Field Notes</span>
              </div>
              <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.1] text-navy-800 sm:text-[2.9rem]">
                {post.title}
              </h1>
              <img
                src={post.image}
                alt={post.title}
                className="mt-9 aspect-video w-full rounded-sm object-cover shadow-xl shadow-navy-900/10"
              />
              <div className="mt-9 space-y-6">
                <p className="text-lg font-medium leading-relaxed text-navy-800">{post.excerpt}</p>
                {post.body.map((para, i) => (
                  <p key={i} className="leading-[1.85] text-slate-600">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-12 border-l-4 border-brand-500 bg-fog p-7">
                <p className="font-heading text-xl font-semibold leading-snug text-navy-800">
                  Hearing any of these sounds around your own panel?
                </p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-slate-500">
                  A two minute call usually settles whether it is urgent. (614) 555-0148,
                  weekdays 7:30 to 5:30, emergencies any hour.
                </p>
              </div>
            </Reveal>
          </article>

          {/* More posts */}
          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="font-heading text-2xl font-bold text-navy-800">Keep Reading</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {others.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => navigate("blog" as never, p.slug)}
                  className="group flex gap-4 bg-fog p-4 text-left transition-shadow hover:shadow-lg"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-24 w-28 shrink-0 rounded-sm object-cover"
                  />
                  <span>
                    <span className="block text-[0.7rem] font-medium uppercase tracking-wider text-slate-400">
                      {p.date}
                    </span>
                    <span className="mt-1 block font-heading text-[1.05rem] font-semibold leading-snug text-navy-800 transition-colors group-hover:text-brand-600">
                      {p.title}
                    </span>
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate("blog" as never)}
              className="mt-10 inline-flex items-center gap-2 border-b-2 border-brand-500 pb-1 font-heading text-sm font-semibold uppercase tracking-wider text-navy-800 transition-colors hover:text-brand-600"
            >
              Back to All Articles
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
