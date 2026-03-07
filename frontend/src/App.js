import React, { useState } from "react";
import "./App.css";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="App" style={{ background: '#050508', minHeight: '100vh' }}>
      {/* Cover the Emergent watermark badge */}
      <div style={{
        position: 'fixed', bottom: 0, right: 0,
        width: '210px', height: '60px',
        background: '#050508', zIndex: 999999,
        pointerEvents: 'none'
      }} />
      <Preloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <>
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <CertificationsSection />
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
