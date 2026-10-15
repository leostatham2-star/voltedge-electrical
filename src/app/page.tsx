"use client";

import { useCallback, useSyncExternalStore } from "react";
import { NavProvider } from "@/components/site/nav-context";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { HomePage } from "@/components/site/pages/home";
import { AboutPage } from "@/components/site/pages/about";
import { ServicesPage } from "@/components/site/pages/services";
import { ProjectsPage } from "@/components/site/pages/projects";
import { BlogPage, BlogPostPage } from "@/components/site/pages/blog";
import { ContactPage } from "@/components/site/pages/contact";
import { RfqPage } from "@/components/site/pages/rfq";
import type { PageId } from "@/lib/site";

const KNOWN_PAGES: PageId[] = ["home", "about", "services", "projects", "blog", "blogPost", "contact", "rfq"];

function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function parseHashString(hash: string): { page: PageId; postSlug: string | null } {
  const clean = hash.replace(/^#\/?/, "");
  const [rawPage, rawSlug] = clean.split("/");
  let page = (rawPage || "home") as PageId;
  // Posts live at #/blog/<slug>
  if (page === "blog" && rawSlug) page = "blogPost";
  if (!KNOWN_PAGES.includes(page)) return { page: "home", postSlug: null };
  return { page, postSlug: rawSlug || null };
}

function getHash() {
  return window.location.hash;
}

function getServerHash() {
  return "";
}

export default function Site() {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const { page, postSlug } = parseHashString(hash);

  const navigate = useCallback((nextPage: PageId, nextPostSlug?: string) => {
    const target = nextPostSlug ? `#/${nextPage}/${nextPostSlug}` : `#/${nextPage}`;
    if (window.location.hash !== target) {
      window.location.hash = target;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const renderPage = () => {
    switch (page) {
      case "about":
        return <AboutPage />;
      case "services":
        return <ServicesPage />;
      case "projects":
        return <ProjectsPage />;
      case "blog":
        return <BlogPage />;
      case "blogPost":
        return <BlogPostPage slug={postSlug ?? ""} />;
      case "contact":
        return <ContactPage />;
      case "rfq":
        return <RfqPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <NavProvider value={{ page, postSlug, navigate }}>
      <div className="flex min-h-screen flex-col bg-white">
        <Header />
        {/* Spacer so the fixed header never covers content */}
        <div className="h-[76px] shrink-0 lg:h-[116px]" aria-hidden="true" />
        <main className="flex-1">{renderPage()}</main>
        <Footer />
      </div>
    </NavProvider>
  );
}
