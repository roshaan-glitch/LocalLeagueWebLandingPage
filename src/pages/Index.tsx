import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Screenshots from "@/components/Screenshots";
import Social from "@/components/Social";
import Footer from "@/components/Footer";
import { HeroAdBanner, FloatingAdBanner } from "@/components/AdBanner";

const Index = () => {
  return (
    <div className="min-h-screen" style={{ background: "#000000" }}>
      <Navbar />
      <Hero />
      <HeroAdBanner />
      <About />
      <Screenshots />
      <Social />
      <Footer />
      <FloatingAdBanner />
    </div>
  );
};

export default Index;
