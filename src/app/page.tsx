"use client";

import {
  FeaturesSection,
  Footer,
  HeroSection,
  Navigation,
  PricingSection,
} from "@/components/page/Home";
import { useRef } from "react";

export default function Home() {
  const inicioRef = useRef<HTMLDivElement>(null);
  const recursosRef = useRef<HTMLDivElement>(null);
  const planosRef = useRef<HTMLDivElement>(null);
  const headerHeight = 70;

  const scrollToSection = (
    sectionRef: React.RefObject<HTMLDivElement | null>
  ) => {
    if (sectionRef.current) {
      const yOffset = -headerHeight;
      const y =
        sectionRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden">
      <Navigation
        scrollToSection={scrollToSection}
        inicioRef={inicioRef}
        recursosRef={recursosRef}
        planosRef={planosRef}
      />
      <HeroSection inicioRef={inicioRef} />
      <FeaturesSection recursosRef={recursosRef} />
      <PricingSection planosRef={planosRef} />
      <Footer />
    </main>
  );
}
