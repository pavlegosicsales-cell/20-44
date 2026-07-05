import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import InteractiveHouse from "@/components/InteractiveHouse";
import About from "@/components/About";
import Lokali from "@/components/Lokali";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProstorCursor from "@/components/ProstorCursor";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/*
          Sticky-reveal stack (prve 3 sekcije). Hero se "zakači" (pinned) iza,
          a Prostor i Filozofija — neprozirne — klize preko njega i otkrivaju se.
          Pravac: WHP hero→sekcija reveal. Sadržaj visih sekcija skroluje normalno.
        */}
        <div className="reveal-stack">
          <Hero />
          <InteractiveHouse />
          <About />
        </div>
        <Marquee />
        <Lokali />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      {/* Target cursor — aktivan samo dok je Prostor sekcija ispred (van clip-path sekcije) */}
      <ProstorCursor />
    </>
  );
}
