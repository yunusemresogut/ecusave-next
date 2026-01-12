import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TuningCalculator from "./components/TuningCalculator";
import Services from "./components/Services";
import Contact from "./components/Contact";
import PanelContent from "./components/PanelContent";
import ScrollToTop from "./components/ScrollToTop";

export default function Home() {
  return (
    <div id="home">
      <Header />
      <main className="pt-20 scroll-smooth">
        <Hero />
        <PanelContent />
        <section id="tuning" className="py-20"><TuningCalculator /></section>
        <Services />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
