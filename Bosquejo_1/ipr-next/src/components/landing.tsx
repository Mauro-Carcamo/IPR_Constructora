import { Clients } from "@/components/sections/clients";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollAnimations } from "@/components/motion/scroll-animations";
import { Nosotros } from "@/components/sections/nosotros";
import { ParallaxCollage } from "@/components/sections/parallax-collage";
import { Pricing } from "@/components/sections/pricing";
import { Process } from "@/components/sections/process";
import { Projects } from "@/components/sections/projects";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyUs } from "@/components/sections/why-us";
import { CursorFollower } from "@/components/ui/cursor-follower";
import { FloatingSocial } from "@/components/ui/floating-social";

export function Landing() {
  return (
    <div className="page">
      <MotionProvider />
      <ScrollAnimations />
      <CursorFollower />
      <FloatingSocial />
      <Header />
      <main>
        <Hero />
        <Nosotros />
        <Services />
        <Projects />
        <WhyUs />
        <CaseStudies />
        <Pricing />
        <Clients />
        <ParallaxCollage />
        <Process />
        <Contact />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
