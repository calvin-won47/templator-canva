
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AsSeenOn from './components/AsSeenOn';
import FeaturesGrid from './components/FeaturesGrid';
import MoreMagic from './components/MoreMagic';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-[#F9F9FB] font-sans text-[#18181b]">
      <Header />
      <main>
        <Hero />
        <AsSeenOn />
        <FeaturesGrid />
        <MoreMagic />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
  