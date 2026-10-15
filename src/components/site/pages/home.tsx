"use client";

import { HeroSlider } from "../hero-slider";
import {
  WelcomeSection, CtaStrip, ServicesGrid, ProjectsSection, WhyChooseUs,
  Testimonials, StatsBand, EmergencyBanner, LatestNews, PartnersStrip,
} from "../home-sections";

export function HomePage() {
  return (
    <>
      <HeroSlider />
      <WelcomeSection />
      <CtaStrip />
      <ServicesGrid />
      <ProjectsSection />
      <WhyChooseUs />
      <Testimonials />
      <StatsBand />
      <EmergencyBanner />
      <LatestNews />
      <PartnersStrip />
    </>
  );
}
