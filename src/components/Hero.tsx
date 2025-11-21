
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative text-center py-16 md:py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://picsum.photos/seed/canva-hero/1600/900"
          alt="AI design tool interface"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F9F9FB] via-transparent to-[#F9F9FB]"></div>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0d0c22] mb-6">
          Meet your AI-powered design assistant.
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 mb-8">
          Go from idea to design in seconds with Magic Design, your AI design generator. Simply describe your idea, and watch it generate a selection of unique, customizable templates.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto text-lg font-bold text-white bg-gradient-to-r from-canva-purple to-canva-blue px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            Try Magic Design
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600">
          Try Magic Design for free. No credit card required.
        </p>
      </div>
    </section>
  );
};

export default Hero;
  